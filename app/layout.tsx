import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center text-[10px] font-black text-black">
            ⚽
          </div>
          <span className="font-bold text-[15px] tracking-tight">
            worldcup<span className="gold-text">elo</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-[13px] font-medium">
          <Link
            href="/"
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
            href="/compare"
            className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition"
          >
            Compare
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
        </div>
      </div>
    </footer>
  );
}
