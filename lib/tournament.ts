// Live 2026 World Cup tournament layer.
// Fetches the openfootball public-domain fixtures feed (ISR, 30 min), maps
// team names to our codes, computes group standings, and backfills LIVE Elo
// by replaying every finished match through lib/elo updateElo() in order.
// Falls back to the bundled snapshot in data/worldcup2026.json if the fetch
// fails, so the site always renders.

import { TEAMS, type Team } from "@/lib/teams";
import { updateElo, matchProbabilities } from "@/lib/elo";
import bundled from "@/data/worldcup2026.json";

const FEED_URL =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";

// ---------- raw feed types ----------
type RawGoal = { name: string; minute: string };
type RawMatch = {
  num?: number; // only present on the 32 knockout matches in the feed
  round: string;
  date: string; // YYYY-MM-DD (local)
  time?: string; // "13:00 UTC-6"
  team1: string;
  team2: string;
  group?: string; // "Group A"
  ground?: string;
  score?: { ft?: [number, number]; ht?: [number, number] };
  goals1?: RawGoal[];
  goals2?: RawGoal[];
};
type RawFeed = { name: string; matches: RawMatch[] };

// ---------- public types ----------
export type Stage =
  | "group"
  | "r32"
  | "r16"
  | "qf"
  | "sf"
  | "third"
  | "final";

export type Fixture = {
  num: number;
  round: string;
  stage: Stage;
  group: string | null; // "A".."L"
  dateUtc: string; // ISO instant of kickoff
  dateLocal: string; // YYYY-MM-DD as listed by FIFA (venue-local)
  team1: string | null; // team code, null if not yet decided
  team2: string | null;
  team1Name: string; // display name ("Winner M85" for placeholders)
  team2Name: string;
  played: boolean;
  score: [number, number] | null;
  ht: [number, number] | null;
  goals1: RawGoal[];
  goals2: RawGoal[];
  venue: string;
  venueCountry: "USA" | "CAN" | "MEX";
  slug: string; // "spain-vs-austria-m84" / "match-m99"
  // Elo context, filled during backfill
  elo1Before: number | null;
  elo2Before: number | null;
  elo1Delta: number | null; // null until played
  elo2Delta: number | null;
  p1Win: number | null; // pre-match probabilities (team1 win / draw / team2 win)
  pDraw: number | null;
  p2Win: number | null;
};

export type StandingRow = {
  code: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
};

export type Group = { id: string; rows: StandingRow[]; fixtures: Fixture[] };

export type LiveRating = {
  code: string;
  base: number; // Jan-2026 pre-tournament rating
  rating: number; // live, after all played WC matches
  delta: number; // rating - base
  playedCount: number;
};

export type Tournament = {
  fixtures: Fixture[];
  groups: Group[];
  ratings: Record<string, LiveRating>;
  liveTeams: Team[]; // TEAMS re-ranked by live rating (WC teams moved, others keep base)
  updatedAt: string;
  playedCount: number;
  stageNow: string; // human label, e.g. "Round of 32"
};

// ---------- name -> code mapping (all 48 qualified teams) ----------
const NAME_TO_CODE: Record<string, string> = {
  Algeria: "ALG", Argentina: "ARG", Australia: "AUS", Austria: "AUT",
  Belgium: "BEL", "Bosnia & Herzegovina": "BIH", Brazil: "BRA", Canada: "CAN",
  "Cape Verde": "CPV", Colombia: "COL", Croatia: "CRO", "Curaçao": "CUW",
  "Czech Republic": "CZE", "DR Congo": "COD", Ecuador: "ECU", Egypt: "EGY",
  England: "ENG", France: "FRA", Germany: "GER", Ghana: "GHA", Haiti: "HAI",
  Iran: "IRN", Iraq: "IRQ", "Ivory Coast": "CIV", Japan: "JPN", Jordan: "JOR",
  Mexico: "MEX", Morocco: "MAR", Netherlands: "NED", "New Zealand": "NZL",
  Norway: "NOR", Panama: "PAN", Paraguay: "PAR", Portugal: "POR", Qatar: "QAT",
  "Saudi Arabia": "KSA", Scotland: "SCO", Senegal: "SEN", "South Africa": "RSA",
  "South Korea": "KOR", Spain: "ESP", Sweden: "SWE", Switzerland: "SUI",
  Tunisia: "TUN", Turkey: "TUR", USA: "USA", Uruguay: "URU", Uzbekistan: "UZB",
};

const VENUE_COUNTRY: Record<string, "USA" | "CAN" | "MEX"> = {
  "Mexico City": "MEX", Guadalajara: "MEX", Monterrey: "MEX",
  Toronto: "CAN", Vancouver: "CAN",
};

function venueCountry(ground: string | undefined): "USA" | "CAN" | "MEX" {
  if (!ground) return "USA";
  for (const [k, v] of Object.entries(VENUE_COUNTRY)) {
    if (ground.startsWith(k)) return v;
  }
  return "USA";
}

function stageOf(round: string): Stage {
  if (round.startsWith("Matchday")) return "group";
  if (round === "Round of 32") return "r32";
  if (round === "Round of 16") return "r16";
  if (round === "Quarter-final") return "qf";
  if (round === "Semi-final") return "sf";
  if (round.startsWith("Match for third")) return "third";
  return "final";
}

const STAGE_LABEL: Record<Stage, string> = {
  group: "Group Stage", r32: "Round of 32", r16: "Round of 16",
  qf: "Quarter-finals", sf: "Semi-finals", third: "Third-place match",
  final: "Final",
};

// "Winner M85" style display for unresolved slots like "W85" / "L101"
function placeholderName(raw: string): string {
  const w = raw.match(/^W(\d+)$/);
  if (w) return `Winner M${w[1]}`;
  const l = raw.match(/^L(\d+)$/);
  if (l) return `Loser M${l[1]}`;
  return raw;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Parse "13:00 UTC-6" + date into an ISO UTC instant.
function toUtcIso(date: string, time?: string): string {
  if (!time) return `${date}T18:00:00.000Z`;
  const m = time.match(/(\d{1,2}):(\d{2})\s*UTC([+-]\d{1,2})?/);
  if (!m) return `${date}T18:00:00.000Z`;
  const [, hh, mm, off] = m;
  const offset = off ? parseInt(off, 10) : 0;
  const utcMs =
    Date.parse(`${date}T${hh.padStart(2, "0")}:${mm}:00.000Z`) -
    offset * 3600_000;
  return new Date(utcMs).toISOString();
}

// ---------- feed fetch (ISR with bundled fallback) ----------
async function fetchFeed(): Promise<RawFeed> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 1800 } });
    if (res.ok) {
      const json = (await res.json()) as RawFeed;
      if (json?.matches?.length) return json;
    }
  } catch {
    // fall through to bundled snapshot
  }
  return bundled as unknown as RawFeed;
}

// ---------- core computation ----------
function build(feed: RawFeed): Tournament {
  const teamByCode = new Map(TEAMS.map((t) => [t.code, t]));

  // live ratings start from the Jan-2026 baseline
  const ratings: Record<string, LiveRating> = {};
  for (const t of TEAMS) {
    ratings[t.code] = {
      code: t.code, base: t.rating, rating: t.rating, delta: 0, playedCount: 0,
    };
  }

  // The feed only numbers the 32 knockout matches and lists group games by
  // group letter, not by date. Sort the whole field chronologically so match
  // numbers are sequential (1..104) AND the Elo backfill replays in true match
  // order (Elo is order-dependent).
  const raw = [...feed.matches]
    .map((m) => ({ m, utc: Date.parse(toUtcIso(m.date, m.time)) }))
    .sort(
      (a, b) =>
        a.utc - b.utc ||
        (a.m.num ?? 999) - (b.m.num ?? 999) ||
        a.m.team1.localeCompare(b.m.team1)
    );
  const fixtures: Fixture[] = [];

  for (let idx = 0; idx < raw.length; idx++) {
    const m = raw[idx].m;
    const fixtureNum = idx + 1;
    const code1 = NAME_TO_CODE[m.team1] ?? null;
    const code2 = NAME_TO_CODE[m.team2] ?? null;
    const played = !!m.score?.ft;
    const vc = venueCountry(m.ground);
    const stage = stageOf(m.round);

    const name1 = code1
      ? teamByCode.get(code1)?.name ?? m.team1
      : placeholderName(m.team1);
    const name2 = code2
      ? teamByCode.get(code2)?.name ?? m.team2
      : placeholderName(m.team2);

    const slug =
      code1 && code2
        ? `${slugify(name1)}-vs-${slugify(name2)}-m${fixtureNum}`
        : `match-m${fixtureNum}`;

    let elo1Before: number | null = null;
    let elo2Before: number | null = null;
    let elo1Delta: number | null = null;
    let elo2Delta: number | null = null;
    let p1Win: number | null = null;
    let pDraw: number | null = null;
    let p2Win: number | null = null;

    if (code1 && code2 && ratings[code1] && ratings[code2]) {
      elo1Before = ratings[code1].rating;
      elo2Before = ratings[code2].rating;

      // Host nations get home advantage in their own country; all else neutral.
      const homeIs1 = vc === code1;
      const homeIs2 = vc === code2;
      const neutral = !homeIs1 && !homeIs2;

      // pre-match probabilities from the ratings entering the match;
      // +60 if team1 is host, -60 if team2 is host, 0 at neutral venues
      const ha = 60;
      const probs = matchProbabilities(
        elo1Before,
        elo2Before,
        homeIs1 ? ha : homeIs2 ? -ha : 0
      );
      p1Win = probs.win;
      pDraw = probs.draw;
      p2Win = probs.loss;

      if (played && m.score?.ft) {
        const [g1, g2] = m.score.ft;
        // updateElo treats arg1 as "home"; when team2 is the host, swap.
        const upd = homeIs2
          ? updateElo(elo2Before, elo1Before, g2, g1, {
              matchType: "world_cup", neutral: false,
            })
          : updateElo(elo1Before, elo2Before, g1, g2, {
              matchType: "world_cup", neutral,
            });
        const d1 = homeIs2 ? upd.awayDelta : upd.homeDelta;
        const d2 = homeIs2 ? upd.homeDelta : upd.awayDelta;
        ratings[code1].rating = Math.round((elo1Before + d1) * 100) / 100;
        ratings[code2].rating = Math.round((elo2Before + d2) * 100) / 100;
        ratings[code1].delta =
          Math.round((ratings[code1].rating - ratings[code1].base) * 100) / 100;
        ratings[code2].delta =
          Math.round((ratings[code2].rating - ratings[code2].base) * 100) / 100;
        ratings[code1].playedCount++;
        ratings[code2].playedCount++;
        elo1Delta = Math.round(d1 * 100) / 100;
        elo2Delta = Math.round(d2 * 100) / 100;
      }
    }

    fixtures.push({
      num: fixtureNum,
      round: m.round,
      stage,
      group: m.group ? m.group.replace("Group ", "") : null,
      dateUtc: toUtcIso(m.date, m.time),
      dateLocal: m.date,
      team1: code1,
      team2: code2,
      team1Name: name1,
      team2Name: name2,
      played,
      score: m.score?.ft ?? null,
      ht: m.score?.ht ?? null,
      goals1: m.goals1 ?? [],
      goals2: m.goals2 ?? [],
      venue: m.ground ?? "TBC",
      venueCountry: vc,
      slug,
      elo1Before,
      elo2Before,
      elo1Delta,
      elo2Delta,
      p1Win,
      pDraw,
      p2Win,
    });
  }

  // ---- group standings (Pts, GD, GF tiebreak) ----
  const groupMap = new Map<string, Map<string, StandingRow>>();
  for (const f of fixtures) {
    if (f.stage !== "group" || !f.group || !f.team1 || !f.team2) continue;
    if (!groupMap.has(f.group)) groupMap.set(f.group, new Map());
    const g = groupMap.get(f.group)!;
    for (const c of [f.team1, f.team2]) {
      if (!g.has(c)) {
        g.set(c, { code: c, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 });
      }
    }
    if (f.played && f.score) {
      const [g1, g2] = f.score;
      const r1 = g.get(f.team1)!;
      const r2 = g.get(f.team2)!;
      r1.p++; r2.p++;
      r1.gf += g1; r1.ga += g2;
      r2.gf += g2; r2.ga += g1;
      if (g1 > g2) { r1.w++; r2.l++; r1.pts += 3; }
      else if (g1 < g2) { r2.w++; r1.l++; r2.pts += 3; }
      else { r1.d++; r2.d++; r1.pts++; r2.pts++; }
      r1.gd = r1.gf - r1.ga;
      r2.gd = r2.gf - r2.ga;
    }
  }
  const groups: Group[] = [...groupMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, rows]) => ({
      id,
      rows: [...rows.values()].sort(
        (a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf ||
          a.code.localeCompare(b.code)
      ),
      fixtures: fixtures.filter((f) => f.stage === "group" && f.group === id),
    }));

  // ---- live team list, re-ranked ----
  const liveTeams: Team[] = TEAMS.map((t) => ({
    ...t,
    rating: Math.round(ratings[t.code]?.rating ?? t.rating),
    peakRating: Math.max(
      t.peakRating ?? t.rating,
      Math.round(ratings[t.code]?.rating ?? t.rating)
    ),
  }))
    .sort((a, b) => b.rating - a.rating)
    .map((t, i) => ({ ...t, rank: i + 1 }));

  // ---- current stage label ----
  const nextUnplayed = fixtures.find((f) => !f.played);
  const lastPlayed = [...fixtures].reverse().find((f) => f.played);
  const stageNow = STAGE_LABEL[(nextUnplayed ?? lastPlayed)?.stage ?? "final"];

  return {
    fixtures,
    groups,
    ratings,
    liveTeams,
    updatedAt: new Date().toISOString(),
    playedCount: fixtures.filter((f) => f.played).length,
    stageNow,
  };
}

// Single entry point for all pages.
export async function getTournament(): Promise<Tournament> {
  const feed = await fetchFeed();
  return build(feed);
}

// Build-time-safe variant for generateStaticParams (bundled data only,
// no network) so param generation is deterministic.
export function getTournamentStatic(): Tournament {
  return build(bundled as unknown as RawFeed);
}

// ---------- small helpers for pages ----------
export function fixturesOn(t: Tournament, isoDate: string): Fixture[] {
  return t.fixtures.filter((f) => f.dateUtc.slice(0, 10) === isoDate);
}

export function upcoming(t: Tournament, n = 8): Fixture[] {
  return t.fixtures.filter((f) => !f.played).slice(0, n);
}

export function recentResults(t: Tournament, n = 8): Fixture[] {
  return t.fixtures.filter((f) => f.played).slice(-n).reverse();
}

export function biggestMovers(t: Tournament, n = 5): LiveRating[] {
  return Object.values(t.ratings)
    .filter((r) => r.playedCount > 0)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, n);
}

export function teamFixtures(t: Tournament, code: string): Fixture[] {
  return t.fixtures.filter((f) => f.team1 === code || f.team2 === code);
}
