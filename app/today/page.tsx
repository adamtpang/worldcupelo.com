import Link from "next/link";
import type { Metadata } from "next";
import { flagUrl, getTeam } from "@/lib/teams";
import {
  getTournament,
  upcoming,
  recentResults,
  biggestMovers,
  type Fixture,
} from "@/lib/tournament";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Today's World Cup matches · Elo predictions · World Cup Elo",
  description:
    "Every 2026 World Cup match today and tomorrow: kickoff times, venues, and Elo-based win probabilities, plus the latest results with rating changes and the tournament's biggest Elo movers.",
};

const MINUS = "−";

// Calendar day in US Eastern (YYYY-MM-DD), matching the ET kickoff labels
// so a late ET kickoff never files under the wrong day heading.
function etDay(d: Date): string {
  return d.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

function dayHeading(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Deterministic SSR: always render kickoff in US Eastern, labelled ET.
function kickoffEt(iso: string): string {
  return (
    new Date(iso).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    }) + " ET"
  );
}

function pct(p: number): string {
  return `${Math.round(p * 100)}%`;
}

function Delta({ value }: { value: number }) {
  const pos = value >= 0;
  return (
    <span
      className={`text-mono tabular text-[11px] font-semibold ${
        pos ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {pos ? "+" : MINUS}
      {Math.abs(value).toFixed(1)}
    </span>
  );
}

function Flag({ code }: { code: string | null }) {
  if (!code) {
    return (
      <span
        aria-hidden
        className="h-4 w-6 shrink-0 rounded-[2px] bg-white/5 ring-1 ring-white/10"
      />
    );
  }
  return (
    <img
      src={flagUrl(code)}
      alt=""
      loading="lazy"
      width={24}
      height={16}
      className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
    />
  );
}

function TeamLine({
  code,
  name,
  eloBefore,
  score,
  delta,
  played,
  winner,
}: {
  code: string | null;
  name: string;
  eloBefore: number | null;
  score: number | null;
  delta: number | null;
  played: boolean;
  winner: boolean;
}) {
  const label = (
    <span
      className={`truncate text-sm ${
        code ? (winner ? "font-bold" : "font-medium") : "text-zinc-500"
      }`}
    >
      {name}
    </span>
  );
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <Flag code={code} />
      {code ? (
        <Link
          href={`/team/${code.toLowerCase()}`}
          className="min-w-0 hover:text-amber-300 transition"
        >
          {label}
        </Link>
      ) : (
        label
      )}
      {eloBefore !== null && (
        <span className="text-mono tabular text-[11px] text-zinc-500 shrink-0">
          {Math.round(eloBefore)}
        </span>
      )}
      <span className="flex-1" />
      {played && delta !== null && <Delta value={delta} />}
      {played && score !== null && (
        <span className="text-mono tabular font-bold text-lg leading-none w-6 text-right">
          {score}
        </span>
      )}
    </div>
  );
}

function FixtureCard({ f }: { f: Fixture }) {
  const s1 = f.score ? f.score[0] : null;
  const s2 = f.score ? f.score[1] : null;
  const p1 = f.p1Win;
  const pd = f.pDraw;
  const p2 = f.p2Win;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] hover:border-white/20 rounded-lg p-4 transition flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 whitespace-nowrap">
            {f.round}
          </span>
          <span className="text-[11px] text-zinc-500 truncate">
            {f.venue} · {f.venueCountry}
          </span>
        </div>
        {f.played ? (
          <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">
            FT
          </span>
        ) : (
          <span className="text-mono tabular text-[11px] text-zinc-300 whitespace-nowrap">
            {kickoffEt(f.dateUtc)}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <TeamLine
          code={f.team1}
          name={f.team1Name}
          eloBefore={f.elo1Before}
          score={s1}
          delta={f.elo1Delta}
          played={f.played}
          winner={f.played && s1 !== null && s2 !== null && s1 > s2}
        />
        <TeamLine
          code={f.team2}
          name={f.team2Name}
          eloBefore={f.elo2Before}
          score={s2}
          delta={f.elo2Delta}
          played={f.played}
          winner={f.played && s1 !== null && s2 !== null && s2 > s1}
        />
      </div>

      {!f.played && p1 !== null && pd !== null && p2 !== null && (
        <div className="mt-3">
          <div className="flex h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500"
              style={{ width: `${(p1 * 100).toFixed(1)}%` }}
            />
            <div
              className="bg-zinc-500"
              style={{ width: `${(pd * 100).toFixed(1)}%` }}
            />
            <div
              className="bg-rose-500"
              style={{ width: `${(p2 * 100).toFixed(1)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5 text-[10px] text-mono tabular">
            <span className="text-emerald-400">{pct(p1)}</span>
            <span className="text-zinc-500">Draw {pct(pd)}</span>
            <span className="text-rose-400">{pct(p2)}</span>
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-[var(--border)]/50 flex items-center justify-between">
        <span className="text-[10px] text-mono text-zinc-600">M{f.num}</span>
        <Link
          href={`/match/${f.slug}`}
          className="text-[11px] font-semibold text-zinc-400 hover:text-amber-300 transition"
        >
          Match page →
        </Link>
      </div>
    </div>
  );
}

export default async function TodayPage() {
  const t = await getTournament();

  const now = new Date();
  const todayIso = etDay(now);
  const tomorrowIso = etDay(new Date(now.getTime() + 86_400_000));

  const byKickoff = (a: Fixture, b: Fixture) =>
    a.dateUtc.localeCompare(b.dateUtc);
  const onEtDay = (iso: string) =>
    t.fixtures.filter((f) => etDay(new Date(f.dateUtc)) === iso);
  const todayFixtures = onEtDay(todayIso).sort(byKickoff);
  const tomorrowFixtures = onEtDay(tomorrowIso).sort(byKickoff);
  const results = recentResults(t, 6);
  const movers = biggestMovers(t, 5);
  const nextUp: Fixture | undefined = upcoming(t, 1)[0];

  return (
    <div>
      <section className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-semibold mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live · {t.stageNow}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight">
            Today at the <span className="gold-text">World Cup</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
            Kickoffs, venues and Elo win probabilities for the next 48 hours,
            plus the latest results and rating moves. {t.playedCount} of{" "}
            {t.fixtures.length} matches played.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <section>
          <div className="flex items-baseline gap-2 mb-3 flex-wrap">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Today
            </h2>
            <span className="text-zinc-500 text-sm">
              {dayHeading(todayIso)} · all times ET
            </span>
          </div>
          {todayFixtures.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {todayFixtures.map((f) => (
                <FixtureCard key={f.num} f={f} />
              ))}
            </div>
          ) : nextUp ? (
            <div>
              <p className="text-zinc-400 text-sm mb-3">
                No matches today. Next up:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <FixtureCard f={nextUp} />
              </div>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">
              No matches today. The tournament is complete.
            </p>
          )}
        </section>

        <section>
          <div className="flex items-baseline gap-2 mb-3 flex-wrap">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Tomorrow
            </h2>
            <span className="text-zinc-500 text-sm">
              {dayHeading(tomorrowIso)} · all times ET
            </span>
          </div>
          {tomorrowFixtures.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tomorrowFixtures.map((f) => (
                <FixtureCard key={f.num} f={f} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">
              No matches scheduled tomorrow, a rest day between rounds.
            </p>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl font-bold tracking-tight mb-1">
            Latest results
          </h2>
          <p className="text-zinc-500 text-sm mb-3">
            Final scores with the Elo exchanged on each result
          </p>
          {results.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {results.map((f) => (
                <FixtureCard key={f.num} f={f} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">No matches played yet.</p>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl font-bold tracking-tight mb-1">
            Biggest Elo movers
          </h2>
          <p className="text-zinc-500 text-sm mb-3">
            Largest rating swings since the tournament began
          </p>
          {movers.length > 0 ? (
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg divide-y divide-[var(--border)]/50 max-w-xl">
              {movers.map((r, i) => (
                <Link
                  key={r.code}
                  href={`/team/${r.code.toLowerCase()}`}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.02]"
                >
                  <span className="text-zinc-500 text-mono text-xs w-4">
                    {i + 1}
                  </span>
                  <Flag code={r.code} />
                  <span className="font-medium flex-1 truncate">
                    {getTeam(r.code)?.name ?? r.code}
                  </span>
                  <span className="text-[11px] text-mono tabular text-zinc-600 hidden sm:inline">
                    {r.playedCount} played
                  </span>
                  <span className="text-mono tabular text-amber-300 font-bold text-sm">
                    {Math.round(r.rating)}
                  </span>
                  <span className="w-14 text-right">
                    <Delta value={r.delta} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">
              No rating changes yet, movers appear after the first final
              whistle.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
