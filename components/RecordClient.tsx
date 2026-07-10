"use client";

// RecordClient: client half of /leaderboard. Receives serializable fixtures
// from the server page, joins them with localStorage picks via lib/picks,
// and renders the scoreboard: stat tiles, you vs the Elo model, streak, and
// the settled-pick ledger.
//
// lib/picks contract: settle(fixtures) -> PickRecord[] ({ matchNum, outcome:
// "home"|"draw"|"away", settled, correct }); summarize(fixtures) ->
// PickSummary ({ total, settled, correct, accuracy, streak, ... }).
// The model-side comparison is computed locally from fixture probabilities,
// so it has no dependency on the picks module beyond the pick itself.

import { useEffect, useState } from "react";
import Link from "next/link";
import { flagUrl } from "@/lib/teams";
import { settle, summarize } from "@/lib/picks";

export type RecordFixture = {
  num: number;
  dateUtc: string;
  team1: string | null;
  team2: string | null;
  team1Name: string;
  team2Name: string;
  played: boolean;
  score: [number, number] | null;
  p1Win: number | null;
  pDraw: number | null;
  p2Win: number | null;
};

type Choice = "home" | "draw" | "away";
type Settled = ReturnType<typeof settle>;
type Summary = ReturnType<typeof summarize>;

function actualOf(score: [number, number]): Choice {
  if (score[0] > score[1]) return "home";
  if (score[0] < score[1]) return "away";
  return "draw";
}

function modelChoiceOf(f: RecordFixture): Choice | null {
  if (f.p1Win == null || f.pDraw == null || f.p2Win == null) return null;
  if (f.p1Win >= f.pDraw && f.p1Win >= f.p2Win) return "home";
  if (f.p2Win >= f.p1Win && f.p2Win >= f.pDraw) return "away";
  return "draw";
}

function pickLabel(f: RecordFixture, choice: Choice): string {
  if (choice === "draw") return "Draw";
  return choice === "home" ? f.team1Name : f.team2Name;
}

function pct(n: number, d: number): number | null {
  return d > 0 ? Math.round((n / d) * 100) : null;
}

function Flag({ code }: { code: string | null }) {
  if (!code) return null;
  const src = flagUrl(code);
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-white/10"
    />
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        {label}
      </div>
      <div className="mt-1.5 text-mono tabular text-2xl font-bold text-amber-300">
        {value}
      </div>
    </div>
  );
}

function AccuracyBar({
  label,
  correct,
  total,
  barClass,
}: {
  label: string;
  correct: number;
  total: number;
  barClass: string;
}) {
  const p = pct(correct, total);
  return (
    <div>
      <div className="flex items-baseline justify-between text-[12px]">
        <span className="text-zinc-400">{label}</span>
        <span className="text-mono tabular text-zinc-200">
          {p === null ? "·" : `${p}%`}{" "}
          <span className="text-zinc-500">
            ({correct}/{total})
          </span>
        </span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${p ?? 0}%` }}
        />
      </div>
    </div>
  );
}

export default function RecordClient({
  fixtures,
}: {
  fixtures: RecordFixture[];
}) {
  // Picks live in localStorage, so all pick-derived UI renders after mount
  // to keep server and client markup identical.
  const [state, setState] = useState<{
    settled: Settled;
    summary: Summary;
  } | null>(null);

  useEffect(() => {
    const settledPicks = settle(fixtures);
    setState({ settled: settledPicks, summary: summarize(fixtures) });
  }, [fixtures]);

  if (!state) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile label="Your picks" value="·" />
        <StatTile label="Settled" value="·" />
        <StatTile label="Correct" value="·" />
        <StatTile label="Accuracy" value="·" />
      </div>
    );
  }

  const { settled: settledPicks, summary } = state;

  // ----- empty state -----
  if (summary.total === 0) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-10 text-center">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
          Nothing on the board
        </div>
        <p className="mt-2 font-display font-bold tracking-tight text-xl">
          No picks yet
        </p>
        <p className="mt-2 text-[13px] text-zinc-400">
          Head to the matches and take on the model.
        </p>
        <Link
          href="/arena"
          className="mt-5 inline-flex items-center rounded-md bg-[var(--wce-gold)] px-4 py-2 text-[13px] font-semibold text-black hover:bg-[var(--wce-gold-bright)] transition"
        >
          Go to the matches
        </Link>
      </div>
    );
  }

  const byNum = new Map(fixtures.map((f) => [f.num, f]));

  // Settled picks joined to fixtures, most recent kickoff first.
  const rows = settledPicks
    .map((s) => ({ s, f: byNum.get(s.matchNum) }))
    .filter((x): x is { s: Settled[number]; f: RecordFixture } => !!x.f)
    .sort(
      (a, b) =>
        b.f.dateUtc.localeCompare(a.f.dateUtc) || b.f.num - a.f.num
    );

  // Model record on exactly the matches the user has settled picks on,
  // computed locally from pre-match probabilities: the model's pick is its
  // highest-probability outcome.
  let modelCorrect = 0;
  let modelCounted = 0;
  for (const { f } of rows) {
    if (!f.played || !f.score) continue;
    const mc = modelChoiceOf(f);
    if (!mc) continue;
    modelCounted++;
    if (mc === actualOf(f.score)) modelCorrect++;
  }

  const yourPct = pct(summary.correct, summary.settled);
  const modelPct = pct(modelCorrect, modelCounted);

  let verdict: { text: string; tone: string };
  if (yourPct === null || modelPct === null) {
    verdict = {
      text: "Verdict pending: no settled picks yet. It settles at full time.",
      tone: "text-zinc-400",
    };
  } else if (yourPct > modelPct) {
    verdict = {
      text: `You are ahead of the model by ${yourPct - modelPct} points. The algorithm is beatable.`,
      tone: "text-emerald-400",
    };
  } else if (yourPct < modelPct) {
    verdict = {
      text: `The model leads by ${modelPct - yourPct} points. The algorithm is still winning.`,
      tone: "text-red-400",
    };
  } else {
    verdict = {
      text: "Dead level with the model. The next pick breaks the tie.",
      tone: "text-amber-300",
    };
  }

  return (
    <div className="space-y-8">
      {/* ----- stat tiles ----- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile label="Your picks" value={String(summary.total)} />
        <StatTile label="Settled" value={String(summary.settled)} />
        <StatTile label="Correct" value={String(summary.correct)} />
        <StatTile
          label="Accuracy"
          value={yourPct === null ? "·" : `${yourPct}%`}
        />
      </div>

      {/* ----- you vs the model ----- */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
          Same matches, same yardstick
        </div>
        <h2 className="mt-1 font-display font-bold tracking-tight text-lg">
          You vs the Elo model
        </h2>
        <div className="mt-4 space-y-4">
          <AccuracyBar
            label="You"
            correct={summary.correct}
            total={summary.settled}
            barClass="bg-amber-400"
          />
          <AccuracyBar
            label="Elo model"
            correct={modelCorrect}
            total={modelCounted}
            barClass="bg-zinc-500"
          />
        </div>
        <p className={`mt-4 text-[13px] font-medium ${verdict.tone}`}>
          {verdict.text}
        </p>
        <div className="mt-3 flex items-center gap-2 text-[12px] text-zinc-500">
          <span>Current streak</span>
          <span className="text-mono tabular font-semibold text-zinc-200">
            {summary.streak}
          </span>
          <span>{summary.streak === 1 ? "correct pick" : "correct picks"}</span>
        </div>
      </div>

      {/* ----- settled ledger ----- */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
          {rows.length} settled
        </div>
        <h2 className="mt-1 font-display font-bold tracking-tight text-lg">
          Your settled picks
        </h2>
        {rows.length === 0 ? (
          <p className="mt-3 text-[13px] text-zinc-400">
            Your picks are in but none have settled. Results land at full
            time.
          </p>
        ) : (
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] divide-y divide-[var(--border)]">
            {rows.map(({ s, f }) => (
              <div
                key={f.num}
                className="flex items-center gap-3 px-4 py-3 text-[13px]"
              >
                <span
                  className={`text-mono font-bold ${
                    s.correct ? "text-emerald-400" : "text-rose-400"
                  }`}
                  aria-label={s.correct ? "Correct" : "Incorrect"}
                >
                  {s.correct ? "✓" : "✗"}
                </span>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Flag code={f.team1} />
                  <span className="truncate text-zinc-200">{f.team1Name}</span>
                  <span className="text-mono tabular font-semibold text-zinc-300 shrink-0">
                    {f.score ? `${f.score[0]}-${f.score[1]}` : "·"}
                  </span>
                  <span className="truncate text-zinc-200">{f.team2Name}</span>
                  <Flag code={f.team2} />
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-zinc-500">Your pick</span>{" "}
                  <span
                    className={`font-medium ${
                      s.correct ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {pickLabel(f, s.outcome)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
