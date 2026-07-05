import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeam, flagUrl } from "@/lib/teams";
import {
  getTournament,
  getTournamentStatic,
  type Fixture,
} from "@/lib/tournament";

export const revalidate = 1800;

const SITE = "https://worldcupelo.com";

export function generateStaticParams() {
  return getTournamentStatic().groups.map((g) => ({
    id: g.id.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gid = id.toUpperCase();
  const group = getTournamentStatic().groups.find((g) => g.id === gid);
  if (!group) return { title: "Group not found" };
  const teams = group.rows
    .map((r) => getTeam(r.code)?.name ?? r.code)
    .join(", ");
  return {
    title: `World Cup 2026 Group ${gid} standings, table & Elo ratings`,
    description: `Group ${gid} at the 2026 World Cup: ${teams}. Full standings, all six fixtures with results and pre-match probabilities, plus live Elo ratings.`,
  };
}

// ---------- formatting helpers ----------

function fmtDelta(d: number): string {
  const v = Math.abs(d).toFixed(1);
  if (d > 0) return `+${v}`;
  if (d < 0) return `−${v}`;
  return "0.0";
}

function deltaColor(d: number): string {
  if (d > 0) return "text-emerald-400";
  if (d < 0) return "text-red-400";
  return "text-zinc-500";
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function fmtKickoff(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
  return `${date} · ${time} UTC`;
}

function pct(p: number): string {
  return `${Math.round(p * 100)}%`;
}

// ---------- page ----------

export default async function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gid = id.toUpperCase();
  const t = await getTournament();
  const group = t.groups.find((g) => g.id === gid);
  if (!group) notFound();

  const ids = t.groups.map((g) => g.id);
  const idx = ids.indexOf(gid);
  const prevId = ids[(idx - 1 + ids.length) % ids.length];
  const nextId = ids[(idx + 1) % ids.length];

  const complete =
    group.fixtures.length > 0 && group.fixtures.every((f) => f.played);
  const playedInGroup = group.fixtures.filter((f) => f.played).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "World Cup 2026",
        item: `${SITE}/world-cup-2026`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Group ${gid}`,
        item: `${SITE}/group/${gid.toLowerCase()}`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <Link
            href="/world-cup-2026"
            className="inline-flex items-center gap-1 text-[12px] text-zinc-500 hover:text-zinc-300 mb-4"
          >
            ← World Cup 2026
          </Link>
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
            FIFA World Cup 2026 · Group stage
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-none">
            Group <span className="gold-text">{gid}</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            {complete
              ? "Group stage complete · top two advanced to the Round of 32"
              : `${playedInGroup} of ${group.fixtures.length} matches played`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/group/${prevId.toLowerCase()}`}
            className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 font-medium px-3 py-1.5 rounded-md text-[13px] transition"
          >
            ← Group {prevId}
          </Link>
          <Link
            href={`/group/${nextId.toLowerCase()}`}
            className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 font-medium px-3 py-1.5 rounded-md text-[13px] transition"
          >
            Group {nextId} →
          </Link>
        </div>
      </div>

      {/* Standings */}
      <section className="mb-10">
        <h2 className="font-display text-lg font-bold tracking-tight mb-1">
          Standings
        </h2>
        <p className="text-zinc-500 text-sm mb-3">
          Points, goal difference, goals scored tiebreak · live Elo after every
          match played
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-zinc-500 border-b border-[var(--border)]">
                <th className="text-left px-3 py-2 font-medium w-[44px]">
                  Pos
                </th>
                <th className="text-left px-3 py-2 font-medium">Team</th>
                <th className="text-right px-2 py-2 font-medium">P</th>
                <th className="text-right px-2 py-2 font-medium hidden sm:table-cell">
                  W
                </th>
                <th className="text-right px-2 py-2 font-medium hidden sm:table-cell">
                  D
                </th>
                <th className="text-right px-2 py-2 font-medium hidden sm:table-cell">
                  L
                </th>
                <th className="text-right px-2 py-2 font-medium hidden md:table-cell">
                  GF
                </th>
                <th className="text-right px-2 py-2 font-medium hidden md:table-cell">
                  GA
                </th>
                <th className="text-right px-2 py-2 font-medium">GD</th>
                <th className="text-right px-2 py-2 font-medium">Pts</th>
                <th className="text-right px-3 py-2 font-medium">Elo</th>
                <th className="text-right px-3 py-2 font-medium">Δ</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row, i) => {
                const team = getTeam(row.code);
                const live = t.ratings[row.code];
                const advanced = complete && i < 2;
                return (
                  <tr
                    key={row.code}
                    className={`border-b border-[var(--border)]/50 hover:bg-white/[0.02] ${
                      advanced ? "bg-emerald-500/[0.04]" : ""
                    }`}
                  >
                    <td
                      className={`px-3 py-2.5 text-mono tabular text-sm text-zinc-500 ${
                        advanced
                          ? "border-l-2 border-l-emerald-500/70"
                          : "border-l-2 border-l-transparent"
                      }`}
                    >
                      {i + 1}
                    </td>
                    <td className="px-3 py-2.5">
                      <Link
                        href={`/team/${row.code.toLowerCase()}`}
                        className="inline-flex items-center gap-2 hover:text-amber-300"
                      >
                        <img
                          src={flagUrl(row.code)}
                          alt=""
                          loading="lazy"
                          width={24}
                          height={16}
                          className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
                        />
                        <span className="font-semibold">
                          {team?.name ?? row.code}
                        </span>
                        {advanced && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded hidden sm:inline">
                            Advanced
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="px-2 py-2.5 text-right text-mono tabular text-zinc-400">
                      {row.p}
                    </td>
                    <td className="px-2 py-2.5 text-right text-mono tabular text-zinc-400 hidden sm:table-cell">
                      {row.w}
                    </td>
                    <td className="px-2 py-2.5 text-right text-mono tabular text-zinc-400 hidden sm:table-cell">
                      {row.d}
                    </td>
                    <td className="px-2 py-2.5 text-right text-mono tabular text-zinc-400 hidden sm:table-cell">
                      {row.l}
                    </td>
                    <td className="px-2 py-2.5 text-right text-mono tabular text-zinc-400 hidden md:table-cell">
                      {row.gf}
                    </td>
                    <td className="px-2 py-2.5 text-right text-mono tabular text-zinc-400 hidden md:table-cell">
                      {row.ga}
                    </td>
                    <td className="px-2 py-2.5 text-right text-mono tabular text-zinc-300">
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                    <td className="px-2 py-2.5 text-right text-mono tabular font-bold text-white">
                      {row.pts}
                    </td>
                    <td className="px-3 py-2.5 text-right text-mono tabular font-bold text-amber-300">
                      {live ? Math.round(live.rating) : "·"}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right text-mono tabular text-[13px] ${
                        live ? deltaColor(live.delta) : "text-zinc-500"
                      }`}
                    >
                      {live ? fmtDelta(live.delta) : "·"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">
          Δ is each team's live Elo change across all World Cup matches played,
          relative to its January 2026 baseline.
        </p>
      </section>

      {/* Fixtures */}
      <section className="mb-10">
        <h2 className="font-display text-lg font-bold tracking-tight mb-1">
          Fixtures
        </h2>
        <p className="text-zinc-500 text-sm mb-3">
          All six Group {gid} matches · tap any match for the full Elo
          breakdown
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]/50 overflow-hidden">
          {group.fixtures.map((f) => (
            <FixtureRow key={f.num} f={f} />
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/group/${prevId.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 font-medium px-3 py-1.5 rounded-md text-[13px] transition"
        >
          ← Group {prevId}
        </Link>
        <Link
          href="/world-cup-2026"
          className="inline-flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 text-black font-bold px-4 py-2 rounded-md text-sm hover:from-amber-200 hover:to-amber-400 transition"
        >
          World Cup 2026 hub
        </Link>
        <Link
          href={`/group/${nextId.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 font-medium px-3 py-1.5 rounded-md text-[13px] transition"
        >
          Group {nextId} →
        </Link>
      </div>
    </div>
  );
}

// ---------- fixture row ----------

function FixtureRow({ f }: { f: Fixture }) {
  return (
    <Link
      href={`/match/${f.slug}`}
      className="block px-4 py-3 hover:bg-white/[0.02] transition"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
          {f.round} · M{f.num}
        </span>
        <span className="text-[11px] text-zinc-500 font-mono">
          {f.played ? fmtDate(f.dateUtc) : fmtKickoff(f.dateUtc)} · {f.venue}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* team 1 */}
        <div className="flex items-center gap-2 justify-end min-w-0">
          {f.team1 && f.elo1Delta !== null && (
            <span
              className={`text-[11px] text-mono tabular hidden sm:inline ${deltaColor(
                f.elo1Delta
              )}`}
            >
              {fmtDelta(f.elo1Delta)}
            </span>
          )}
          <span className="font-semibold truncate text-right">
            {f.team1Name}
          </span>
          {f.team1 && (
            <img
              src={flagUrl(f.team1)}
              alt=""
              loading="lazy"
              width={24}
              height={16}
              className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
            />
          )}
        </div>

        {/* score / kickoff */}
        <div className="text-center px-1">
          {f.played && f.score ? (
            <div>
              <span className="text-mono tabular font-bold text-lg text-white">
                {f.score[0]}
                <span className="text-zinc-500 mx-1">:</span>
                {f.score[1]}
              </span>
              {f.ht && (
                <div className="text-[10px] text-zinc-500 font-mono">
                  HT {f.ht[0]}:{f.ht[1]}
                </div>
              )}
            </div>
          ) : (
            <span className="text-mono text-zinc-500 text-sm">vs</span>
          )}
        </div>

        {/* team 2 */}
        <div className="flex items-center gap-2 min-w-0">
          {f.team2 && (
            <img
              src={flagUrl(f.team2)}
              alt=""
              loading="lazy"
              width={24}
              height={16}
              className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
            />
          )}
          <span className="font-semibold truncate">{f.team2Name}</span>
          {f.team2 && f.elo2Delta !== null && (
            <span
              className={`text-[11px] text-mono tabular hidden sm:inline ${deltaColor(
                f.elo2Delta
              )}`}
            >
              {fmtDelta(f.elo2Delta)}
            </span>
          )}
        </div>
      </div>

      {/* pre-match probability bar for upcoming fixtures */}
      {!f.played &&
        f.p1Win !== null &&
        f.pDraw !== null &&
        f.p2Win !== null && (
          <div className="mt-2.5">
            <div className="h-2 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500"
                style={{ width: `${f.p1Win * 100}%` }}
              />
              <div
                className="bg-zinc-500"
                style={{ width: `${f.pDraw * 100}%` }}
              />
              <div
                className="bg-rose-500"
                style={{ width: `${f.p2Win * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
              <span className="text-emerald-400">{pct(f.p1Win)}</span>
              <span>draw {pct(f.pDraw)}</span>
              <span className="text-rose-400">{pct(f.p2Win)}</span>
            </div>
          </div>
        )}
    </Link>
  );
}
