import Link from "next/link";

export const metadata = {
  title: "Methodology · World Cup Elo",
  description:
    "How we calculate Elo ratings for men's national football teams.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-[12px] text-zinc-500 hover:text-zinc-300 mb-6"
      >
        ← Back
      </Link>
      <h1 className="font-display text-4xl font-black tracking-tight mb-2">
        Methodology
      </h1>
      <p className="text-zinc-400 mb-10">
        How national-team Elo ratings work, and what they mean.
      </p>

      <div className="space-y-8 text-zinc-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-2">What is Elo?</h2>
          <p>
            Elo is a relative skill rating system originally developed by physicist
            Arpad Elo for chess. Every team carries a single number; when two teams
            play, points flow from the underdog to the favorite based on the result
            and on the gap in ratings beforehand. The system is zero-sum: every
            point one team gains, another loses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">The formula</h2>
          <p className="mb-3">
            Each team's expected result against an opponent is a logistic function
            of the rating difference:
          </p>
          <pre className="bg-[var(--bg-card)] border border-[var(--border)] rounded-md p-4 text-mono text-sm overflow-x-auto">
            <code>{`E_A = 1 / (1 + 10^((R_B − R_A − HA) / 400))`}</code>
          </pre>
          <p className="mt-3 text-sm text-zinc-400">
            Where <code className="text-mono">R_A</code> and{" "}
            <code className="text-mono">R_B</code> are the two teams' ratings, and{" "}
            <code className="text-mono">HA</code> is a home-advantage adjustment
            (typically +100 Elo for the home side, 0 at neutral venues).
          </p>
          <p className="mt-3">After a match:</p>
          <pre className="bg-[var(--bg-card)] border border-[var(--border)] rounded-md p-4 text-mono text-sm overflow-x-auto">
            <code>{`R'_A = R_A + K × G × (S_A − E_A)`}</code>
          </pre>
          <p className="mt-3 text-sm text-zinc-400">
            <code className="text-mono">K</code> weights the importance of the
            match (friendlies are lower, World Cup knockout games are higher).{" "}
            <code className="text-mono">G</code> adjusts for goal difference.{" "}
            <code className="text-mono">S_A</code> is the actual result: 1 for win,
            0.5 for draw, 0 for loss.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">Reading the numbers</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="text-amber-300 font-bold">2100+</span>: Elite. A
              top-3 side in the world. Spain, Argentina, France at their best.
            </li>
            <li>
              <span className="text-emerald-300 font-bold">2000–2099</span>: World
              class. Realistic title contenders at major tournaments.
            </li>
            <li>
              <span className="text-sky-300 font-bold">1900–1999</span>: Top tier.
              Capable of beating anyone on the day.
            </li>
            <li>
              <span className="text-violet-300 font-bold">1800–1899</span>: Strong.
              Reliable knockout-round teams.
            </li>
            <li>
              <span className="text-zinc-300 font-bold">1700–1799</span>:
              Competitive. World Cup qualifiers.
            </li>
            <li>
              <span className="text-zinc-400 font-bold">1600–1699</span>:
              Developing. Solid regional sides.
            </li>
            <li>
              <span className="text-zinc-500 font-bold">Below 1600</span>:
              Emerging programs.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">Data source</h2>
          <p>
            Ratings are based on the publicly published World Football Elo
            Ratings, the de facto standard for national-team Elo, originally
            compiled by Bob Runyan and now maintained on{" "}
            <a
              href="https://eloratings.net"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-zinc-100"
            >
              eloratings.net
            </a>
            . World Cup Elo focuses on men's senior national teams.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">A note on forecasts</h2>
          <p>
            Win probabilities and tournament odds shown on this site are derived
            directly from current Elo ratings. They do not account for injuries,
            recent form trends, travel fatigue, or stylistic matchups. Treat them
            as a baseline: a starting point for conversation, not a forecast.
          </p>
        </section>
      </div>
    </div>
  );
}
