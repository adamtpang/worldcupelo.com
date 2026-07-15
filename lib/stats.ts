// Tournament statistics derived from the fixture feed: goals per game,
// the Golden Boot race, and per-stage scoring. Pure functions over the
// Tournament object; everything stays deterministic and ISR-fresh.

import type { Fixture, Tournament } from "@/lib/tournament";

export type Scorer = {
  name: string;
  goals: number;
  /** code of the team the player scored for (last seen) */
  code: string | null;
};

export type GoalStats = {
  totalGoals: number;
  played: number;
  perGame: number;
  scorers: Scorer[]; // sorted desc
  /** average goals per game by stage, in bracket order */
  byStage: { stage: string; label: string; games: number; perGame: number }[];
};

const STAGE_LABELS: [Fixture["stage"], string][] = [
  ["group", "Group stage"],
  ["r32", "Round of 32"],
  ["r16", "Round of 16"],
  ["qf", "Quarter-finals"],
  ["sf", "Semi-finals"],
  ["third", "Third place"],
  ["final", "Final"],
];

export function goalStats(t: Tournament, topN = 10): GoalStats {
  let totalGoals = 0;
  let played = 0;
  const scorerMap = new Map<string, Scorer>();
  const stageAgg = new Map<string, { games: number; goals: number }>();

  for (const f of t.fixtures) {
    if (!f.played || !f.score) continue;
    played++;
    const [g1, g2] = f.score;
    totalGoals += g1 + g2;

    const agg = stageAgg.get(f.stage) ?? { games: 0, goals: 0 };
    agg.games++;
    agg.goals += g1 + g2;
    stageAgg.set(f.stage, agg);

    for (const [goals, code] of [
      [f.goals1, f.team1],
      [f.goals2, f.team2],
    ] as const) {
      for (const g of goals) {
        const prev = scorerMap.get(g.name) ?? {
          name: g.name,
          goals: 0,
          code: null,
        };
        prev.goals++;
        prev.code = code ?? prev.code;
        scorerMap.set(g.name, prev);
      }
    }
  }

  const scorers = [...scorerMap.values()]
    .sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name))
    .slice(0, topN);

  const byStage = STAGE_LABELS.filter(([s]) => stageAgg.has(s)).map(
    ([stage, label]) => {
      const a = stageAgg.get(stage)!;
      return {
        stage,
        label,
        games: a.games,
        perGame: Math.round((a.goals / a.games) * 100) / 100,
      };
    }
  );

  return {
    totalGoals,
    played,
    perGame: played > 0 ? Math.round((totalGoals / played) * 100) / 100 : 0,
    scorers,
    byStage,
  };
}
