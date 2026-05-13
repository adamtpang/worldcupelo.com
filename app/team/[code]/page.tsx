import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONFEDERATIONS,
  TEAMS,
  getTeam,
  ratingTier,
  winProbability,
} from "@/lib/teams";

export function generateStaticParams() {
  return TEAMS.map((t) => ({ code: t.code.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const team = getTeam(code);
  if (!team) return { title: "Team not found" };
  return {
    title: `${team.name} · Elo ${team.rating} · World Cup Elo`,
    description: `${team.name} is currently ranked #${team.rank} in the world with an Elo rating of ${team.rating}.`,
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const team = getTeam(code);
  if (!team) notFound();

  const tier = ratingTier(team.rating);
  const conf = CONFEDERATIONS[team.confederation];
  const peakDiff = (team.peakRating ?? team.rating) - team.rating;

  const sameConfederation = TEAMS.filter(
    (t) => t.confederation === team.confederation && t.code !== team.code
  ).slice(0, 8);

  const nearbyRivals = TEAMS.filter((t) => t.code !== team.code)
    .map((t) => ({ ...t, diff: Math.abs(t.rating - team.rating) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-[12px] text-zinc-500 hover:text-zinc-300 mb-6"
      >
        ← Back to rankings
      </Link>

      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute right-0 top-0 w-64 h-64 opacity-[0.06] -translate-y-12 translate-x-12 text-[280px] leading-none"
          >
            {team.flag}
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{
                  background: `${conf.color}20`,
                  color: conf.color,
                }}
              >
                {conf.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                RANK #{team.rank}
              </span>
              {team.host && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  2026 Host
                </span>
              )}
            </div>
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-7xl sm:text-8xl leading-none">{team.flag}</span>
              <div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                  {team.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-sm font-semibold ${tier.color}`}>
                    {tier.label}
                  </span>
                  {team.wcTitles && team.wcTitles > 0 && (
                    <span className="text-amber-300 text-sm">
                      {"★".repeat(team.wcTitles)}{" "}
                      <span className="text-zinc-500 text-[11px]">
                        {team.wcTitles} World Cup{team.wcTitles > 1 ? "s" : ""}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Current Elo" value={team.rating.toString()} accent="amber" big />
          <Stat
            label="Peak Elo"
            value={(team.peakRating ?? team.rating).toString()}
            sub={peakDiff > 0 ? `−${peakDiff}` : "at peak"}
          />
          <Stat label="World Rank" value={`#${team.rank}`} />
          <Stat label="Confederation" value={team.confederation} />
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-bold tracking-tight mb-3">
          Win probability vs. top opponents
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-zinc-500 border-b border-[var(--border)]">
                <th className="text-left px-3 py-2 font-medium">Opponent</th>
                <th className="text-right px-3 py-2 font-medium">Their Elo</th>
                <th className="text-right px-3 py-2 font-medium">
                  {team.name} win
                </th>
                <th className="text-right px-3 py-2 font-medium hidden sm:table-cell">
                  Draw
                </th>
                <th className="text-right px-3 py-2 font-medium">
                  Opponent win
                </th>
              </tr>
            </thead>
            <tbody>
              {TEAMS.slice(0, 8)
                .filter((t) => t.code !== team.code)
                .slice(0, 6)
                .map((opp) => {
                  const pWin = winProbability(team.rating, opp.rating);
                  const pLose = 1 - pWin;
                  const drawFactor = Math.exp(
                    -Math.pow(team.rating - opp.rating, 2) / 200000
                  );
                  const draw = 0.27 * drawFactor;
                  const win = pWin * (1 - draw / 2);
                  const lose = pLose * (1 - draw / 2);
                  return (
                    <tr
                      key={opp.code}
                      className="border-b border-[var(--border)]/50 hover:bg-white/[0.02]"
                    >
                      <td className="px-3 py-2.5">
                        <Link
                          href={`/team/${opp.code.toLowerCase()}`}
                          className="flex items-center gap-2 hover:text-amber-300"
                        >
                          <span className="text-lg">{opp.flag}</span>
                          <span className="font-medium">{opp.name}</span>
                        </Link>
                      </td>
                      <td className="px-3 py-2.5 text-right text-mono tabular text-zinc-400">
                        {opp.rating}
                      </td>
                      <td className="px-3 py-2.5 text-right text-mono tabular font-bold text-emerald-300">
                        {(win * 100).toFixed(0)}%
                      </td>
                      <td className="px-3 py-2.5 text-right text-mono tabular text-zinc-500 hidden sm:table-cell">
                        {(draw * 100).toFixed(0)}%
                      </td>
                      <td className="px-3 py-2.5 text-right text-mono tabular text-red-300">
                        {(lose * 100).toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <h2 className="text-lg font-bold tracking-tight mb-3">
            Closest rivals (by Elo)
          </h2>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg divide-y divide-[var(--border)]/50">
            {nearbyRivals.map((r) => (
              <Link
                key={r.code}
                href={`/team/${r.code.toLowerCase()}`}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.02]"
              >
                <span className="text-lg">{r.flag}</span>
                <span className="font-medium flex-1">{r.name}</span>
                <span className="text-mono tabular text-amber-300 font-bold text-sm">
                  {r.rating}
                </span>
                <span
                  className={`text-[11px] text-mono tabular w-12 text-right ${
                    r.rating > team.rating ? "text-emerald-400" : "text-zinc-500"
                  }`}
                >
                  {r.rating > team.rating ? "+" : "−"}
                  {Math.abs(r.rating - team.rating)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight mb-3">
            {team.confederation} regional table
          </h2>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg divide-y divide-[var(--border)]/50">
            {sameConfederation.map((r) => (
              <Link
                key={r.code}
                href={`/team/${r.code.toLowerCase()}`}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.02]"
              >
                <span className="text-zinc-500 text-mono text-xs w-7">
                  #{r.rank}
                </span>
                <span className="text-lg">{r.flag}</span>
                <span className="font-medium flex-1">{r.name}</span>
                <span className="text-mono tabular text-amber-300 font-bold text-sm">
                  {r.rating}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  big,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  big?: boolean;
  accent?: "amber";
}) {
  return (
    <div
      className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 ${
        big ? "col-span-2" : ""
      }`}
    >
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        {label}
      </div>
      <div
        className={`text-mono font-bold tabular leading-none mt-1 ${
          big ? "text-4xl" : "text-2xl"
        } ${accent === "amber" ? "text-amber-300" : "text-white"}`}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[10px] text-zinc-500 font-mono mt-1.5">{sub}</div>
      )}
    </div>
  );
}
