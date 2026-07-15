// The visual knockout bracket: Round of 32 through the Final as a
// horizontally scrollable tournament tree, plus goals, the Golden Boot
// race, and the Polymarket winner market. Server component, ISR 30 min.
// Everything on this page is computed from the live tournament feed;
// nothing about the state of play is hardcoded.

import Link from "next/link";
import type { Metadata } from "next";
import { getTournament, type Fixture, type Stage, type Tournament } from "@/lib/tournament";
import { goalStats } from "@/lib/stats";
import { getWinnerMarket } from "@/lib/polymarket";
import { flagUrl } from "@/lib/teams";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "World Cup 2026 bracket · road to the final · World Cup Elo",
  description:
    "The full 2026 World Cup knockout bracket, updated daily. Spain are in the final. Every result, every remaining tie, Elo win probabilities, the Golden Boot race, and live Polymarket winner prices.",
};

// ---------- deterministic date helpers (UTC only, SSR-safe) ----------

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// ---------- bracket logic ----------

type Finalist = { code: string; name: string };

function winnerOf(f: Fixture): Finalist | null {
  if (!f.played || !f.score || !f.team1 || !f.team2) return null;
  const [a, b] = f.score;
  if (a === b) return null;
  return a > b
    ? { code: f.team1, name: f.team1Name }
    : { code: f.team2, name: f.team2Name };
}

// Confirmed finalists: teams already slotted into the final, backfilled
// from won semi-finals when the feed has not resolved the slot yet.
function confirmedFinalists(t: Tournament): Finalist[] {
  const final = t.fixtures.find((f) => f.stage === "final");
  const out: Finalist[] = [];
  if (final?.team1) out.push({ code: final.team1, name: final.team1Name });
  if (final?.team2) out.push({ code: final.team2, name: final.team2Name });
  for (const sf of t.fixtures.filter((f) => f.stage === "sf")) {
    const w = winnerOf(sf);
    if (w && !out.some((x) => x.code === w.code)) out.push(w);
  }
  return out;
}

function stateOfPlay(t: Tournament, finalists: Finalist[]): string {
  const final = t.fixtures.find((f) => f.stage === "final");
  const progress = `${t.playedCount} of ${t.fixtures.length} matches played.`;
  if (final?.played && final.score) {
    const champ = winnerOf(final);
    if (champ) return `${progress} ${champ.name} are world champions.`;
  }
  if (final && finalists.length === 2) {
    return `${progress} ${finalists[0].name} meet ${finalists[1].name} in the final on ${longDate(final.dateUtc)}.`;
  }
  if (finalists.length === 1) {
    const pending = t.fixtures.find((f) => f.stage === "sf" && !f.played);
    if (pending) {
      return `${progress} ${finalists[0].name} await the winner of ${pending.team1Name} vs ${pending.team2Name}.`;
    }
    return `${progress} ${finalists[0].name} are through to the final.`;
  }
  return `${progress} The bracket fills in daily as results land.`;
}

// ---------- small presentational pieces ----------

function Flag({ code, name }: { code: string | null; name: string }) {
  if (!code) {
    return (
      <span className="h-4 w-6 rounded-[2px] bg-white/5 ring-1 ring-white/10 shrink-0 inline-block" />
    );
  }
  return (
    <img
      src={flagUrl(code)}
      alt={`${name} flag`}
      loading="lazy"
      width={24}
      height={16}
      className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-white/10 shrink-0"
    />
  );
}

function TeamRow({
  code,
  name,
  goals,
  winner,
  loser,
}: {
  code: string | null;
  name: string;
  goals: number | null;
  winner: boolean;
  loser: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 min-w-0 ${
        winner ? "font-bold text-white" : loser ? "text-zinc-500" : "text-zinc-300"
      }`}
    >
      <Flag code={code} name={name} />
      <span className="truncate text-[13px] flex-1">{name}</span>
      <span
        className={`text-mono tabular text-right w-4 text-[13px] shrink-0 ${
          winner ? "font-bold text-white" : "text-zinc-500"
        }`}
      >
        {goals ?? ""}
      </span>
    </div>
  );
}

function MatchCard({ f, highlight }: { f: Fixture; highlight: boolean }) {
  const s = f.played ? f.score : null;
  const w1 = !!s && s[0] > s[1];
  const w2 = !!s && s[1] > s[0];

  // Elo favorite for unplayed ties with known teams
  let favLine: string | null = null;
  if (!f.played && f.p1Win !== null && f.p2Win !== null) {
    const fav1 = f.p1Win >= f.p2Win;
    const p = Math.round((fav1 ? f.p1Win : f.p2Win) * 100);
    favLine = `${fav1 ? f.team1Name : f.team2Name} ${p}%`;
  }

  return (
    <Link
      href={`/match/${f.slug}`}
      className={`block bg-[var(--bg-card)] border border-[var(--border)] hover:border-amber-500/40 rounded-lg px-3 py-2 transition ${
        highlight ? "ring-1 ring-amber-500/40" : ""
      }`}
    >
      <div className="space-y-1">
        <TeamRow
          code={f.team1}
          name={f.team1Name}
          goals={s ? s[0] : null}
          winner={w1}
          loser={w2}
        />
        <TeamRow
          code={f.team2}
          name={f.team2Name}
          goals={s ? s[1] : null}
          winner={w2}
          loser={w1}
        />
      </div>
      {!f.played && (
        <div className="mt-1.5 pt-1.5 border-t border-[var(--border)]/50 flex items-center justify-between gap-2 text-[10px] text-zinc-500">
          <span className="text-mono tabular shrink-0">{shortDate(f.dateUtc)}</span>
          {favLine && (
            <span className="text-amber-300/80 truncate">Elo: {favLine}</span>
          )}
        </div>
      )}
    </Link>
  );
}

function ColumnHeader({ label, fixtures }: { label: string; fixtures: Fixture[] }) {
  const done = fixtures.filter((f) => f.played).length;
  return (
    <div className="flex items-baseline justify-between mb-3">
      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        {label}
      </span>
      <span className="text-[10px] text-mono tabular text-zinc-600">
        {done}/{fixtures.length}
      </span>
    </div>
  );
}

const BRACKET_COLUMNS: { stage: Stage; label: string }[] = [
  { stage: "r32", label: "Round of 32" },
  { stage: "r16", label: "Round of 16" },
  { stage: "qf", label: "Quarter-finals" },
  { stage: "sf", label: "Semi-finals" },
];

// ---------- page ----------

export default async function BracketPage() {
  const [t, market] = await Promise.all([getTournament(), getWinnerMarket()]);
  const stats = goalStats(t, 8);

  const finalists = confirmedFinalists(t);
  const finalistCodes = new Set(finalists.map((x) => x.code));
  const isHighlighted = (f: Fixture) =>
    (f.team1 !== null && finalistCodes.has(f.team1)) ||
    (f.team2 !== null && finalistCodes.has(f.team2));

  const subtitle = stateOfPlay(t, finalists);
  const finalFixture = t.fixtures.find((f) => f.stage === "final");
  const thirdFixture = t.fixtures.find((f) => f.stage === "third");

  const maxStagePerGame = Math.max(...stats.byStage.map((s) => s.perGame), 0.01);
  const top5Market = market ? market.slice(0, 5) : null;
  const maxMarketProb = top5Market
    ? Math.max(...top5Market.map((m) => m.prob), 0.01)
    : 0.01;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* ---------- hero ---------- */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            Knockout bracket · updates daily
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
          Road to the <span className="gold-text">final</span>
        </h1>
        <p className="text-zinc-400 mt-3 max-w-2xl">{subtitle}</p>
      </div>

      {/* ---------- the bracket ---------- */}
      <section className="mb-10">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="min-w-[1100px] grid grid-cols-5 gap-4">
            {BRACKET_COLUMNS.map(({ stage, label }) => {
              const fs = t.fixtures
                .filter((f) => f.stage === stage)
                .sort((a, b) => a.num - b.num);
              return (
                <div key={stage} className="flex flex-col">
                  <ColumnHeader label={label} fixtures={fs} />
                  <div className="flex-1 flex flex-col justify-around gap-2">
                    {fs.map((f) => (
                      <MatchCard key={f.num} f={f} highlight={isHighlighted(f)} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* final column, third place tucked underneath */}
            <div className="flex flex-col">
              <ColumnHeader
                label="Final"
                fixtures={finalFixture ? [finalFixture] : []}
              />
              <div className="flex-1 flex flex-col justify-center">
                {finalFixture && (
                  <MatchCard
                    f={finalFixture}
                    highlight={isHighlighted(finalFixture)}
                  />
                )}
              </div>
              {thirdFixture && (
                <div className="mt-6">
                  <ColumnHeader label="Third place" fixtures={[thirdFixture]} />
                  <MatchCard
                    f={thirdFixture}
                    highlight={isHighlighted(thirdFixture)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {finalists.length > 0 && (
          <p className="text-[11px] text-zinc-500 mt-3">
            Gold ring marks the path of{" "}
            {finalists.map((x) => x.name).join(" and ")} through the bracket.
            Every card links to the full match page.
          </p>
        )}
      </section>

      {/* ---------- goals panel ---------- */}
      <section className="grid md:grid-cols-2 gap-5 mb-5">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-3">
            Goals per game
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display gold-text text-5xl font-black tracking-tight text-mono tabular">
              {stats.perGame.toFixed(2)}
            </span>
            <span className="text-zinc-400 text-sm">
              {stats.totalGoals} goals in {stats.played} games
            </span>
          </div>
          <div className="mt-5 space-y-2.5">
            {stats.byStage.map((s) => (
              <div key={s.stage} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 text-zinc-400 text-xs">
                  {s.label}
                </span>
                <span className="w-8 shrink-0 text-mono tabular text-zinc-600 text-xs text-right">
                  {s.games}g
                </span>
                <div className="flex-1 h-1 rounded-full bg-white/5">
                  <div
                    className="h-1 rounded-full bg-amber-400/80"
                    style={{
                      width: `${Math.round((s.perGame / maxStagePerGame) * 100)}%`,
                    }}
                  />
                </div>
                <span className="w-10 shrink-0 text-mono tabular text-zinc-300 text-xs text-right">
                  {s.perGame.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-3">
            Golden Boot race
          </div>
          <div className="space-y-2">
            {stats.scorers.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3 text-sm">
                <span className="w-4 shrink-0 text-mono tabular text-zinc-600 text-xs">
                  {i + 1}
                </span>
                <Flag code={s.code} name={s.name} />
                <span
                  className={`flex-1 truncate ${
                    i === 0 ? "font-bold text-white" : "text-zinc-300"
                  }`}
                >
                  {s.name}
                </span>
                <span className="text-mono tabular gold-text font-bold">
                  {s.goals}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-zinc-500 mt-4">
            Goals across the whole tournament, all {stats.played} matches
            played so far. Updated daily from the feed.
          </p>
        </div>
      </section>

      {/* ---------- market panel ---------- */}
      <section className="mb-10">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-3">
            The market agrees
          </div>
          {top5Market ? (
            <>
              <div className="space-y-2.5">
                {top5Market.map((m) => {
                  const lt = m.code
                    ? t.liveTeams.find((x) => x.code === m.code)
                    : undefined;
                  return (
                    <div
                      key={m.team}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Flag code={m.code} name={m.team} />
                      <span className="w-32 sm:w-40 shrink-0 truncate font-medium">
                        {m.team}
                        {lt && (
                          <span className="text-[10px] text-zinc-500 font-normal ml-2">
                            Elo #{lt.rank}
                          </span>
                        )}
                      </span>
                      <div className="flex-1 h-1 rounded-full bg-white/5">
                        <div
                          className="h-1 rounded-full bg-emerald-400/80"
                          style={{
                            width: `${Math.round((m.prob / maxMarketProb) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="w-11 shrink-0 text-mono tabular text-emerald-300 text-right">
                        {Math.round(m.prob * 100)}%
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-zinc-500 mt-4">
                Live prices from the Polymarket World Cup winner market ·{" "}
                <a
                  href={top5Market[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-zinc-300"
                >
                  polymarket.com ↗
                </a>
              </p>
            </>
          ) : (
            <p className="text-zinc-500 text-sm">
              Market feed unavailable right now, prices return shortly.
            </p>
          )}
        </div>
      </section>

      {/* ---------- footer links ---------- */}
      <footer className="border-t border-[var(--border)] pt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
        <a
          href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
          target="_blank"
          rel="noreferrer"
          className="hover:text-zinc-300"
        >
          FIFA official match centre ↗
        </a>
        <a
          href="https://eloratings.net"
          target="_blank"
          rel="noreferrer"
          className="hover:text-zinc-300"
        >
          eloratings.net ↗
        </a>
        <Link href="/today" className="hover:text-zinc-300">
          Today&apos;s matches
        </Link>
        <Link href="/world-cup-2026" className="hover:text-zinc-300">
          World Cup 2026 hub
        </Link>
      </footer>
    </div>
  );
}
