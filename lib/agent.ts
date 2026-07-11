// "Kelly": an autonomous Elo-edge paper-trading agent.
//
// Strategy: for every fixture, compare the Elo model's outcome probabilities
// (lib/tournament backfill) against 1X2 market odds. When the model's edge on
// an outcome clears a threshold, stake a fractional-Kelly position. Positions
// settle on full-time scores; bankroll compounds.
//
// The whole run is a DETERMINISTIC REPLAY over the fixture list (same trick as
// the Elo backfill): no storage, no clock, ISR keeps it current. Odds come
// from TxODDS TxLINE when TXODDS_API_TOKEN is provisioned; otherwise from a
// clearly-labeled simulated market (the hackathon judging criteria explicitly
// allow "live/simulated TxLINE feeds").

import type { Fixture, Tournament } from "@/lib/tournament";

export type OutcomeKey = "home" | "draw" | "away";

export type Quote = {
  /** decimal 1X2 odds */
  home: number;
  draw: number;
  away: number;
  /** de-vigged implied probabilities (sum to 1) */
  pHome: number;
  pDraw: number;
  pAway: number;
  source: "txodds" | "simulated";
};

export type Position = {
  matchNum: number;
  slug: string;
  label: string; // "Spain vs Austria"
  outcome: OutcomeKey;
  outcomeLabel: string; // team name or "Draw"
  oddsTaken: number; // decimal
  eloProb: number;
  marketProb: number;
  edge: number; // eloProb - marketProb
  stake: number; // currency units staked
  settled: boolean;
  won: boolean | null;
  pnl: number; // realized profit/loss (0 while open)
};

export type Signal = {
  matchNum: number;
  slug: string;
  label: string;
  dateUtc: string;
  outcome: OutcomeKey;
  outcomeLabel: string;
  odds: number;
  eloProb: number;
  marketProb: number;
  edge: number;
  plannedStake: number;
};

export type AgentRun = {
  simulated: boolean;
  bankroll0: number;
  bankroll: number;
  roiPct: number;
  staked: number;
  wins: number;
  losses: number;
  hitRatePct: number;
  /** multiclass Brier score of the Elo model over all traded fixtures (lower is better) */
  brier: number;
  positions: Position[]; // settled + open, chronological
  signals: Signal[]; // what it would stake on upcoming fixtures
  bankrollSeries: { matchNum: number; bankroll: number }[];
  params: { minEdge: number; kellyScale: number; maxStakePct: number };
};

// ---- deterministic PRNG (mulberry32) so the simulated market is stable ----
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Simulated 1X2 market for a fixture, derived from the Elo probabilities:
 * the "market" partially shades toward a flat prior (bookmakers hedge
 * longshots), carries a 6% overround, and adds small deterministic noise
 * seeded by the match number. This creates realistic, persistent disagreements
 * for the agent to exploit, and is fully reproducible across builds.
 */
export function simulatedQuote(f: Fixture): Quote | null {
  if (f.p1Win === null || f.pDraw === null || f.p2Win === null) return null;
  const rnd = mulberry32(0x5eed + f.num * 7919);
  const shade = 0.22; // weight toward the flat prior
  const prior = 1 / 3;
  const noise = () => (rnd() - 0.5) * 0.04;

  let mHome = (1 - shade) * f.p1Win + shade * prior + noise();
  let mDraw = (1 - shade) * f.pDraw + shade * prior + noise();
  let mAway = (1 - shade) * f.p2Win + shade * prior + noise();
  mHome = Math.max(0.02, mHome);
  mDraw = Math.max(0.02, mDraw);
  mAway = Math.max(0.02, mAway);
  const s = mHome + mDraw + mAway;
  mHome /= s;
  mDraw /= s;
  mAway /= s;

  const overround = 1.06;
  return {
    home: round2(1 / (mHome * overround)),
    draw: round2(1 / (mDraw * overround)),
    away: round2(1 / (mAway * overround)),
    pHome: mHome,
    pDraw: mDraw,
    pAway: mAway,
    source: "simulated",
  };
}

function round2(x: number): number {
  return Math.round(x * 100) / 100;
}

/** Fractional Kelly for a binary bet at decimal odds o with model prob p. */
export function kellyFraction(p: number, o: number, fraction: number): number {
  const b = o - 1;
  if (b <= 0) return 0;
  const full = (b * p - (1 - p)) / b;
  return Math.max(0, full * fraction);
}

function outcomeOfScore(score: [number, number]): OutcomeKey {
  if (score[0] > score[1]) return "home";
  if (score[0] < score[1]) return "away";
  return "draw";
}

const OUTCOMES: OutcomeKey[] = ["home", "draw", "away"];

function eloProbOf(f: Fixture, o: OutcomeKey): number {
  return o === "home" ? f.p1Win! : o === "draw" ? f.pDraw! : f.p2Win!;
}

function marketProbOf(q: Quote, o: OutcomeKey): number {
  return o === "home" ? q.pHome : o === "draw" ? q.pDraw : q.pAway;
}

function oddsOf(q: Quote, o: OutcomeKey): number {
  return o === "home" ? q.home : o === "draw" ? q.draw : q.away;
}

function outcomeLabel(f: Fixture, o: OutcomeKey): string {
  return o === "home" ? f.team1Name : o === "away" ? f.team2Name : "Draw";
}

/**
 * Replay the agent over the tournament. Pure and deterministic given the
 * tournament state and params; quotes default to the simulated market and can
 * be overridden per fixture (e.g. real TxLINE odds) via `quoteFor`.
 */
export function runAgent(
  t: Tournament,
  opts?: {
    bankroll0?: number;
    minEdge?: number;
    kellyScale?: number;
    maxStakePct?: number;
    quoteFor?: (f: Fixture) => Quote | null;
  }
): AgentRun {
  const bankroll0 = opts?.bankroll0 ?? 1000;
  const minEdge = opts?.minEdge ?? 0.04;
  const kellyScale = opts?.kellyScale ?? 0.25;
  const maxStakePct = opts?.maxStakePct ?? 0.1;
  const quoteFor = opts?.quoteFor ?? simulatedQuote;

  let bankroll = bankroll0;
  let staked = 0;
  let wins = 0;
  let losses = 0;
  let brierSum = 0;
  let brierN = 0;
  let simulated = false;

  const positions: Position[] = [];
  const signals: Signal[] = [];
  const bankrollSeries: { matchNum: number; bankroll: number }[] = [
    { matchNum: 0, bankroll },
  ];

  const fixtures = [...t.fixtures].sort((a, b) => a.num - b.num);

  for (const f of fixtures) {
    if (f.p1Win === null || f.pDraw === null || f.p2Win === null) continue;
    const q = quoteFor(f);
    if (!q) continue;
    if (q.source === "simulated") simulated = true;

    // best edge across the three outcomes
    let best: OutcomeKey | null = null;
    let bestEdge = 0;
    for (const o of OUTCOMES) {
      const e = eloProbOf(f, o) - marketProbOf(q, o);
      if (e > bestEdge) {
        bestEdge = e;
        best = o;
      }
    }

    if (f.played && f.score) {
      // Brier over every completed fixture the agent could price
      const actual = outcomeOfScore(f.score);
      for (const o of OUTCOMES) {
        const p = eloProbOf(f, o);
        const y = o === actual ? 1 : 0;
        brierSum += (p - y) * (p - y);
      }
      brierN++;

      if (best && bestEdge >= minEdge && bankroll > 0) {
        const p = eloProbOf(f, best);
        const o = oddsOf(q, best);
        const frac = Math.min(kellyFraction(p, o, kellyScale), maxStakePct);
        const stake = Math.round(bankroll * frac * 100) / 100;
        if (stake > 0) {
          const won = best === actual;
          const pnl = won
            ? Math.round(stake * (o - 1) * 100) / 100
            : -stake;
          bankroll = Math.round((bankroll + pnl) * 100) / 100;
          staked += stake;
          if (won) wins++;
          else losses++;
          positions.push({
            matchNum: f.num,
            slug: f.slug,
            label: `${f.team1Name} vs ${f.team2Name}`,
            outcome: best,
            outcomeLabel: outcomeLabel(f, best),
            oddsTaken: o,
            eloProb: eloProbOf(f, best),
            marketProb: marketProbOf(q, best),
            edge: bestEdge,
            stake,
            settled: true,
            won,
            pnl,
          });
          bankrollSeries.push({ matchNum: f.num, bankroll });
        }
      }
    } else if (!f.played && best && bestEdge >= minEdge && bankroll > 0) {
      const p = eloProbOf(f, best);
      const o = oddsOf(q, best);
      const frac = Math.min(kellyFraction(p, o, kellyScale), maxStakePct);
      const plannedStake = Math.round(bankroll * frac * 100) / 100;
      if (plannedStake > 0) {
        signals.push({
          matchNum: f.num,
          slug: f.slug,
          label: `${f.team1Name} vs ${f.team2Name}`,
          dateUtc: f.dateUtc,
          outcome: best,
          outcomeLabel: outcomeLabel(f, best),
          odds: o,
          eloProb: p,
          marketProb: marketProbOf(q, best),
          edge: bestEdge,
          plannedStake,
        });
      }
    }
  }

  const settledCount = wins + losses;
  return {
    simulated,
    bankroll0,
    bankroll,
    roiPct:
      Math.round(((bankroll - bankroll0) / bankroll0) * 10000) / 100,
    staked: Math.round(staked * 100) / 100,
    wins,
    losses,
    hitRatePct:
      settledCount > 0 ? Math.round((wins / settledCount) * 1000) / 10 : 0,
    brier: brierN > 0 ? Math.round((brierSum / brierN) * 1000) / 1000 : 0,
    positions,
    signals,
    bankrollSeries,
    params: { minEdge, kellyScale, maxStakePct },
  };
}
