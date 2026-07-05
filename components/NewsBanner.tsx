"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type NewsItem = { emoji: string; text: string; href: string };

// Static fallback headlines, used only when no live items are passed in.
// The layout builds live items server-side from the tournament feed.
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

// Per-day dismissal: the ticker carries fresh headlines every day, so a
// dismiss only silences it until tomorrow.
function dismissKey(): string {
  return "wce_news_dismissed_" + new Date().toISOString().slice(0, 10);
}

export default function NewsBanner({ items }: { items?: NewsItem[] }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem(dismissKey()) === "1"
    ) {
      setDismissed(true);
    }
  }, []);

  if (dismissed) return null;

  const feed = items && items.length ? items : NEWS;

  // Duplicate the list so the marquee loops seamlessly at translateX(-50%).
  const loop = [...feed, ...feed];

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
              window.localStorage.setItem(dismissKey(), "1");
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
