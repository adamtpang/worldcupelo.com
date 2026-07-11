// Kelly: the Elo-edge paper-trading agent, rendered as a live dashboard.
// Server component, ISR 30m. Everything on this page is a deterministic
// replay of runAgent() over the real fixture list (lib/agent.ts): no storage,
// no clock, no wagering. Built for the TxODDS World Cup Hackathon
// (Trading Tools & Agents).

import Link from "next/link";
import type { Metadata } from "next";
import { getTournament } from "@/lib/tournament";
import { runAgent } from "@/lib/agent";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Kelly · the Elo-edge trading agent · World Cup Elo",
  description:
    "An autonomous agent that trades the disagreements between the Elo model and 1X2 market odds, staking fractional-Kelly positions across World Cup 2026. Paper trading on a simulated TxLINE feed until the live TxODDS apiToken lands.",
};

// ---------- deterministic formatting helpers ----------

function money(x: number): string {
  return x.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function signedMoney(x: number): string {
  return x >= 0 ? `+${money(x)}` : `-${money(-x)}`;
}

function pct(p: number): string {
  return `${(p * 100).toFixed(1)}%`;
}

function edgePts(e: number): string {
  return `+${(e * 100).toFixed(1)} pts`;
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

// ---------- bankroll chart (pure SVG, no libs) ----------

function BankrollChart({
  series,
  bankroll0,
}: {
  series: { matchNum: number; bankroll: number }[];
  bankroll0: number;
}) {
  const W = 800;
  const H = 160;
  const PX = 6;
  const PY = 10;

  const xs = series.map((d) => d.matchNum);
  const ys = series.map((d) => d.bankroll).concat(bankroll0);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = Math.max(1, maxX - minX);
  const spanY = Math.max(1, maxY - minY);

  const x = (m: number) => PX + ((m - minX) / spanX) * (W - PX * 2);
  const y = (b: number) => H - PY - ((b - minY) / spanY) * (H - PY * 2);

  const line = series
    .map(
      (d, i) =>
        `${i === 0 ? "M" : "L"}${x(d.matchNum).toFixed(1)},${y(d.bankroll).toFixed(1)}`
    )
    .join(" ");
  const area = `${line} L${x(maxX).toFixed(1)},${H - PY} L${x(minX).toFixed(1)},${
    H - PY
  } Z`;

  return (
    <div>
      <div className="flex items-baseline justify-between text-[11px] text-zinc-500 text-mono tabular">
        <span>
          peak <span className="text-zinc-300">{money(maxY)}</span>
        </span>
        <span>
          trough <span className="text-zinc-300">{money(minY)}</span>
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-2 w-full h-auto"
        role="img"
        aria-label={`Bankroll over the tournament, from ${money(
          bankroll0
        )} at matchday 1 to ${money(series[series.length - 1]?.bankroll ?? bankroll0)} now`}
      >
        <defs>
          <linearGradient id="kelly-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#kelly-gold)" />
        <line
          x1={PX}
          y1={y(bankroll0)}
          x2={W - PX}
          y2={y(bankroll0)}
          stroke="var(--wce-zinc)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <path
          d={line}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-1 flex items-baseline justify-between text-[11px] text-zinc-500 text-mono tabular">
        <span>M{minX} · start</span>
        <span>M{maxX} · now</span>
      </div>
    </div>
  );
}

// ---------- page ----------

export default async function AgentPage() {
  const t = await getTournament();
  const run = runAgent(t);

  const ledger = [...run.positions].reverse().slice(0, 30);
  const roiPositive = run.roiPct >= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">
      {/* ===== Hero ===== */}
      <section>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            Trading tools and agents · Paper trading
          </span>
          {run.simulated ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-amber-300">
              <span
                className="h-1.5 w-1.5 rounded-full bg-amber-400"
                aria-hidden
              />
              Simulated feed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-emerald-300">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                aria-hidden
              />
              Live TxODDS TxLINE
            </span>
          )}
        </div>
        {run.simulated ? (
          <p className="mt-2 text-[12px] text-zinc-500">
            Deterministic simulated 1X2 market; swaps to live TxODDS TxLINE
            odds when the hackathon apiToken is provisioned.
          </p>
        ) : null}
        <h1 className="mt-3 font-display font-bold tracking-tight text-4xl sm:text-5xl leading-[1.05]">
          Meet <span className="gold-text">Kelly</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          An autonomous agent that stakes fractional-Kelly positions wherever
          the Elo model disagrees with the market. It has been trading since
          matchday 1.
        </p>
      </section>

      {/* ===== Stat tiles ===== */}
      <section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
              Bankroll
            </div>
            <div className="mt-2 text-mono tabular text-2xl font-semibold text-zinc-100">
              {money(run.bankroll)}
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              from {money(run.bankroll0)} paper
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
              ROI
            </div>
            <div
              className={`mt-2 text-mono tabular text-2xl font-semibold ${
                roiPositive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {roiPositive ? "+" : ""}
              {run.roiPct.toFixed(2)}%
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              {money(run.staked)} total staked
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
              Positions
            </div>
            <div className="mt-2 text-mono tabular text-2xl font-semibold text-zinc-100">
              {run.wins}-{run.losses}
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              hit rate {run.hitRatePct.toFixed(1)}%
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
              Elo model Brier
            </div>
            <div className="mt-2 text-mono tabular text-2xl font-semibold text-zinc-100">
              {run.brier.toFixed(3)}
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              lower is better
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bankroll chart ===== */}
      <section>
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
          Compounding, one edge at a time
        </div>
        <h2 className="mt-1 font-display font-bold tracking-tight text-2xl">
          Bankroll
        </h2>
        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-5">
          <BankrollChart series={run.bankrollSeries} bankroll0={run.bankroll0} />
          <div className="mt-3 text-[11px] text-zinc-500">
            Dashed line marks the {money(run.bankroll0)} starting bankroll.
            Each step is a settled position, in match order.
          </div>
        </div>
      </section>

      {/* ===== Open signals ===== */}
      <section>
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
          Where the model disagrees next
        </div>
        <h2 className="mt-1 font-display font-bold tracking-tight text-2xl">
          Open signals
        </h2>
        {run.signals.length > 0 ? (
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-zinc-500 font-semibold border-b border-[var(--border)]">
                  <th className="px-4 py-3 font-semibold">Fixture</th>
                  <th className="px-4 py-3 font-semibold">Kickoff</th>
                  <th className="px-4 py-3 font-semibold">Position</th>
                  <th className="px-4 py-3 font-semibold text-right">Odds</th>
                  <th className="px-4 py-3 font-semibold text-right">
                    Elo vs market
                  </th>
                  <th className="px-4 py-3 font-semibold text-right">Edge</th>
                  <th className="px-4 py-3 font-semibold text-right">Stake</th>
                </tr>
              </thead>
              <tbody>
                {run.signals.map((s) => (
                  <tr
                    key={s.matchNum}
                    className="border-b border-[var(--border)] last:border-b-0"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/match/${s.slug}`}
                        className="font-medium text-zinc-200 hover:text-amber-200"
                      >
                        {s.label}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-zinc-500 text-mono tabular text-[12px]">
                      {kickoffEt(s.dateUtc)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-zinc-300">
                      {s.outcomeLabel}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-mono tabular text-zinc-300">
                      {s.odds.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-mono tabular text-zinc-400">
                      <span className="text-zinc-200">{pct(s.eloProb)}</span>{" "}
                      vs {pct(s.marketProb)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-mono tabular font-semibold text-emerald-400">
                      {edgePts(s.edge)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-mono tabular text-zinc-200">
                      {money(s.plannedStake)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-[13px] text-zinc-400">
            No qualifying edges on the remaining fixtures.
          </div>
        )}
      </section>

      {/* ===== Position ledger ===== */}
      <section>
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
          {run.wins + run.losses} settled · latest first
        </div>
        <h2 className="mt-1 font-display font-bold tracking-tight text-2xl">
          Position ledger
        </h2>
        {ledger.length > 0 ? (
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-zinc-500 font-semibold border-b border-[var(--border)]">
                  <th className="px-4 py-3 font-semibold">Fixture</th>
                  <th className="px-4 py-3 font-semibold">Position</th>
                  <th className="px-4 py-3 font-semibold text-right">Odds</th>
                  <th className="px-4 py-3 font-semibold text-right">Stake</th>
                  <th className="px-4 py-3 font-semibold text-right">Edge</th>
                  <th className="px-4 py-3 font-semibold text-right">P/L</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((p) => (
                  <tr
                    key={p.matchNum}
                    className="border-b border-[var(--border)] last:border-b-0"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.won ? "bg-emerald-400" : "bg-rose-400"
                          }`}
                          aria-hidden
                        />
                        <Link
                          href={`/match/${p.slug}`}
                          className="font-medium text-zinc-200 hover:text-amber-200"
                        >
                          {p.label}
                        </Link>
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-zinc-300">
                      {p.outcomeLabel}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-mono tabular text-zinc-300">
                      {p.oddsTaken.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-mono tabular text-zinc-300">
                      {money(p.stake)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-mono tabular text-zinc-500">
                      {edgePts(p.edge)}
                    </td>
                    <td
                      className={`px-4 py-3 whitespace-nowrap text-right text-mono tabular font-semibold ${
                        p.pnl >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {signedMoney(p.pnl)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-[13px] text-zinc-400">
            No settled positions yet. Kelly waits for its first qualifying
            edge.
          </div>
        )}
        {run.positions.length > 30 ? (
          <div className="mt-2 text-[11px] text-zinc-500">
            Showing the latest 30 of {run.positions.length} positions.
          </div>
        ) : null}
      </section>

      {/* ===== Strategy footer ===== */}
      <section>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            The strategy, in one sentence
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
            Kelly stakes only when the Elo model&apos;s probability beats the
            de-vigged market by at least{" "}
            <span className="text-mono tabular text-zinc-200">
              {(Math.round(run.params.minEdge * 1000) / 10).toFixed(1)} pts
            </span>
            , sizes each position at{" "}
            <span className="text-zinc-200">
              {run.params.kellyScale === 0.25
                ? "quarter-Kelly"
                : `${run.params.kellyScale}x Kelly`}
            </span>
            , and never risks more than{" "}
            <span className="text-mono tabular text-zinc-200">
              {Math.round(run.params.maxStakePct * 100)}%
            </span>{" "}
            of bankroll on a single match.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
            Every number above is a deterministic replay over the real fixture
            list; no wagering, paper only.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-[13px]">
            <Link
              href="/arena"
              className="font-medium text-amber-300 hover:text-amber-200"
            >
              ← Back to the Arena
            </Link>
            <Link
              href="/arena/about"
              className="font-medium text-amber-300 hover:text-amber-200"
            >
              Methodology →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
