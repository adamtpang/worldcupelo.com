import Link from "next/link";
import { CONFEDERATIONS, TEAMS } from "@/lib/teams";

export const metadata = {
  title: "World Cup 2026 · Elo-Based Predictions",
  description:
    "The 2026 World Cup is hosted by USA, Canada, and Mexico. Track the contenders by Elo rating and find this year's title favorites.",
};

export default function WorldCup2026Page() {
  const hosts = TEAMS.filter((t) => t.host);
  const top16 = TEAMS.slice(0, 16);

  const wcDate = new Date("2026-06-11T00:00:00Z");
  const daysToKickoff = Math.max(
    0,
    Math.ceil((wcDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const contendersByConfed: Record<string, typeof TEAMS> = {};
  Object.keys(CONFEDERATIONS).forEach((c) => {
    contendersByConfed[c] = TEAMS.filter((t) => t.confederation === c).slice(0, 8);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/5 border border-amber-500/20 rounded-2xl p-6 sm:p-10 mb-10 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute right-0 top-0 text-[180px] sm:text-[260px] leading-none opacity-[0.07] -translate-y-12 translate-x-8 select-none"
        >
          🏆
        </div>
        <div className="relative">
          <div className="text-[11px] uppercase tracking-[0.18em] text-amber-300 font-bold mb-2">
            FIFA World Cup 2026
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
            The first <span className="gold-text">48-team</span> World Cup.
            <br />
            Three hosts. One trophy.
          </h1>
          <p className="text-zinc-400 mt-4 max-w-2xl">
            June 11 – July 19, 2026 · Hosted across the United States, Canada, and
            Mexico. Here's how every contender stacks up by Elo.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="bg-black/30 border border-amber-500/30 rounded-lg px-4 py-3">
              <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                Kickoff in
              </div>
              <div className="text-mono text-amber-300 text-2xl font-black tabular leading-none mt-1">
                {daysToKickoff}d
              </div>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-3">
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                Teams
              </div>
              <div className="text-mono text-white text-2xl font-black tabular leading-none mt-1">
                48
              </div>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-3">
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                Matches
              </div>
              <div className="text-mono text-white text-2xl font-black tabular leading-none mt-1">
                104
              </div>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-3">
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                Host cities
              </div>
              <div className="text-mono text-white text-2xl font-black tabular leading-none mt-1">
                16
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-1">Host Nations</h2>
        <p className="text-zinc-500 text-sm mb-4">
          Automatic qualification for hosting.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {hosts.map((t) => (
            <Link
              key={t.code}
              href={`/team/${t.code.toLowerCase()}`}
              className="group bg-[var(--bg-card)] border border-amber-500/20 hover:border-amber-500/50 rounded-xl p-5 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  Host
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  RANK #{t.rank}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-5xl leading-none">{t.flag}</span>
                <div>
                  <div className="font-bold text-xl">{t.name}</div>
                  <div className="text-mono text-amber-300 text-2xl font-bold tabular leading-none mt-1">
                    {t.rating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-1">
          Title Favorites
        </h2>
        <p className="text-zinc-500 text-sm mb-4">
          The 16 highest-rated teams in the world right now.
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-zinc-500 border-b border-[var(--border)]">
                <th className="text-left px-3 py-2 font-medium w-[60px]">Rank</th>
                <th className="text-left px-3 py-2 font-medium">Team</th>
                <th className="text-right px-3 py-2 font-medium">Elo</th>
                <th className="text-right px-3 py-2 font-medium hidden sm:table-cell">
                  Title odds*
                </th>
              </tr>
            </thead>
            <tbody>
              {top16.map((t, i) => {
                const oddsBase = Math.pow(10, (t.rating - 1800) / 400);
                const top16Total = top16.reduce(
                  (acc, x) => acc + Math.pow(10, (x.rating - 1800) / 400),
                  0
                );
                const odds = (oddsBase / top16Total) * 100 * 0.85;
                return (
                  <tr
                    key={t.code}
                    className="border-b border-[var(--border)]/50 hover:bg-white/[0.02]"
                  >
                    <td className="px-3 py-2.5 text-mono text-zinc-500 tabular text-sm">
                      {i + 1}
                    </td>
                    <td className="px-3 py-2.5">
                      <Link
                        href={`/team/${t.code.toLowerCase()}`}
                        className="flex items-center gap-3 hover:text-amber-300"
                      >
                        <span className="text-xl">{t.flag}</span>
                        <span className="font-semibold">{t.name}</span>
                        {t.host && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            Host
                          </span>
                        )}
                        {t.wcTitles && t.wcTitles > 0 && (
                          <span className="text-[10px] text-amber-300">
                            {"★".repeat(t.wcTitles)}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-right text-mono font-bold tabular text-amber-300">
                      {t.rating}
                    </td>
                    <td className="px-3 py-2.5 text-right text-mono tabular text-zinc-300 hidden sm:table-cell">
                      {odds.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">
          * Naïve title odds derived from Elo only, not a forecast. See{" "}
          <Link href="/methodology" className="underline hover:text-zinc-300">
            methodology
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-1">
          Strongest contenders by confederation
        </h2>
        <p className="text-zinc-500 text-sm mb-4">
          Top sides from each region heading into the tournament.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {Object.entries(CONFEDERATIONS).map(([key, c]) => (
            <div
              key={key}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden"
            >
              <div
                className="px-4 py-3 flex items-center justify-between border-b border-[var(--border)]"
                style={{ background: `${c.color}10` }}
              >
                <div>
                  <div
                    className="text-sm font-bold tracking-wide"
                    style={{ color: c.color }}
                  >
                    {c.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    {c.region}
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">
                  TOP {contendersByConfed[key].length}
                </span>
              </div>
              <div className="divide-y divide-[var(--border)]/50">
                {contendersByConfed[key].map((t, i) => (
                  <Link
                    key={t.code}
                    href={`/team/${t.code.toLowerCase()}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-white/[0.02]"
                  >
                    <span className="text-zinc-500 text-mono text-xs w-5">
                      {i + 1}
                    </span>
                    <span className="text-lg">{t.flag}</span>
                    <span className="font-medium flex-1">{t.name}</span>
                    <span className="text-mono tabular text-amber-300 font-bold text-sm">
                      {t.rating}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
