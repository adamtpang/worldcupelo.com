import { NextResponse } from "next/server";
import { TEAMS, type Confederation } from "@/lib/teams";

// GET /api/rankings?confederation=UEFA&limit=50
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const confederation = searchParams.get("confederation") as Confederation | null;
  const limit = Number(searchParams.get("limit") ?? "0");

  let teams = TEAMS;
  if (confederation) {
    teams = teams.filter((t) => t.confederation === confederation);
  }
  if (limit > 0) {
    teams = teams.slice(0, limit);
  }

  return NextResponse.json({
    updated: new Date().toISOString(),
    count: teams.length,
    source: "World Football Elo Ratings",
    teams: teams.map((t) => ({
      rank: t.rank,
      name: t.name,
      code: t.code,
      elo: t.rating,
      peak: t.peakRating ?? t.rating,
      confederation: t.confederation,
      host: !!t.host,
      worldCupTitles: t.wcTitles ?? 0,
    })),
  });
}
