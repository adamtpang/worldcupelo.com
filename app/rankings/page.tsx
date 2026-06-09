import { TEAMS } from "@/lib/teams";
import RankingsTable from "@/components/RankingsTable";

export const metadata = {
  title: "Full Rankings · World Cup Elo",
  description:
    "Complete Elo rankings for every men's national football team, filterable by confederation and searchable.",
};

export default function RankingsPage() {
  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
            Global <span className="gold-text">Rankings</span>
          </h1>
          <p className="text-zinc-400 mt-2">
            All {TEAMS.length} men's national teams by Elo rating. Filter by
            confederation or search.
          </p>
        </div>
        <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
          Updated · {lastUpdated}
        </div>
      </div>
      <RankingsTable teams={TEAMS} />
    </div>
  );
}
