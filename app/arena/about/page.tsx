import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works · Elo Arena",
  description:
    "You, the Elo model, and the market. How Elo Arena scores your World Cup 2026 picks against the algorithm and TxODDS live odds.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        How it works
      </p>
      <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl mt-2">
        Beat the <span className="gold-text">algorithm</span>
      </h1>
      <p className="mt-4 text-zinc-400 text-[15px] leading-relaxed">
        Elo Arena is a World Cup 2026 pick&rsquo;em with a twist: every pick
        you make is scored against two references that never sleep. One is a
        rating system. The other is a market.
      </p>

      {/* 1 · Three players */}
      <section className="mt-10">
        <h2 className="font-display font-bold tracking-tight text-xl">
          <span className="text-mono tabular text-zinc-600 mr-2">01</span>
          Three players in every match
        </h2>
        <div className="mt-4 space-y-3">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
              You
            </p>
            <p className="mt-2 text-[14px] text-zinc-300 leading-relaxed">
              Before kickoff you call one of three outcomes: home win, draw, or
              away win. That is the whole interface. The interesting part is
              what you are calling it against.
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
              The Elo model
            </p>
            <p className="mt-2 text-[14px] text-zinc-300 leading-relaxed">
              The model implements the World Football Elo methodology: a
              logistic expected score, tournament-weighted K factors, and
              goal-difference multipliers, updated after every match. It is the
              same engine behind{" "}
              <a
                href="https://worldcupelo.com"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white"
              >
                worldcupelo.com
              </a>
              , open-sourced as{" "}
              <span className="text-mono text-[13px] text-amber-300">
                @worldcupelo/elo
              </span>
              .
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
              The market
            </p>
            <p className="mt-2 text-[14px] text-zinc-300 leading-relaxed">
              Live odds come from TxODDS TxLINE: a Solana-native,
              cryptographically verifiable feed of real market prices. The
              Arena strips the bookmaker margin and shows de-vigged market
              probabilities right next to the model&rsquo;s, so you can see
              exactly where the two disagree, and pick a side.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            Reading the bars
          </p>
          <div className="mt-3 flex h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500" style={{ width: "54%" }} />
            <div className="bg-zinc-500" style={{ width: "24%" }} />
            <div className="bg-rose-500" style={{ width: "22%" }} />
          </div>
          <div className="mt-2 flex justify-between text-[12px] text-mono tabular text-zinc-400">
            <span>
              <span className="text-emerald-400">54%</span> home
            </span>
            <span>
              <span className="text-zinc-400">24%</span> draw
            </span>
            <span>
              <span className="text-rose-400">22%</span> away
            </span>
          </div>
          <p className="mt-2 text-[12px] text-zinc-500">
            Every match card shows this tri-bar for the model, and a second one
            for the market once live odds are flowing.
          </p>
        </div>
      </section>

      {/* 2 · Scoring */}
      <section className="mt-10">
        <h2 className="font-display font-bold tracking-tight text-xl">
          <span className="text-mono tabular text-zinc-600 mr-2">02</span>
          Scoring
        </h2>
        <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 space-y-3 text-[14px] text-zinc-300 leading-relaxed">
          <p>
            One point per correct outcome. No spreads, no exact scores, no
            partial credit: you either called it or you did not.
          </p>
          <p>
            Your accuracy is tracked against the model&rsquo;s accuracy on the
            same matches. The model&rsquo;s pick is simply its highest-probability
            outcome, so the comparison is honest: same fixtures, same
            information deadline, one brain versus one algorithm. Beating a
            calibrated rating system over a full tournament is genuinely hard,
            which is what makes it worth doing.
          </p>
          <p>
            Streaks are tracked too. A long run of correct calls says more
            about you than any single upset, and the Arena keeps the receipts.
          </p>
        </div>
      </section>

      {/* 3 · On-chain */}
      <section className="mt-10">
        <h2 className="font-display font-bold tracking-tight text-xl">
          <span className="text-mono tabular text-zinc-600 mr-2">03</span>
          The road to on-chain
        </h2>
        <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 space-y-3 text-[14px] text-zinc-300 leading-relaxed">
          <p>
            Right now your picks live in your browser&rsquo;s local storage:
            private, instant, and yours. That is deliberate. The picks store is
            isolated behind a single module so the next step swaps cleanly.
          </p>
          <p>
            The next release anchors picks and settlement on Solana devnet.
            Results are settled trustlessly from TxLINE data using{" "}
            <span className="text-mono text-[13px]">validate_stat</span> and
            Merkle proofs, meaning no admin key decides who won: the feed
            proves it. Stakes use a devnet play token.
          </p>
          <p className="text-zinc-500 text-[13px]">
            No real wagering, here or in any planned release. Devnet tokens
            have no monetary value; the Arena is a prediction game, not a
            sportsbook.
          </p>
        </div>
      </section>

      {/* 4 · Small print */}
      <section className="mt-10 border-t border-[var(--border)] pt-6">
        <p className="text-[12px] text-zinc-500 leading-relaxed">
          Built for the TxODDS World Cup Hackathon 2026, Consumer &amp; Fan
          Experiences track. Market data via{" "}
          <a
            href="https://txline.txodds.com/documentation/quickstart"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-zinc-300"
          >
            TxODDS TxLINE
          </a>
          . Ratings engine:{" "}
          <a
            href="https://github.com/adamtpang/worldcupelo-elo"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-zinc-300"
          >
            @worldcupelo/elo
          </a>
          . Live national-team ratings:{" "}
          <a
            href="https://worldcupelo.com"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-zinc-300"
          >
            worldcupelo.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
