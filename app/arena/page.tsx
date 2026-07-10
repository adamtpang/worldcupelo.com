// Elo Arena: every pickable World Cup match, rendered as PickCards, against
// the Elo model's pre-match probabilities. Server component, ISR 30m.
// Built for the TxODDS World Cup Hackathon (Consumer & Fan Experiences).

import Link from "next/link";
import type { Metadata } from "next";
import { getTournament, recentResults, type Fixture } from "@/lib/tournament";
import PickCard from "@/components/PickCard";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Elo Arena · Beat the algorithm · World Cup Elo",
  description:
    "Pick World Cup 2026 match outcomes against the Elo model and live TxODDS market odds. Your accuracy vs the algorithm's, same matches, same yardstick.",
};

// Serializable subset of Fixture passed to the client PickCard,
// per the agreed PickCard contract.
function toCard(f: Fixture) {
  return {
    num: f.num,
    slug: f.slug,
    round: f.round,
    group: f.group,
    dateUtc: f.dateUtc,
    team1: f.team1,
    team2: f.team2,
    team1Name: f.team1Name,
    team2Name: f.team2Name,
    played: f.played,
    score: f.score,
    p1Win: f.p1Win,
    pDraw: f.pDraw,
    p2Win: f.p2Win,
    venue: f.venue,
  };
}

// Deterministic kickoff formatting: always Eastern Time, labeled ET.
function kickoffEt(iso: string): string {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
  return `${day} · ${time} ET`;
}

export default async function HomePage() {
  const t = await getTournament();

  const pickable = t.fixtures
    .filter((f) => !f.played)
    .sort((a, b) => a.dateUtc.localeCompare(b.dateUtc) || a.num - b.num);
  const settled = recentResults(t, 6);
  const nextKickoff = pickable[0] ?? null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">
      {/* ===== Hero ===== */}
      <section>
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-slow"
            aria-hidden
          />
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            TxODDS World Cup Hackathon · Live
          </span>
        </div>
        <h1 className="mt-3 font-display font-bold tracking-tight text-4xl sm:text-5xl leading-[1.05]">
          Beat the <span className="gold-text">algorithm</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          Pick every remaining World Cup match. The Elo model already has.
          TxODDS prices the market. Who reads the game best?
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-1.5 text-[12px]">
            <span className="text-zinc-500">Stage</span>
            <span className="font-semibold text-zinc-200">{t.stageNow}</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-1.5 text-[12px]">
            <span className="text-zinc-500">Matches played</span>
            <span className="text-mono tabular font-semibold text-amber-300">
              {t.playedCount}/104
            </span>
          </span>
        </div>
      </section>

      {/* ===== Pickable now ===== */}
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
              {pickable.length} matches open
            </div>
            <h2 className="mt-1 font-display font-bold tracking-tight text-2xl">
              Pickable now
            </h2>
          </div>
          {nextKickoff ? (
            <div className="text-[12px] text-zinc-500">
              Next kickoff{" "}
              <span className="text-mono tabular text-zinc-300">
                {kickoffEt(nextKickoff.dateUtc)}
              </span>
            </div>
          ) : null}
        </div>
        {pickable.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {pickable.map((f) => (
              <PickCard key={f.num} f={toCard(f)} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-[13px] text-zinc-400">
            Nothing left to pick. The tournament is settled, and so is your
            record. See how you did on{" "}
            <Link
              href="/arena/record"
              className="font-medium text-amber-300 hover:text-amber-200"
            >
              My record
            </Link>
            .
          </div>
        )}
      </section>

      {/* ===== Recently settled ===== */}
      <section>
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
          Results are in
        </div>
        <h2 className="mt-1 font-display font-bold tracking-tight text-2xl">
          Recently settled
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {settled.map((f) => (
            <PickCard key={f.num} f={toCard(f)} />
          ))}
        </div>
      </section>

      {/* ===== How scoring works ===== */}
      <section>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            Scoring
          </div>
          <h2 className="mt-1 font-display font-bold tracking-tight text-lg">
            How scoring works
          </h2>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-zinc-400">
            <li className="flex gap-2.5">
              <span className="gold-text font-bold" aria-hidden>
                ·
              </span>
              <span>
                One call per match: win, draw, or win for the other side. Picks
                lock at kickoff and settle on the full-time score.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="gold-text font-bold" aria-hidden>
                ·
              </span>
              <span>
                The Elo model picks too. It always takes its
                highest-probability outcome, computed from live ratings
                replayed through every match of this tournament.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="gold-text font-bold" aria-hidden>
                ·
              </span>
              <span>
                Every settled pick counts once. Accuracy is correct picks over
                settled picks, the same yardstick for you and for the model.
              </span>
            </li>
          </ul>
          <Link
            href="/arena/about"
            className="mt-4 inline-block text-[13px] font-medium text-amber-300 hover:text-amber-200"
          >
            Read the full methodology →
          </Link>
        </div>
      </section>
    </div>
  );
}
