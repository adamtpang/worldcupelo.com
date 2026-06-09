"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NewsItem = { emoji: string; text: string; href: string };

// Seed news. These are real and current as of June 2026. Phase 2 (live data
// pipeline) will make these auto-update after each international window.
const NEWS: NewsItem[] = [
  {
    emoji: "⚽",
    text: "FIFA World Cup 2026 kicks off June 11, the first-ever 48-team tournament",
    href: "/world-cup-2026",
  },
  {
    emoji: "🥇",
    text: "Spain tops the global Elo rankings at 2171",
    href: "/team/esp",
  },
  {
    emoji: "📊",
    text: "Polymarket favorites: Spain 17% · France 16% · England 11% · Portugal 10%",
    href: "/world-cup-2026",
  },
  {
    emoji: "🇺🇸🇨🇦🇲🇽",
    text: "Hosted across the United States, Canada & Mexico · 16 host cities, 104 matches",
    href: "/world-cup-2026",
  },
  {
    emoji: "🔥",
    text: "Argentina (2113) and France (2063) lead the chasing pack",
    href: "/team/arg",
  },
  {
    emoji: "⚔️",
    text: "Run any matchup through the Elo predictor",
    href: "/predict",
  },
];

export default function NewsBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("wce_news_dismissed") === "1") {
        setDismissed(true);
      }
      const d = Math.max(
        0,
        Math.ceil(
          (new Date("2026-06-11T00:00:00Z").getTime() - Date.now()) /
            86400000
        )
      );
      setDays(d);
    }
  }, []);

  if (dismissed) return null;

  const items: NewsItem[] =
    days !== null && days > 0
      ? [
          {
            emoji: "⏱️",
            text: `${days} ${days === 1 ? "day" : "days"} to kickoff`,
            href: "/world-cup-2026",
          },
          ...NEWS,
        ]
      : NEWS;

  // Duplicate the list so the marquee loops seamlessly at translateX(-50%).
  const loop = [...items, ...items];

  return (
    <div className="news-marquee relative bg-[var(--wce-bg-true)] border-b border-[var(--border)] overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "var(--wce-gradient-trination)" }}
      />
      <div className="flex items-stretch pt-[2px]">
        <div className="flex items-center gap-1.5 px-3 bg-[var(--wce-bg-true)] border-r border-[var(--border)] text-white text-[10px] font-black uppercase tracking-[0.15em] shrink-0 z-10">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-slow"
            style={{
              background: "var(--wce-neon-magenta)",
              boxShadow: "var(--wce-glow-magenta)",
            }}
          />
          Live
        </div>

        <div
          className="overflow-hidden flex-1 py-2"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee">
            {loop.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center gap-2 px-6 text-[12px] text-zinc-300 hover:text-[var(--wce-neon-cyan-text)] transition whitespace-nowrap group"
              >
                <span className="text-sm">{item.emoji}</span>
                <span className="font-medium">{item.text}</span>
                <span
                  aria-hidden
                  className="ml-4"
                  style={{ color: "var(--wce-gold)", opacity: 0.4 }}
                >
                  ·
                </span>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setDismissed(true);
            if (typeof window !== "undefined") {
              window.localStorage.setItem("wce_news_dismissed", "1");
            }
          }}
          aria-label="Dismiss news banner"
          className="px-3 text-zinc-500 hover:text-white hover:bg-white/5 transition shrink-0 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
