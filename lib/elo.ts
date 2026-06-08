// Football Elo engine — World Football Elo Ratings methodology.
// Implements expected score, tournament-weighted K, home advantage,
// and goal-difference weighting. Self-contained and dependency-free so
// it can run in API routes, server components, and the data pipeline.

export type MatchType =
  | "world_cup"
  | "continental"
  | "qualifier"
  | "nations_league"
  | "friendly";

// K weights. The user's spec values are used as defaults; eloratings.net
// itself runs hotter (WC finals K=60). Tunable in one place.
export const K_WEIGHTS: Record<MatchType, number> = {
  world_cup: 30,
  continental: 28,
  qualifier: 25,
  nations_league: 22,
  friendly: 20,
};

// Home advantage in Elo points (spec: ~58–60). Neutral venues use 0.
export const HOME_ADVANTAGE = 60;

export const BASE_ELO = 1500;

/** Expected score for A vs B given a rating gap (already including any HA). */
export function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

/**
 * Goal-difference multiplier G (World Football Elo Ratings).
 *  GD 0–1 → 1.00, GD 2 → 1.50, GD 3 → 1.75, GD 4+ → 1.75 + (GD−3)/8
 */
export function goalDifferenceIndex(goalDiff: number): number {
  const gd = Math.abs(goalDiff);
  if (gd <= 1) return 1;
  if (gd === 2) return 1.5;
  if (gd === 3) return 1.75;
  return 1.75 + (gd - 3) / 8;
}

export type EloUpdate = {
  homeAfter: number;
  awayAfter: number;
  homeDelta: number;
  awayDelta: number;
  homeExpected: number;
  awayExpected: number;
};

/**
 * Update both teams' Elo after a single match (zero-sum).
 * `homeScore`/`awayScore` are goals; `neutral` disables home advantage.
 */
export function updateElo(
  homeRating: number,
  awayRating: number,
  homeScore: number,
  awayScore: number,
  opts: { matchType?: MatchType; neutral?: boolean } = {}
): EloUpdate {
  const k = K_WEIGHTS[opts.matchType ?? "friendly"];
  const ha = opts.neutral ? 0 : HOME_ADVANTAGE;

  const homeExpected = expectedScore(homeRating + ha, awayRating);
  const awayExpected = 1 - homeExpected;

  const result =
    homeScore > awayScore ? 1 : homeScore === awayScore ? 0.5 : 0;

  const g = goalDifferenceIndex(homeScore - awayScore);
  const homeDelta = k * g * (result - homeExpected);

  return {
    homeAfter: Math.round((homeRating + homeDelta) * 100) / 100,
    awayAfter: Math.round((awayRating - homeDelta) * 100) / 100,
    homeDelta: Math.round(homeDelta * 100) / 100,
    awayDelta: Math.round(-homeDelta * 100) / 100,
    homeExpected,
    awayExpected,
  };
}

export type Outcome = { win: number; draw: number; loss: number };

/**
 * Win / draw / loss probabilities for A vs B.
 * Draw share is modelled as a bell over the rating gap, then split off the
 * raw two-way expectation — a standard approximation for football Elo.
 */
export function matchProbabilities(
  ratingA: number,
  ratingB: number,
  homeAdvantage = 0
): Outcome {
  const eA = expectedScore(ratingA + homeAdvantage, ratingB);
  const eB = 1 - eA;
  const gap = ratingA + homeAdvantage - ratingB;
  const draw = 0.27 * Math.exp(-Math.pow(gap, 2) / 200000);
  return {
    win: eA * (1 - draw / 2),
    draw,
    loss: eB * (1 - draw / 2),
  };
}

/** Expected goals supremacy from a rating gap — light heuristic for UI. */
export function expectedSupremacy(
  ratingA: number,
  ratingB: number,
  homeAdvantage = 0
): number {
  const gap = ratingA + homeAdvantage - ratingB;
  return Math.round((gap / 130) * 100) / 100;
}
