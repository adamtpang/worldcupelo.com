"use client";

import { useEffect, useMemo, useState } from "react";
import type { Team } from "@/lib/teams";
import { winProbability } from "@/lib/teams";

const HOME_ADV = 60;

export default function CompareClient({ teams }: { teams: Team[] }) {
  const [codeA, setCodeA] = useState(teams[0].code);
  const [codeB, setCodeB] = useState(teams[1].code);
  const [neutral, setNeutral] = useState(true);

  // Honor deep links like /predict?a=ESP&b=ARG (used by match pages).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const a = sp.get("a")?.toUpperCase();
    const b = sp.get("b")?.toUpperCase();
    if (a && teams.some((t) => t.code === a)) setCodeA(a);
    if (b && teams.some((t) => t.code === b)) setCodeB(b);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teamA = teams.find((t) => t.code === codeA)!;
  const teamB = teams.find((t) => t.code === codeB)!;

  const probs = useMemo(() => {
    const homeAdv = neutral ? 0 : HOME_ADV;
    const pWin = winProbability(teamA.rating, teamB.rating, homeAdv);
    const pLose = 1 - pWin;
    const drawFactor = Math.exp(
      -Math.pow(teamA.rating + homeAdv - teamB.rating, 2) / 200000
    );
    const draw = 0.27 * drawFactor;
    const win = pWin * (1 - draw / 2);
    const lose = pLose * (1 - draw / 2);
    return { win, draw, lose };
  }, [teamA, teamB, neutral]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-center mb-6">
        <TeamPicker teams={teams} value={codeA} onChange={setCodeA} side="left" />
        <div className="text-center text-zinc-500 font-mono text-sm">vs</div>
        <TeamPicker teams={teams} value={codeB} onChange={setCodeB} side="right" />
      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setNeutral(true)}
          className={`text-[12px] font-semibold px-3 py-1.5 rounded-md transition ${
            neutral ? "bg-amber-500 text-black" : "bg-white/5 text-zinc-400"
          }`}
        >
          Neutral venue
        </button>
        <button
          onClick={() => setNeutral(false)}
          className={`text-[12px] font-semibold px-3 py-1.5 rounded-md transition ${
            !neutral ? "bg-amber-500 text-black" : "bg-white/5 text-zinc-400"
          }`}
        >
          {teamA.name} at home (+{HOME_ADV} Elo)
        </button>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <Outcome
            label={`${teamA.name} win`}
            value={probs.win}
            color="emerald"
            flag={teamA.flag}
          />
          <Outcome label="Draw" value={probs.draw} color="zinc" flag="🤝" />
          <Outcome
            label={`${teamB.name} win`}
            value={probs.lose}
            color="rose"
            flag={teamB.flag}
          />
        </div>

        <div className="mt-6 h-3 rounded-full overflow-hidden flex bg-[var(--bg)]">
          <div
            className="bg-emerald-500"
            style={{ width: `${probs.win * 100}%` }}
            title={`${teamA.name} win`}
          />
          <div
            className="bg-zinc-500"
            style={{ width: `${probs.draw * 100}%` }}
            title="Draw"
          />
          <div
            className="bg-rose-500"
            style={{ width: `${probs.lose * 100}%` }}
            title={`${teamB.name} win`}
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <Stat label="Elo" value={teamA.rating.toString()} />
          <Stat
            label="Difference"
            value={`${Math.abs(teamA.rating - teamB.rating)}`}
            sub={
              teamA.rating === teamB.rating
                ? "even"
                : teamA.rating > teamB.rating
                ? `${teamA.name} favored`
                : `${teamB.name} favored`
            }
          />
          <Stat label="Elo" value={teamB.rating.toString()} />
        </div>
      </div>
    </div>
  );
}

function TeamPicker({
  teams,
  value,
  onChange,
  side,
}: {
  teams: Team[];
  value: string;
  onChange: (c: string) => void;
  side: "left" | "right";
}) {
  const team = teams.find((t) => t.code === value)!;
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-center">
      <div className="text-7xl mb-3">{team.flag}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[var(--bg)] border border-[var(--border)] rounded-md px-3 py-1.5 text-base font-semibold w-full"
      >
        {teams.map((t) => (
          <option key={t.code} value={t.code}>
            {t.name}
          </option>
        ))}
      </select>
      <div className="text-mono text-amber-300 text-2xl font-bold tabular mt-3">
        {team.rating}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mt-1">
        Rank #{team.rank} · {team.confederation}
      </div>
    </div>
  );
}

function Outcome({
  label,
  value,
  color,
  flag,
}: {
  label: string;
  value: number;
  color: "emerald" | "zinc" | "rose";
  flag: string;
}) {
  const colorClasses = {
    emerald: "text-emerald-300",
    zinc: "text-zinc-300",
    rose: "text-rose-300",
  };
  return (
    <div>
      <div className="text-2xl mb-1">{flag}</div>
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        {label}
      </div>
      <div className={`text-mono font-black tabular text-4xl mt-1 ${colorClasses[color]}`}>
        {(value * 100).toFixed(0)}%
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        {label}
      </div>
      <div className="text-mono font-bold tabular text-xl mt-1">{value}</div>
      {sub && <div className="text-[10px] text-zinc-500 mt-1">{sub}</div>}
    </div>
  );
}
