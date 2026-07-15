import Link from "next/link";
import { CONFEDERATIONS, ratingTier, flagUrl } from "@/lib/teams";
import { getTournament, upcoming, type Fixture } from "@/lib/tournament";
import RankingsTable from "@/components/RankingsTable";

export const revalidate = 1800;

function kickoffEt(iso: string): string {
  return (
    new Date(iso).toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
    }) + " ET"
  );
}

function kickoffDateEt(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// The next unplayed fixture, date first: the thing everyone asks.
function NextGameLine({
  t,
}: {
  t: Awaited<ReturnType<typeof getTournament>>;
}) {
  const next = upcoming(t, 1)[0];
  if (!next) return null;
  return (
    <Link
      href={`/match/${next.slug}`}
      className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-[13px] font-semibold text-amber-300 hover:bg-amber-500/20 transition"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Next match · {next.team1Name} vs {next.team2Name}
      <span className="text-mono tabular">
        {kickoffDateEt(next.dateUtc)} · {kickoffEt(next.dateUtc)}
      </span>
      <span aria-hidden>→</span>
    </Link>
  );
}

function fmtDelta(d: number): string {
  return d >= 0 ? `+${d.toFixed(1)}` : `−${Math.abs(d).toFixed(1)}`;
}

function favoriteOf(f: Fixture): { label: string; pct: number } | null {
  if (f.p1Win === null || f.p2Win === null) return null;
  const t1 = f.p1Win >= f.p2Win;
  return {
    label: t1 ? f.team1 ?? f.team1Name : f.team2 ?? f.team2Name,
    pct: Math.round((t1 ? f.p1Win : f.p2Win) * 100),
  };
}

function TeamLine({
  code,
  name,
  goals,
}: {
  code: string | null;
  name: string;
  goals: number | null;
}) {
  return (
    <div className="flex items-center gap-2">
      {code ? (
        <img
          src={flagUrl(code)}
          alt={`${name} flag`}
          loading="lazy"
          width={24}
          height={16}
          className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-white/10 shrink-0"
        />
      ) : (
        <span className="h-4 w-6 rounded-[2px] bg-white/5 ring-1 ring-white/10 shrink-0" />
      )}
      <span
        className={`text-sm flex-1 truncate ${
          code ? "font-semibold" : "text-zinc-500"
        }`}
      >
        {name}
      </span>
      {goals !== null && (
        <span className="text-mono tabular font-bold text-sm">{goals}</span>
      )}
    </div>
  );
}

function TodayCard({ f }: { f: Fixture }) {
  const fav = !f.played ? favoriteOf(f) : null;
  return (
    <Link
      href={`/match/${f.slug}`}
      className="group bg-[var(--bg-card)] border border-[var(--border)] hover:border-white/20 rounded-lg p-3 min-w-[210px] flex-1 transition"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
        <span>{f.round}</span>
        <span className="text-mono">
          {f.played ? "FT" : kickoffEt(f.dateUtc)}
        </span>
      </div>
      <div className="space-y-1.5">
        <TeamLine
          code={f.team1}
          name={f.team1Name}
          goals={f.score ? f.score[0] : null}
        />
        <TeamLine
          code={f.team2}
          name={f.team2Name}
          goals={f.score ? f.score[1] : null}
        />
      </div>
      {fav && (
        <div className="text-[11px] text-zinc-500 mt-2">
          Favorite ·{" "}
          <span className="text-zinc-300 font-semibold text-mono tabular">
            {fav.label} {fav.pct}%
          </span>
        </div>
      )}
      {f.played && f.elo1Delta !== null && f.elo2Delta !== null && (
        <div className="text-[11px] mt-2 text-mono tabular">
          <span
            className={f.elo1Delta >= 0 ? "text-emerald-400" : "text-red-400"}
          >
            {fmtDelta(f.elo1Delta)}
          </span>
          <span className="text-zinc-600"> / </span>
          <span
            className={f.elo2Delta >= 0 ? "text-emerald-400" : "text-red-400"}
          >
            {fmtDelta(f.elo2Delta)}
          </span>
        </div>
      )}
    </Link>
  );
}

export default async function HomePage() {
  const t = await getTournament();

  // Bucket "today" by the US Eastern calendar day, matching the ET kickoff labels.
  const etDay = (d: Date) =>
    d.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  const todayIso = etDay(new Date());
  const todays = t.fixtures.filter((f) => etDay(new Date(f.dateUtc)) === todayIso);
  const strip = todays.length ? todays : upcoming(t, 4);
  const isToday = todays.length > 0;

  const lastUpdated = new Date(t.updatedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
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
            <NextGameLine t={t} />
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/world-cup-2026"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 text-black font-bold px-4 py-2 rounded-md text-sm hover:from-amber-200 hover:to-amber-400 transition"
            >
              World Cup 2026
              <span className="text-[10px] font-mono bg-black/20 px-1.5 py-0.5 rounded">
                {t.stageNow} · {t.playedCount}/{t.fixtures.length} matches
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

      {/* Today at the World Cup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">
              {t.stageNow} · {t.playedCount}/{t.fixtures.length} played
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
              {isToday ? "Today at the World Cup" : "Next up at the World Cup"}
            </h2>
          </div>
          <Link
            href="/today"
            className="text-[12px] text-zinc-400 hover:text-amber-300 font-medium shrink-0"
          >
            View all →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {strip.map((f) => (
            <TodayCard key={f.num} f={f} />
          ))}
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
              All {t.liveTeams.length} men's national teams by live Elo rating
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
            Updated · {lastUpdated}
          </div>
        </div>
        <RankingsTable teams={t.liveTeams} />
      </section>

      {/* Secondary: confederation leaders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
          By Confederation
        </h2>
        <p className="text-zinc-500 text-sm mb-5">Each region's strongest side</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(CONFEDERATIONS).map(([key, c]) => {
            const leader = t.liveTeams.find((x) => x.confederation === key);
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
