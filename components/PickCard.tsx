"use client";

// Interactive fixture card: pick an outcome against the Elo model's
// probabilities. A second row is reserved for live TxODDS market odds and
// activates once the TxLINE apiToken is provisioned.

import { useCallback, useEffect, useState } from "react";
import { flagUrl } from "@/lib/teams";
import {
  getPicks,
  setPick,
  removePick,
  modelFavorite,
  outcomeOfScore,
  PICKS_EVENT,
  type Pick as ArenaPick,
} from "@/lib/picks";

export type SerializableFixture = {
  num: number;
  slug: string;
  round: string;
  group: string | null;
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
  venue: string;
};

type Outcome = ArenaPick["outcome"];

function kickoffEt(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
  return `${date} · ${time} ET`;
}

function pct(p: number): string {
  return `${Math.round(p * 100)}%`;
}

function Flag({ code }: { code: string | null }) {
  if (!code) {
    return (
      <span className="inline-block h-4 w-6 rounded-[2px] bg-zinc-800 ring-1 ring-white/10" />
    );
  }
  return (
    <img
      src={flagUrl(code)}
      alt=""
      className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-white/10"
    />
  );
}

export default function PickCard({ f }: { f: SerializableFixture }) {
  const [pick, setPickState] = useState<ArenaPick | null>(null);

  const sync = useCallback(() => {
    setPickState(getPicks()[f.num] ?? null);
  }, [f.num]);

  useEffect(() => {
    sync();
    window.addEventListener(PICKS_EVENT, sync);
    return () => window.removeEventListener(PICKS_EVENT, sync);
  }, [sync]);

  const hasProbs = f.p1Win !== null && f.pDraw !== null && f.p2Win !== null;

  const probFor = (o: Outcome): number | null =>
    o === "home" ? f.p1Win : o === "draw" ? f.pDraw : f.p2Win;

  const nameFor = (o: Outcome): string =>
    o === "home" ? f.team1Name : o === "away" ? f.team2Name : "the draw";

  const canPick = !f.played && hasProbs;

  const choose = (o: Outcome) => {
    if (!canPick) return;
    if (pick?.outcome === o) {
      removePick(f.num);
      return;
    }
    const prob = probFor(o);
    if (prob === null) return;
    setPick({
      matchNum: f.num,
      slug: f.slug,
      outcome: o,
      pickedAt: new Date().toISOString(),
      eloProbAtPick: prob,
      marketProbAtPick: null, // populated once the TxODDS feed is live
    });
  };

  // ----- settled verdict (played fixture + existing pick) -----
  let verdict: {
    userRight: boolean;
    modelLine: string | null;
  } | null = null;
  if (f.played && f.score && pick) {
    const actual = outcomeOfScore(f.score);
    const userRight = pick.outcome === actual;
    const fav = modelFavorite(f.p1Win, f.pDraw, f.p2Win);
    let modelLine: string | null = null;
    if (fav !== null) {
      const modelRight = fav === actual;
      const headline =
        userRight && modelRight
          ? "You both got it"
          : userRight
          ? "You beat the model"
          : modelRight
          ? "Model beat you"
          : "You both missed";
      modelLine = `Model favored ${nameFor(fav)} · ${headline}`;
    }
    verdict = { userRight, modelLine };
  }

  const eyebrow = f.group ? `${f.round} · Group ${f.group}` : f.round;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
      {/* eyebrow row */}
      <div className="flex items-baseline justify-between gap-3">
        <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          {eyebrow} · {f.venue}
        </p>
        {f.played && f.score ? (
          <p className="shrink-0 text-[11px] text-zinc-400">
            <span className="font-semibold uppercase tracking-wider text-zinc-500">
              FT
            </span>{" "}
            <span className="text-mono tabular font-bold text-zinc-200">
              {f.score[0]}&ndash;{f.score[1]}
            </span>
          </p>
        ) : (
          <p className="shrink-0 text-mono tabular text-[11px] text-zinc-400">
            {kickoffEt(f.dateUtc)}
          </p>
        )}
      </div>

      {/* teams */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Flag code={f.team1} />
            <span className="truncate text-sm font-semibold text-zinc-100">
              {f.team1Name}
            </span>
          </div>
          {f.played && f.score && (
            <span className="text-mono tabular text-sm font-bold text-zinc-200">
              {f.score[0]}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Flag code={f.team2} />
            <span className="truncate text-sm font-semibold text-zinc-100">
              {f.team2Name}
            </span>
          </div>
          {f.played && f.score && (
            <span className="text-mono tabular text-sm font-bold text-zinc-200">
              {f.score[1]}
            </span>
          )}
        </div>
      </div>

      {/* Elo model tri-bar */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Elo model
        </p>
        {hasProbs ? (
          <>
            <div className="mt-1.5 flex h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-elevated)]">
              <div
                className="bg-emerald-500"
                style={{ width: `${(f.p1Win as number) * 100}%` }}
              />
              <div
                className="bg-zinc-500"
                style={{ width: `${(f.pDraw as number) * 100}%` }}
              />
              <div
                className="bg-rose-500"
                style={{ width: `${(f.p2Win as number) * 100}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-mono tabular text-[11px]">
              <span className="text-emerald-400">{pct(f.p1Win as number)}</span>
              <span className="text-zinc-500">{pct(f.pDraw as number)}</span>
              <span className="text-rose-400">{pct(f.p2Win as number)}</span>
            </div>
          </>
        ) : (
          <p className="mt-1.5 text-[11px] text-zinc-600">
            · probabilities pending, teams not yet decided ·
          </p>
        )}
      </div>

      {/* TxODDS market row (activates once the TxLINE apiToken is provisioned) */}
      <div className="mt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          TxODDS market
        </p>
        <div className="mt-1.5 h-1.5 w-full rounded-full border border-dashed border-[var(--border)]" />
        <p className="mt-1 text-[11px] text-zinc-600">· awaiting live feed ·</p>
      </div>

      {/* pick buttons */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {(
          [
            ["home", f.team1Name],
            ["draw", "Draw"],
            ["away", f.team2Name],
          ] as [Outcome, string][]
        ).map(([o, label]) => {
          const selected = pick?.outcome === o;
          return (
            <button
              key={o}
              type="button"
              disabled={!canPick}
              onClick={() => choose(o)}
              aria-pressed={selected}
              className={[
                "truncate rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors",
                selected
                  ? "border-[var(--gold)] bg-[rgba(212,175,55,0.12)] text-amber-300"
                  : "border-[var(--border)] text-zinc-300",
                canPick
                  ? selected
                    ? ""
                    : "hover:border-[var(--border-strong)] hover:text-zinc-100"
                  : "cursor-not-allowed opacity-50",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* settled verdict */}
      {verdict && (
        <div className="mt-3 border-t border-[var(--border)] pt-3">
          <p
            className={`text-xs font-semibold ${
              verdict.userRight ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {verdict.userRight ? "✓ Correct" : "✗ Wrong"}
            <span className="font-normal text-zinc-400">
              {" "}
              · you had {pick ? nameFor(pick.outcome) : ""}
            </span>
          </p>
          {verdict.modelLine && (
            <p className="mt-1 text-[11px] text-zinc-500">{verdict.modelLine}</p>
          )}
        </div>
      )}
    </div>
  );
}
