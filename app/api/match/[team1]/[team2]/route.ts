import { NextResponse } from "next/server";
import { getTeam } from "@/lib/teams";
import { matchProbabilities, expectedSupremacy, HOME_ADVANTAGE } from "@/lib/elo";

// GET /api/match/ESP/BRA?venue=neutral|home
export async function GET(
  request: Request,
  { params }: { params: Promise<{ team1: string; team2: string }> }
) {
  const { team1, team2 } = await params;
  const a = getTeam(team1);
  const b = getTeam(team2);
  if (!a || !b) {
    return NextResponse.json(
      { error: "One or both teams not found" },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(request.url);
  const venue = searchParams.get("venue") ?? "neutral";
  const ha = venue === "home" ? HOME_ADVANTAGE : 0;

  const probs = matchProbabilities(a.rating, b.rating, ha);

  return NextResponse.json({
    updated: new Date().toISOString(),
    venue,
    homeAdvantage: ha,
    teamA: { name: a.name, code: a.code, elo: a.rating },
    teamB: { name: b.name, code: b.code, elo: b.rating },
    eloDifference: a.rating - b.rating,
    expectedSupremacy: expectedSupremacy(a.rating, b.rating, ha),
    probabilities: {
      teamAWin: Math.round(probs.win * 1000) / 1000,
      draw: Math.round(probs.draw * 1000) / 1000,
      teamBWin: Math.round(probs.loss * 1000) / 1000,
    },
  });
}
