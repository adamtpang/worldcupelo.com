import Link from "next/link";
import { TEAMS, CONFEDERATIONS, ratingTier } from "@/lib/teams";
import RankingsTable from "@/components/RankingsTable";

export default function HomePage() {
  const top = TEAMS.slice(0, 10);
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
      <section className="border-b border-[var(--border)] relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #d4af37 0px, transparent 50%), radial-gradient(circle at 80% 80%, #ef4444 0px, transparent 50%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Elo · Updated after every international match
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
              The definitive <span className="gold-text gold-glow">Elo ratings</span>
              <br />
              for national football teams.
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-2">
              A continuous rating of every men's national team, based on match
              results, opponent strength, and home advantage. Built for the road to
              the 2026 World Cup.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
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
                href="/compare"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium px-4 py-2 rounded-md text-sm transition"
              >
                Head-to-head →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-10">
            {top.slice(0, 5).map((t, i) => (
              <Link
                key={t.code}
                href={`/team/${t.code.toLowerCase()}`}
                className="group bg-[var(--bg-card)] border border-[var(--border)] hover:border-amber-500/40 rounded-lg p-3 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-zinc-500 font-mono">
                    #{i + 1}
                  </span>
                  <span className="text-2xl leading-none">{t.flag}</span>
                </div>
                <div className="font-bold text-sm leading-tight truncate">
                  {t.name}
                </div>
                <div className="text-mono text-amber-300 text-xl font-bold tabular mt-1">
                  {t.rating}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Global Rankings</h2>
            <p className="text-zinc-500 text-sm mt-1">
              Top {TEAMS.length} men's national teams by Elo rating
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
            Updated · {lastUpdated}
          </div>
        </div>
        <RankingsTable teams={TEAMS} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-1">By Confederation</h2>
        <p className="text-zinc-500 text-sm mb-6">
          Each region's strongest team
        </p>
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
                  <span className="text-3xl">{leader.flag}</span>
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
