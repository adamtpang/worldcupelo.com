import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getTournament,
  getTournamentStatic,
  type Fixture,
  type Tournament,
} from "@/lib/tournament";
import { flagUrl } from "@/lib/teams";
import {
  getPlayers,
  playerLinks,
  positionColor,
  positionLabel,
  type Player,
} from "@/lib/players";

export const revalidate = 1800;

const MINUS = "−";
const PRIME = "′";

export function generateStaticParams() {
  return getTournamentStatic().fixtures.map((f) => ({ slug: f.slug }));
}

function pct(x: number): string {
  return `${Math.round(x * 100)}%`;
}

function fmtDelta(d: number): string {
  const v = Math.abs(d).toFixed(1);
  return d >= 0 ? `+${v}` : `${MINUS}${v}`;
}

function kickoffLabel(iso: string): string {
  return (
    new Date(iso).toLocaleString("en-US", {
      timeZone: "UTC",
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }) + " UTC"
  );
}

function dateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });
}

function contextLabel(f: Fixture): string {
  return f.group ? `Group ${f.group} · ${f.round}` : f.round;
}

function sameStagePool(t: Tournament, f: Fixture): Fixture[] {
  if (f.stage === "group" && f.group) {
    return t.fixtures.filter(
      (x) => x.stage === "group" && x.group === f.group && x.num !== f.num
    );
  }
  return t.fixtures.filter((x) => x.stage === f.stage && x.num !== f.num);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTournament();
  const f = t.fixtures.find((x) => x.slug === slug);
  if (!f) return { title: "Match not found · World Cup Elo" };

  let title: string;
  let description: string;

  if (f.played && f.score) {
    const [s1, s2] = f.score;
    title = `${f.team1Name} ${s1}-${s2} ${f.team2Name} · result & Elo swing`;
    const shift =
      f.elo1Delta !== null && f.elo2Delta !== null
        ? ` Elo shift: ${f.team1Name} ${fmtDelta(f.elo1Delta)}, ${f.team2Name} ${fmtDelta(f.elo2Delta)}.`
        : "";
    description = `${f.team1Name} ${s1}-${s2} ${f.team2Name} in the ${contextLabel(
      f
    )} at ${f.venue}, World Cup 2026 Match ${f.num}.${shift}`;
  } else if (f.team1 && f.team2) {
    title = `${f.team1Name} vs ${f.team2Name} prediction · World Cup 2026 Match ${f.num} · Elo odds`;
    description =
      f.p1Win !== null && f.pDraw !== null && f.p2Win !== null
        ? `Elo odds for the ${contextLabel(f)} at ${f.venue}: ${f.team1Name} ${pct(
            f.p1Win
          )}, draw ${pct(f.pDraw)}, ${f.team2Name} ${pct(f.p2Win)}.`
        : `Elo preview of ${f.team1Name} vs ${f.team2Name}, World Cup 2026 Match ${f.num} at ${f.venue}.`;
  } else {
    title = `${f.team1Name} vs ${f.team2Name} · World Cup 2026 Match ${f.num}`;
    description = `${f.round} · World Cup 2026 Match ${f.num} at ${f.venue}. Pairing to be decided.`;
  }

  const ogImage = `/match/${f.slug}/opengraph-image`;
  return {
    title,
    description,
    alternates: { canonical: `/match/${f.slug}` },
    openGraph: {
      title,
      description,
      url: `https://worldcupelo.com/match/${f.slug}`,
      siteName: "World Cup Elo",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${f.team1Name} vs ${f.team2Name} · World Cup 2026`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTournament();
  const f = t.fixtures.find((x) => x.slug === slug);
  if (!f) notFound();

  const probs =
    f.p1Win !== null && f.pDraw !== null && f.p2Win !== null
      ? { p1: f.p1Win, pd: f.pDraw, p2: f.p2Win }
      : null;

  const entering =
    f.elo1Before !== null && f.elo2Before !== null
      ? { r1: f.elo1Before, r2: f.elo2Before }
      : null;

  // Expected supremacy note (pre-match only).
  let supremacy: string | null = null;
  if (!f.played && entering) {
    const adv =
      f.team1 === f.venueCountry ? 60 : f.team2 === f.venueCountry ? -60 : 0;
    const effDiff = Math.round(entering.r1 - entering.r2 + adv);
    if (Math.abs(effDiff) < 10) {
      supremacy =
        "The venue-adjusted ratings are essentially level: Elo calls this a coin flip.";
    } else {
      const favN = effDiff > 0 ? f.team1Name : f.team2Name;
      supremacy = `${favN} carry a ${Math.abs(
        effDiff
      )}-point venue-adjusted edge, worth roughly ${(
        Math.abs(effDiff) / 200
      ).toFixed(1)} goals of expected supremacy${
        adv !== 0 ? " (includes the 60-point host adjustment)" : ""
      }.`;
    }
  }

  // Prediction vs result verdict (post-match only).
  let verdict: string | null = null;
  if (f.played && f.score && probs) {
    const [s1, s2] = f.score;
    const favIs1 = probs.p1 >= probs.p2;
    const favName = favIs1 ? f.team1Name : f.team2Name;
    const favProb = favIs1 ? probs.p1 : probs.p2;
    if (s1 === s2) {
      verdict = `Draw. Elo leaned ${favName} at ${pct(
        favProb
      )} pre-match and priced the stalemate at ${pct(probs.pd)}.`;
    } else {
      const winnerIs1 = s1 > s2;
      const winnerName = winnerIs1 ? f.team1Name : f.team2Name;
      verdict =
        winnerIs1 === favIs1
          ? `The favorite delivered. Elo gave ${favName} a ${pct(
              favProb
            )} win chance, and they took it.`
          : `Upset. Elo favored ${favName} at ${pct(
              favProb
            )}, but ${winnerName} won the match.`;
    }
  }

  const swing =
    f.played &&
    f.elo1Before !== null &&
    f.elo2Before !== null &&
    f.elo1Delta !== null &&
    f.elo2Delta !== null
      ? [
          {
            code: f.team1,
            name: f.team1Name,
            before: f.elo1Before,
            delta: f.elo1Delta,
          },
          {
            code: f.team2,
            name: f.team2Name,
            before: f.elo2Before,
            delta: f.elo2Delta,
          },
        ]
      : null;

  const players1 = f.team1 ? getPlayers(f.team1) : [];
  const players2 = f.team2 ? getPlayers(f.team2) : [];

  const pool = sameStagePool(t, f);
  const related =
    pool.length >= 3
      ? pool.slice(0, 4)
      : [
          ...pool,
          ...t.fixtures.filter(
            (x) =>
              x.num !== f.num &&
              x.stage !== "group" &&
              !pool.some((p) => p.num === x.num)
          ),
        ].slice(0, 4);
  const relatedTitle =
    f.stage === "group" && f.group
      ? `More from Group ${f.group}`
      : pool.length >= 3
        ? `More from the ${f.round}`
        : "Related matches";

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${f.team1Name} vs ${f.team2Name} · FIFA World Cup 2026 Match ${f.num}`,
    sport: "Soccer",
    startDate: f.dateUtc,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: f.venue,
      address: { "@type": "PostalAddress", addressCountry: f.venueCountry },
    },
    competitor: [
      { "@type": "SportsTeam", name: f.team1Name },
      { "@type": "SportsTeam", name: f.team2Name },
    ],
    organizer: { "@type": "Organization", name: "FIFA" },
  };
  if (f.played && f.score) {
    jsonLd.description = `Final score: ${f.team1Name} ${f.score[0]}-${f.score[1]} ${f.team2Name}.`;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/world-cup-2026"
        className="inline-flex items-center gap-1 text-[12px] text-zinc-500 hover:text-zinc-300 mb-6"
      >
        ← World Cup 2026
      </Link>

      {/* Hero */}
      <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col items-center gap-1.5 mb-6 text-center">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            World Cup 2026 · Match {f.num}
          </div>
          <div className="text-sm text-zinc-400">
            {contextLabel(f)} · {f.venue}
          </div>
          <div className="text-[12px] text-mono text-zinc-500">
            {kickoffLabel(f.dateUtc)}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
          <TeamSide code={f.team1} name={f.team1Name} />
          <div className="flex flex-col items-center gap-1 px-1">
            {f.played && f.score ? (
              <>
                <div className="font-display font-black tracking-tight tabular text-5xl sm:text-7xl leading-none">
                  {f.score[0]}
                  <span className="text-zinc-600">-</span>
                  {f.score[1]}
                </div>
                {f.ht && (
                  <div className="text-mono text-[12px] text-zinc-500 mt-1.5">
                    HT {f.ht[0]}-{f.ht[1]}
                  </div>
                )}
                <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mt-0.5">
                  Full time
                </div>
              </>
            ) : (
              <>
                <div className="font-display font-black text-2xl sm:text-3xl text-zinc-500">
                  vs
                </div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Upcoming
                </div>
              </>
            )}
          </div>
          <TeamSide code={f.team2} name={f.team2Name} />
        </div>

        {f.played && (f.goals1.length > 0 || f.goals2.length > 0) && (
          <div className="grid grid-cols-2 gap-6 mt-6 pt-5 border-t border-[var(--border)]/60 text-[13px]">
            <div className="flex flex-col items-center gap-1">
              {f.goals1.map((g, i) => (
                <div key={`${g.name}-${g.minute}-${i}`} className="text-zinc-300 text-center">
                  {g.name}{" "}
                  <span className="text-mono text-zinc-500">
                    {g.minute}
                    {PRIME}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-1">
              {f.goals2.map((g, i) => (
                <div key={`${g.name}-${g.minute}-${i}`} className="text-zinc-300 text-center">
                  {g.name}{" "}
                  <span className="text-mono text-zinc-500">
                    {g.minute}
                    {PRIME}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Pre-match: win probability */}
      {!f.played && probs && (
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold tracking-tight mb-3">
            Win probability
          </h2>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 sm:p-6">
            <div className="grid grid-cols-3 items-end mb-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  {f.team1Name} win
                </span>
                <span className="text-mono tabular font-bold text-emerald-300 text-2xl sm:text-3xl">
                  {pct(probs.p1)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Draw
                </span>
                <span className="text-mono tabular font-bold text-zinc-400 text-2xl sm:text-3xl">
                  {pct(probs.pd)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 items-end">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  {f.team2Name} win
                </span>
                <span className="text-mono tabular font-bold text-rose-300 text-2xl sm:text-3xl">
                  {pct(probs.p2)}
                </span>
              </div>
            </div>
            <div className="h-3 rounded-full overflow-hidden flex bg-white/5">
              <div
                className="bg-emerald-500"
                style={{ width: `${probs.p1 * 100}%` }}
              />
              <div
                className="bg-zinc-500"
                style={{ width: `${probs.pd * 100}%` }}
              />
              <div
                className="bg-rose-500"
                style={{ width: `${probs.p2 * 100}%` }}
              />
            </div>
            {supremacy && (
              <p className="text-[13px] text-zinc-400 mt-4">{supremacy}</p>
            )}
            {f.team1 && f.team2 && (
              <Link
                href={`/predict?a=${f.team1}&b=${f.team2}`}
                className="inline-flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 text-black font-bold px-4 py-2 rounded-md text-sm hover:from-amber-200 hover:to-amber-400 transition mt-4"
              >
                Open in the predictor →
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Pre-match: ratings entering */}
      {!f.played && entering && (
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold tracking-tight mb-3">
            Ratings entering the match
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <EloCard code={f.team1} name={f.team1Name} rating={entering.r1} />
            <EloCard code={f.team2} name={f.team2Name} rating={entering.r2} />
          </div>
        </section>
      )}

      {/* Pre-match: key players */}
      {!f.played && (players1.length > 0 || players2.length > 0) && (
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold tracking-tight mb-1">
            Key players
          </h2>
          <p className="text-zinc-500 text-sm mb-3">
            The names most likely to decide it
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <PlayerColumn
              code={f.team1}
              teamName={f.team1Name}
              players={players1}
            />
            <PlayerColumn
              code={f.team2}
              teamName={f.team2Name}
              players={players2}
            />
          </div>
        </section>
      )}

      {/* Placeholder pairings */}
      {!f.played && (!f.team1 || !f.team2) && (
        <section className="mb-8">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 sm:p-6 text-sm text-zinc-400">
            The pairing for this match is not decided yet. Odds, ratings, and
            key players appear here once both teams are known.
          </div>
        </section>
      )}

      {/* Post-match: prediction vs result */}
      {f.played && f.score && probs && (
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold tracking-tight mb-3">
            Prediction vs result
          </h2>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 sm:p-6">
            <div className="flex items-center justify-between text-[11px] text-mono tabular mb-2">
              <span className="text-emerald-300">
                {f.team1Name} {pct(probs.p1)}
              </span>
              <span className="text-zinc-500">Draw {pct(probs.pd)}</span>
              <span className="text-rose-300">
                {f.team2Name} {pct(probs.p2)}
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden flex bg-white/5">
              <div
                className="bg-emerald-500"
                style={{ width: `${probs.p1 * 100}%` }}
              />
              <div
                className="bg-zinc-500"
                style={{ width: `${probs.pd * 100}%` }}
              />
              <div
                className="bg-rose-500"
                style={{ width: `${probs.p2 * 100}%` }}
              />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mt-4">
              Pre-match Elo odds
            </div>
            {verdict && <p className="text-sm text-zinc-300 mt-1.5">{verdict}</p>}
          </div>
        </section>
      )}

      {/* Post-match: Elo swing */}
      {swing && (
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold tracking-tight mb-3">
            Elo swing
          </h2>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]/50">
            {swing.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-3 px-4 py-3"
              >
                {s.code && (
                  <img
                    src={flagUrl(s.code)}
                    alt=""
                    loading="lazy"
                    width={24}
                    height={16}
                    className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
                  />
                )}
                {s.code ? (
                  <Link
                    href={`/team/${s.code.toLowerCase()}`}
                    className="font-medium flex-1 hover:text-amber-300"
                  >
                    {s.name}
                  </Link>
                ) : (
                  <span className="font-medium flex-1">{s.name}</span>
                )}
                <span className="text-mono tabular text-sm text-zinc-400">
                  {Math.round(s.before)}{" "}
                  <span className="text-zinc-600">→</span>{" "}
                  <span className="text-amber-300 font-bold">
                    {Math.round(s.before + s.delta)}
                  </span>
                </span>
                <span
                  className={`text-mono tabular text-sm w-14 text-right ${
                    s.delta >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {fmtDelta(s.delta)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related fixtures */}
      {related.length > 0 && (
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold tracking-tight mb-3">
            {relatedTitle}
          </h2>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]/50">
            {related.map((x) => (
              <Link
                key={x.num}
                href={`/match/${x.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.02]"
              >
                <span className="text-mono text-[11px] text-zinc-500 w-9 shrink-0">
                  M{x.num}
                </span>
                <span className="flex-1 flex items-center gap-2 min-w-0">
                  {x.team1 && (
                    <img
                      src={flagUrl(x.team1)}
                      alt=""
                      loading="lazy"
                      width={20}
                      height={14}
                      className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
                    />
                  )}
                  <span className="font-medium text-sm truncate">
                    {x.team1Name}
                  </span>
                  <span className="text-zinc-600 text-[11px] shrink-0">vs</span>
                  {x.team2 && (
                    <img
                      src={flagUrl(x.team2)}
                      alt=""
                      loading="lazy"
                      width={20}
                      height={14}
                      className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
                    />
                  )}
                  <span className="font-medium text-sm truncate">
                    {x.team2Name}
                  </span>
                </span>
                <span
                  className={`text-mono tabular text-sm shrink-0 ${
                    x.played && x.score
                      ? "text-white font-bold"
                      : "text-zinc-500"
                  }`}
                >
                  {x.played && x.score
                    ? `${x.score[0]}-${x.score[1]}`
                    : dateShort(x.dateUtc)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TeamSide({ code, name }: { code: string | null; name: string }) {
  const inner = (
    <div className="flex flex-col items-center gap-3 text-center">
      {code ? (
        <img
          src={flagUrl(code)}
          alt={`${name} flag`}
          width={132}
          height={88}
          className="h-14 sm:h-20 w-auto rounded-md object-cover ring-1 ring-white/15 shadow-lg"
        />
      ) : (
        <div className="h-14 sm:h-20 w-20 sm:w-28 rounded-md bg-white/[0.04] border border-[var(--border)] flex items-center justify-center text-zinc-600 text-[11px] font-semibold uppercase tracking-wider">
          TBD
        </div>
      )}
      <div className="font-display font-bold tracking-tight text-lg sm:text-2xl leading-tight">
        {name}
      </div>
    </div>
  );
  return code ? (
    <Link
      href={`/team/${code.toLowerCase()}`}
      className="hover:opacity-90 transition"
    >
      {inner}
    </Link>
  ) : (
    inner
  );
}

function EloCard({
  code,
  name,
  rating,
}: {
  code: string | null;
  name: string;
  rating: number;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {code && (
          <img
            src={flagUrl(code)}
            alt=""
            loading="lazy"
            width={24}
            height={16}
            className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
          />
        )}
        <span className="font-semibold text-sm truncate">{name}</span>
      </div>
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        Elo entering
      </div>
      <div className="text-mono tabular font-bold text-amber-300 text-3xl leading-none mt-1">
        {Math.round(rating)}
      </div>
    </div>
  );
}

function PlayerColumn({
  code,
  teamName,
  players,
}: {
  code: string | null;
  teamName: string;
  players: Player[];
}) {
  if (players.length === 0) return null;
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[var(--border)]">
        {code && (
          <img
            src={flagUrl(code)}
            alt=""
            loading="lazy"
            width={20}
            height={14}
            className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
          />
        )}
        <span className="font-semibold text-sm">{teamName}</span>
      </div>
      <div className="divide-y divide-[var(--border)]/50">
        {players.map((p) => {
          const pc = positionColor(p.position);
          return (
            <div key={p.name} className="flex items-center gap-2 px-3 py-2">
              <span
                className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0"
                style={{ color: pc.text, background: pc.bg }}
                title={positionLabel(p.position)}
              >
                {p.position}
              </span>
              <span className="font-medium text-sm truncate flex-1">
                {p.name}
              </span>
              <span className="text-[11px] text-zinc-500 truncate hidden sm:inline">
                {p.club}
              </span>
              <a
                href={playerLinks(p.name).youtube}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-zinc-500 hover:text-amber-200 transition shrink-0"
                title={`${p.name} highlights on YouTube`}
              >
                ▶
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
