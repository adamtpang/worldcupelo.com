import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import NewsBanner, { type NewsItem } from "@/components/NewsBanner";
import Emblem from "@/components/Emblem";
import {
  getTournament,
  upcoming,
  biggestMovers,
  type Tournament,
} from "@/lib/tournament";
import { getWinnerMarket } from "@/lib/polymarket";
import { TEAMS } from "@/lib/teams";

export const metadata: Metadata = {
  title: "World Cup Elo · Live ELO Ratings for National Teams",
  description:
    "Live Elo ratings for every men's national football team. Track form heading into the 2026 World Cup, compare any two teams head-to-head, and follow ratings updates after every international match.",
  metadataBase: new URL("https://worldcupelo.com"),
  openGraph: {
    title: "World Cup Elo",
    description: "Elo ratings for every men's national football team",
    url: "https://worldcupelo.com",
    siteName: "World Cup Elo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "World Cup Elo",
    description: "Elo ratings for every men's national football team",
  },
};

function fmtDelta(d: number, digits = 1): string {
  return d >= 0 ? `+${d.toFixed(digits)}` : `−${Math.abs(d).toFixed(digits)}`;
}

// Build the live ticker headlines from the tournament state, server-side.
async function buildLiveItems(t: Tournament): Promise<NewsItem[]> {
  const items: NewsItem[] = [];

  items.push({
    emoji: "🏆",
    text: `${t.stageNow} · ${t.playedCount} of ${t.fixtures.length} matches played`,
    href: "/today",
  });

  const final = t.fixtures.find((f) => f.stage === "final");
  if (final && !final.played && final.team1Name && final.team2Name) {
    items.push({
      emoji: "🏆",
      text: `${final.team1Name} vs ${final.team2Name}: the final, July 19`,
      href: "/bracket",
    });
  }

  for (const f of t.fixtures) {
    if (f.stage !== "sf" || !f.played || !f.score) continue;
    const [s1, s2] = f.score;
    if (s1 === s2) continue;
    const winner = s1 > s2 ? f.team1Name : f.team2Name;
    const loser = s1 > s2 ? f.team2Name : f.team1Name;
    items.push({
      emoji: "🔥",
      text: `${winner} are through to the final: ${s1}-${s2} vs ${loser}`,
      href: `/match/${f.slug}`,
    });
  }

  const market = await getWinnerMarket();
  if (market && market.length > 0) {
    const top3 = market
      .slice(0, 3)
      .map((m) => `${m.team} ${Math.round(m.prob * 100)}%`)
      .join(" · ");
    items.push({
      emoji: "📊",
      text: `Polymarket: ${top3}`,
      href: "/bracket",
    });
  }

  for (const f of upcoming(t, 2)) {
    let fav = "";
    if (f.p1Win !== null && f.p2Win !== null) {
      const lead =
        f.p1Win >= f.p2Win
          ? { name: f.team1Name, p: f.p1Win }
          : { name: f.team2Name, p: f.p2Win };
      fav = ` · ${lead.name} ${Math.round(lead.p * 100)}% by Elo`;
    }
    items.push({
      emoji: "⏱️",
      text: `Next: ${f.team1Name} vs ${f.team2Name}${fav}`,
      href: `/match/${f.slug}`,
    });
  }

  const mover = biggestMovers(t, 1)[0];
  if (mover) {
    const team = TEAMS.find((x) => x.code === mover.code);
    if (team) {
      items.push({
        emoji: "📈",
        text: `Biggest mover: ${team.name} ${fmtDelta(mover.delta, 0)} Elo over ${mover.playedCount} matches`,
        href: `/team/${team.code.toLowerCase()}`,
      });
    }
  }

  const top = t.liveTeams[0];
  if (top) {
    items.push({
      emoji: "🥇",
      text: `${top.name} leads the live Elo rankings at ${top.rating}`,
      href: `/team/${top.code.toLowerCase()}`,
    });
  }

  items.push({
    emoji: "⚔️",
    text: "Run any matchup through the Elo predictor",
    href: "/predict",
  });

  return items;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTournament();
  const liveItems = await buildLiveItems(t);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <NewsBanner items={liveItems} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Emblem size={28} className="shrink-0" />
          <span className="font-display font-extrabold text-[15px] tracking-tight">
            worldcup<span className="gold-text">elo</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-[13px] font-medium">
          <Link
            href="/today"
            className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition"
          >
            Today
          </Link>
          <Link
            href="/arena"
            className="px-3 py-1.5 rounded-md text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition"
          >
            Arena
          </Link>
          <Link
            href="/bracket"
            className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition"
          >
            Bracket
          </Link>
          <Link
            href="/rankings"
            className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition"
          >
            Rankings
          </Link>
          <Link
            href="/world-cup-2026"
            className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition"
          >
            <span className="hidden sm:inline">World Cup </span>2026
          </Link>
          <Link
            href="/predict"
            className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition"
          >
            Predict
          </Link>
          <Link
            href="/methodology"
            className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition hidden sm:block"
          >
            Method
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-[12px] text-zinc-500 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <span className="font-semibold text-zinc-400">World Cup Elo</span> · An Elo
          ratings tracker for men's national football teams. Inspired by{" "}
          <a
            href="https://clubelo.com"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-zinc-300"
          >
            clubelo.com
          </a>{" "}
          and{" "}
          <a
            href="https://playerelo.com"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-zinc-300"
          >
            playerelo.com
          </a>
          .
        </div>
        <div className="flex gap-4">
          <Link href="/methodology" className="hover:text-zinc-300">
            Methodology
          </Link>
          <Link href="/world-cup-2026" className="hover:text-zinc-300">
            2026 WC
          </Link>
          <a
            href="https://github.com/adamtpang/worldcupelo"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href="https://adampang.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300"
          >
            built by Adam Pangelinan
          </a>
        </div>
      </div>
    </footer>
  );
}
