import Link from "next/link";
import { CONFEDERATIONS, flagUrl, type Team } from "@/lib/teams";
import { getTournament, type Fixture, type Stage } from "@/lib/tournament";

export const revalidate = 1800;

export const metadata = {
  title: "World Cup 2026 · Elo-Based Predictions",
  description:
    "The 2026 World Cup is hosted by USA, Canada, and Mexico. Track the contenders by Elo rating and find this year's title favorites.",
};

const KO_STAGES: { stage: Stage; label: string }[] = [
  { stage: "r32", label: "Round of 32" },
  { stage: "r16", label: "Round of 16" },
  { stage: "qf", label: "Quarter-finals" },
  { stage: "sf", label: "Semi-finals" },
  { stage: "third", label: "Third place" },
  { stage: "final", label: "Final" },
];

function BracketRow({ f }: { f: Fixture }) {
  return (
    <Link
      href={`/match/${f.slug}`}
      className="flex items-center gap-2 px-4 py-2 hover:bg-white/[0.02] text-sm"
    >
      <span className="flex items-center justify-end gap-2 flex-1 min-w-0">
        <span
          className={`truncate text-right ${
            f.team1 ? "font-medium" : "text-zinc-500"
          }`}
        >
          {f.team1Name}
        </span>
        {f.team1 && (
          <img
            src={flagUrl(f.team1)}
            alt={`${f.team1Name} flag`}
            loading="lazy"
            width={24}
            height={16}
            className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-white/10 shrink-0"
          />
        )}
      </span>
      <span
        className={`text-mono tabular text-center w-12 shrink-0 ${
          f.played && f.score
            ? "font-bold text-white"
            : "text-zinc-600 text-xs"
        }`}
      >
        {f.played && f.score ? `${f.score[0]}-${f.score[1]}` : "TBD"}
      </span>
      <span className="flex items-center gap-2 flex-1 min-w-0">
        {f.team2 && (
          <img
            src={flagUrl(f.team2)}
            alt={`${f.team2Name} flag`}
            loading="lazy"
            width={24}
            height={16}
            className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-white/10 shrink-0"
          />
        )}
        <span
          className={`truncate ${f.team2 ? "font-medium" : "text-zinc-500"}`}
        >
          {f.team2Name}
        </span>
      </span>
    </Link>
  );
}

export default async function WorldCup2026Page() {
  const t = await getTournament();
  const hosts = t.liveTeams.filter((x) => x.host);
  const top16 = t.liveTeams.slice(0, 16);

  const contendersByConfed: Record<string, Team[]> = {};
  Object.keys(CONFEDERATIONS).forEach((c) => {
    contendersByConfed[c] = t.liveTeams
      .filter((x) => x.confederation === c)
      .slice(0, 8);
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
                Stage now
              </div>
              <div className="font-display text-amber-300 text-xl sm:text-2xl font-black tracking-tight leading-none mt-1 whitespace-nowrap">
                {t.stageNow}
              </div>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-3">
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                Matches played
              </div>
              <div className="text-mono text-white text-2xl font-black tabular leading-none mt-1">
                {t.playedCount}/104
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
        <h2 className="text-2xl font-bold tracking-tight mb-1">
          Knockout bracket so far
        </h2>
        <p className="text-zinc-500 text-sm mb-4">
          Results and remaining ties from the Round of 32 onward. Unresolved
          slots show as TBD.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {KO_STAGES.map(({ stage, label }) => {
            const fs = t.fixtures.filter((f) => f.stage === stage);
            if (!fs.length) return null;
            const done = fs.filter((f) => f.played).length;
            return (
              <div
                key={stage}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden"
              >
                <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--border)]">
                  <div className="text-sm font-bold tracking-wide">{label}</div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {done}/{fs.length} PLAYED
                  </span>
                </div>
                <div className="divide-y divide-[var(--border)]/50">
                  {fs.map((f) => (
                    <BracketRow key={f.num} f={f} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-1">Host Nations</h2>
        <p className="text-zinc-500 text-sm mb-4">
          Automatic qualification for hosting.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {hosts.map((team) => (
            <Link
              key={team.code}
              href={`/team/${team.code.toLowerCase()}`}
              className="group bg-[var(--bg-card)] border border-amber-500/20 hover:border-amber-500/50 rounded-xl p-5 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  Host
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  RANK #{team.rank}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-5xl leading-none">{team.flag}</span>
                <div>
                  <div className="font-bold text-xl">{team.name}</div>
                  <div className="text-mono text-amber-300 text-2xl font-bold tabular leading-none mt-1">
                    {team.rating}
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
              {top16.map((team, i) => {
                const oddsBase = Math.pow(10, (team.rating - 1800) / 400);
                const top16Total = top16.reduce(
                  (acc, x) => acc + Math.pow(10, (x.rating - 1800) / 400),
                  0
                );
                const odds = (oddsBase / top16Total) * 100 * 0.85;
                return (
                  <tr
                    key={team.code}
                    className="border-b border-[var(--border)]/50 hover:bg-white/[0.02]"
                  >
                    <td className="px-3 py-2.5 text-mono text-zinc-500 tabular text-sm">
                      {i + 1}
                    </td>
                    <td className="px-3 py-2.5">
                      <Link
                        href={`/team/${team.code.toLowerCase()}`}
                        className="flex items-center gap-3 hover:text-amber-300"
                      >
                        <span className="text-xl">{team.flag}</span>
                        <span className="font-semibold">{team.name}</span>
                        {team.host && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            Host
                          </span>
                        )}
                        {team.wcTitles && team.wcTitles > 0 && (
                          <span className="text-[10px] text-amber-300">
                            {"★".repeat(team.wcTitles)}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-right text-mono font-bold tabular text-amber-300">
                      {team.rating}
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
                {contendersByConfed[key].map((team, i) => (
                  <Link
                    key={team.code}
                    href={`/team/${team.code.toLowerCase()}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-white/[0.02]"
                  >
                    <span className="text-zinc-500 text-mono text-xs w-5">
                      {i + 1}
                    </span>
                    <span className="text-lg">{team.flag}</span>
                    <span className="font-medium flex-1">{team.name}</span>
                    <span className="text-mono tabular text-amber-300 font-bold text-sm">
                      {team.rating}
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
