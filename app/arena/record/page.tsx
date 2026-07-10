// My record: server shell that fetches the tournament (ISR 30m) and hands
// serializable fixtures to the client RecordClient, which joins them with
// localStorage picks and renders the you-vs-model scoreboard.

import type { Metadata } from "next";
import { getTournament } from "@/lib/tournament";
import RecordClient, { type RecordFixture } from "@/components/RecordClient";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "My record · Elo Arena",
  description:
    "Your World Cup 2026 picks, settled against full-time scores and measured against the Elo model on the same matches.",
};

export default async function LeaderboardPage() {
  const t = await getTournament();

  const fixtures: RecordFixture[] = t.fixtures.map((f) => ({
    num: f.num,
    dateUtc: f.dateUtc,
    team1: f.team1,
    team2: f.team2,
    team1Name: f.team1Name,
    team2Name: f.team2Name,
    played: f.played,
    score: f.score,
    p1Win: f.p1Win,
    pDraw: f.pDraw,
    p2Win: f.p2Win,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        {t.stageNow} · {t.playedCount}/104 played
      </div>
      <h1 className="mt-1 font-display font-bold tracking-tight text-3xl sm:text-4xl">
        My <span className="gold-text">record</span>
      </h1>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-zinc-400">
        Every pick settles on the full-time score. The Elo model is graded on
        the same matches, so the comparison is honest: same fixtures, same
        yardstick.
      </p>
      <div className="mt-8">
        <RecordClient fixtures={fixtures} />
      </div>
    </div>
  );
}
