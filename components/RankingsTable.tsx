"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Confederation, Team } from "@/lib/teams";
import { CONFEDERATIONS, ratingTier, flagUrl, hostBadge } from "@/lib/teams";

type Filter = "ALL" | Confederation;

export default function RankingsTable({ teams }: { teams: Team[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return teams.filter((t) => {
      if (filter !== "ALL" && t.confederation !== filter) return false;
      if (
        search &&
        !t.name.toLowerCase().includes(search.toLowerCase()) &&
        !t.code.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [teams, filter, search]);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg overflow-hidden">
      <div className="border-b border-[var(--border)] p-3 flex flex-wrap items-center gap-2">
        <input
          type="text"
          placeholder="Search teams…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[var(--bg)] border border-[var(--border)] focus:border-amber-500/50 focus:outline-none rounded-md px-3 py-1.5 text-sm placeholder:text-zinc-600 flex-1 min-w-[140px] max-w-[280px]"
        />
        <div className="flex flex-wrap gap-1 ml-auto">
          {(["ALL", "UEFA", "CONMEBOL", "CONCACAF", "AFC", "CAF", "OFC"] as Filter[]).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-md transition ${
                  filter === f
                    ? "bg-amber-500 text-black"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f === "ALL" ? "All" : f}
              </button>
            )
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-zinc-500 border-b border-[var(--border)]">
              <th className="text-left px-3 py-2 font-medium w-[60px]">Rank</th>
              <th className="text-left px-3 py-2 font-medium">Team</th>
              <th className="text-right px-3 py-2 font-medium">Elo</th>
              <th className="text-right px-3 py-2 font-medium hidden sm:table-cell">
                Peak
              </th>
              <th className="text-left px-3 py-2 font-medium hidden md:table-cell">
                Confed
              </th>
              <th className="text-left px-3 py-2 font-medium hidden lg:table-cell">
                Tier
              </th>
              <th className="px-3 py-2 font-medium w-[1%]"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const tier = ratingTier(t.rating);
              const conf = CONFEDERATIONS[t.confederation];
              const hb = t.host ? hostBadge(t.code) : null;
              return (
                <tr
                  key={t.code}
                  className="border-b border-[var(--border)]/50 hover:bg-white/[0.02] transition group"
                >
                  <td className="px-3 py-2.5 text-mono text-zinc-500 tabular text-sm">
                    {t.rank}
                  </td>
                  <td className="px-3 py-2.5">
                    <Link
                      href={`/team/${t.code.toLowerCase()}`}
                      className="flex items-center gap-3 group/team"
                    >
                      <img
                        src={flagUrl(t.code)}
                        alt={`${t.name} flag`}
                        loading="lazy"
                        width={24}
                        height={16}
                        className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-white/10"
                      />
                      <div className="flex items-center gap-2">
                        <span className="font-semibold group-hover/team:text-amber-300 transition">
                          {t.name}
                        </span>
                        {t.host && (
                          <span
                            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                            style={
                              hb
                                ? {
                                    color: hb.text,
                                    background: hb.bg,
                                    borderColor: hb.border,
                                  }
                                : undefined
                            }
                          >
                            Host
                          </span>
                        )}
                        {t.wcTitles && t.wcTitles > 0 && (
                          <span
                            className="text-[10px] text-amber-300"
                            title={`${t.wcTitles} World Cup title${t.wcTitles > 1 ? "s" : ""}`}
                          >
                            {"★".repeat(t.wcTitles)}
                          </span>
                        )}
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-right text-mono font-bold tabular text-amber-300">
                    {t.rating}
                  </td>
                  <td className="px-3 py-2.5 text-right text-mono tabular text-zinc-500 text-sm hidden sm:table-cell">
                    {t.peakRating ?? t.rating}
                  </td>
                  <td className="px-3 py-2.5 hidden md:table-cell">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        background: `${conf.color}20`,
                        color: conf.color,
                      }}
                    >
                      {conf.name}
                    </span>
                  </td>
                  <td
                    className={`px-3 py-2.5 text-[11px] font-semibold hidden lg:table-cell ${tier.color}`}
                  >
                    {tier.label}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <Link
                      href={`/team/${t.code.toLowerCase()}`}
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-200"
                    >
                      View<span className="hidden sm:inline"> team</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-zinc-500 text-sm">
                  No teams match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
