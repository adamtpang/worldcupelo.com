import Link from "next/link";
import { TEAMS, CONFEDERATIONS, ratingTier, flagUrl } from "@/lib/teams";
import RankingsTable from "@/components/RankingsTable";

export default function HomePage() {
  const wcCountdownDays = Math.max(
    0,
    Math.ceil(
      (new Date("2026-06-11T00:00:00Z").getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    )
  );
  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      {/* Compact identity bar, keeps the table high on the page */}
      <section className="border-b border-[var(--border)] relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, #d4af37 0px, transparent 45%), radial-gradient(circle at 85% 80%, #ef4444 0px, transparent 45%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-semibold mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Elo · Every men's national team
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              National-team <span className="gold-text gold-glow">Elo ratings</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              A continuous rating of every men's national team, built from match
              results, opponent strength, and home advantage.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/world-cup-2026"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 text-black font-bold px-4 py-2 rounded-md text-sm hover:from-amber-200 hover:to-amber-400 transition"
            >
              World Cup 2026
              <span className="text-[10px] font-mono bg-black/20 px-1.5 py-0.5 rounded">
                {wcCountdownDays}d
              </span>
            </Link>
            <Link
              href="/predict"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium px-4 py-2 rounded-md text-sm transition"
            >
              Predict →
            </Link>
          </div>
        </div>
      </section>

      {/* PRIMARY ARTIFACT: the rankings table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
              Global Rankings
            </h2>
            <p className="text-zinc-500 text-sm mt-0.5">
              All {TEAMS.length} men's national teams by Elo rating
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
            Updated · {lastUpdated}
          </div>
        </div>
        <RankingsTable teams={TEAMS} />
      </section>

      {/* Secondary: confederation leaders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
          By Confederation
        </h2>
        <p className="text-zinc-500 text-sm mb-5">Each region's strongest side</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(CONFEDERATIONS).map(([key, c]) => {
            const leader = TEAMS.find((t) => t.confederation === key);
            if (!leader) return null;
            const tier = ratingTier(leader.rating);
            return (
              <Link
                key={key}
                href={`/team/${leader.code.toLowerCase()}`}
                className="group bg-[var(--bg-card)] border border-[var(--border)] hover:border-white/20 rounded-lg p-4 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: `${c.color}20`,
                      color: c.color,
                    }}
                  >
                    {c.name}
                  </span>
                  <span className="text-[10px] text-zinc-500">{c.region}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={flagUrl(leader.code)}
                    alt={`${leader.name} flag`}
                    loading="lazy"
                    width={40}
                    height={28}
                    className="h-7 w-10 shrink-0 rounded-[3px] object-cover ring-1 ring-white/10"
                  />
                  <div>
                    <div className="font-bold text-base">{leader.name}</div>
                    <div className="text-mono text-amber-300 text-lg font-bold tabular leading-none mt-0.5">
                      {leader.rating}
                    </div>
                  </div>
                </div>
                <div className={`text-[11px] mt-3 ${tier.color} font-semibold`}>
                  {tier.label}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
