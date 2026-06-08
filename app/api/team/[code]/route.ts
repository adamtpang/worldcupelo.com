import { NextResponse } from "next/server";
import { TEAMS, getTeam } from "@/lib/teams";
import { matchProbabilities } from "@/lib/elo";

export const dynamic = "force-static";

export function generateStaticParams() {
  return TEAMS.map((t) => ({ code: t.code.toLowerCase() }));
}

// GET /api/team/ESP
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const team = getTeam(code);
  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  const regional = TEAMS.filter(
    (t) => t.confederation === team.confederation
  ).map((t) => ({ name: t.name, code: t.code, elo: t.rating }));

  const topOpponents = TEAMS.slice(0, 10)
    .filter((t) => t.code !== team.code)
    .map((opp) => ({
      name: opp.name,
      code: opp.code,
      elo: opp.rating,
      probabilities: round(matchProbabilities(team.rating, opp.rating)),
    }));

  return NextResponse.json({
    updated: new Date().toISOString(),
    team: {
      rank: team.rank,
      name: team.name,
      code: team.code,
      elo: team.rating,
      peak: team.peakRating ?? team.rating,
      confederation: team.confederation,
      host: !!team.host,
      worldCupTitles: team.wcTitles ?? 0,
    },
    regional,
    topOpponents,
  });
}

function round(o: { win: number; draw: number; loss: number }) {
  return {
    win: Math.round(o.win * 1000) / 1000,
    draw: Math.round(o.draw * 1000) / 1000,
    loss: Math.round(o.loss * 1000) / 1000,
  };
}
