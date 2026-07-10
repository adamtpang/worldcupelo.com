// Picks store for Elo Arena.
//
// v1 persistence is localStorage under a single key so the whole layer can be
// swapped for an on-chain Solana program later without touching callers.
// Pure module: no React, no side effects at import time, and every function
// no-ops safely when window/localStorage is unavailable (SSR, build).

const STORAGE_KEY = "arena_picks_v1";

/** Fired on window whenever the store changes, so open cards can re-sync. */
export const PICKS_EVENT = "arena:picks";

export type Pick = {
  matchNum: number;
  slug: string;
  outcome: "home" | "draw" | "away";
  pickedAt: string; // ISO instant
  /** The Elo model's probability of the chosen outcome at pick time. */
  eloProbAtPick: number;
  /** De-vigged TxODDS market probability at pick time; null until the live feed lands. */
  marketProbAtPick: number | null;
};

export type PickRecord = Pick & {
  settled: boolean;
  correct: boolean | null; // null until settled
};

/** Minimal fixture shape needed to settle a pick. */
export type SettleFixture = {
  num: number;
  played: boolean;
  score: [number, number] | null;
};

/** SettleFixture extended with the Elo model's pre-match probabilities. */
export type ModelFixture = SettleFixture & {
  p1Win: number | null;
  pDraw: number | null;
  p2Win: number | null;
};

export type PickSummary = {
  total: number;
  settled: number;
  correct: number;
  accuracy: number; // correct / settled, 0 when nothing settled
  eloCorrect: number; // over the same settled picks, how often the model's favorite won
  eloAccuracy: number;
  streak: number; // consecutive correct picks counting back from the latest settled one
};

// ---------- storage primitives ----------

function storageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function isOutcome(v: unknown): v is Pick["outcome"] {
  return v === "home" || v === "draw" || v === "away";
}

function read(): Record<number, Pick> {
  if (!storageAvailable()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    const out: Record<number, Pick> = {};
    for (const value of Object.values(parsed)) {
      const p = value as Partial<Pick>;
      if (
        typeof p?.matchNum === "number" &&
        typeof p.slug === "string" &&
        isOutcome(p.outcome) &&
        typeof p.pickedAt === "string" &&
        typeof p.eloProbAtPick === "number"
      ) {
        out[p.matchNum] = {
          matchNum: p.matchNum,
          slug: p.slug,
          outcome: p.outcome,
          pickedAt: p.pickedAt,
          eloProbAtPick: p.eloProbAtPick,
          marketProbAtPick:
            typeof p.marketProbAtPick === "number" ? p.marketProbAtPick : null,
        };
      }
    }
    return out;
  } catch {
    return {};
  }
}

function write(picks: Record<number, Pick>): void {
  if (!storageAvailable()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
    window.dispatchEvent(new Event(PICKS_EVENT));
  } catch {
    // storage full or blocked: fail silently, picks are best-effort in v1
  }
}

// ---------- public API ----------

/** All stored picks keyed by fixture number. Empty object during SSR. */
export function getPicks(): Record<number, Pick> {
  return read();
}

/** Save (or overwrite) the pick for a fixture. No-op during SSR. */
export function setPick(p: Pick): void {
  if (!storageAvailable()) return;
  const picks = read();
  picks[p.matchNum] = p;
  write(picks);
}

/** Remove the pick for a fixture, if any. No-op during SSR. */
export function removePick(matchNum: number): void {
  if (!storageAvailable()) return;
  const picks = read();
  if (!(matchNum in picks)) return;
  delete picks[matchNum];
  write(picks);
}

/** The outcome a final score settles to. */
export function outcomeOfScore(score: [number, number]): Pick["outcome"] {
  if (score[0] > score[1]) return "home";
  if (score[0] < score[1]) return "away";
  return "draw";
}

/**
 * The Elo model's favored outcome from pre-match probabilities.
 * Ties break home > draw > away. Null when any probability is missing.
 */
export function modelFavorite(
  p1Win: number | null,
  pDraw: number | null,
  p2Win: number | null
): Pick["outcome"] | null {
  if (p1Win === null || pDraw === null || p2Win === null) return null;
  if (p1Win >= pDraw && p1Win >= p2Win) return "home";
  if (pDraw >= p2Win) return "draw";
  return "away";
}

/**
 * Grade every stored pick against the current fixture list.
 * A pick settles once its fixture is played with a final score; correctness is
 * pick.outcome versus outcomeOfScore. Returns records sorted by fixture number.
 */
export function settle(fixtures: SettleFixture[]): PickRecord[] {
  const picks = read();
  const byNum = new Map(fixtures.map((f) => [f.num, f]));
  return Object.values(picks)
    .map((p): PickRecord => {
      const f = byNum.get(p.matchNum);
      if (!f || !f.played || !f.score) {
        return { ...p, settled: false, correct: null };
      }
      return {
        ...p,
        settled: true,
        correct: p.outcome === outcomeOfScore(f.score),
      };
    })
    .sort((a, b) => a.matchNum - b.matchNum);
}

/**
 * Your record versus the model, over the same settled matches you picked.
 * eloCorrect counts how often the model's highest-probability outcome was
 * right on those matches. streak is consecutive correct picks counting back
 * from the most recently settled fixture (a wrong pick resets it to 0).
 */
export function summarize(fixtures: ModelFixture[]): PickSummary {
  const picks = read();
  const byNum = new Map(fixtures.map((f) => [f.num, f]));

  let total = 0;
  let settled = 0;
  let correct = 0;
  let eloCorrect = 0;

  // fixture-number order = chronological order (fixtures are numbered 1..104
  // chronologically by the tournament layer)
  const ordered = Object.values(picks).sort((a, b) => a.matchNum - b.matchNum);
  const settledResults: boolean[] = [];

  for (const p of ordered) {
    total++;
    const f = byNum.get(p.matchNum);
    if (!f || !f.played || !f.score) continue;

    settled++;
    const actual = outcomeOfScore(f.score);
    const userRight = p.outcome === actual;
    if (userRight) correct++;
    settledResults.push(userRight);

    const fav = modelFavorite(f.p1Win, f.pDraw, f.p2Win);
    if (fav !== null && fav === actual) eloCorrect++;
  }

  let streak = 0;
  for (let i = settledResults.length - 1; i >= 0 && settledResults[i]; i--) {
    streak++;
  }

  return {
    total,
    settled,
    correct,
    accuracy: settled > 0 ? correct / settled : 0,
    eloCorrect,
    eloAccuracy: settled > 0 ? eloCorrect / settled : 0,
    streak,
  };
}
