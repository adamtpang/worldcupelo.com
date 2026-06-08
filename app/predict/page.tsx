import { TEAMS } from "@/lib/teams";
import CompareClient from "@/components/CompareClient";

export const metadata = {
  title: "Match Predictor · World Cup Elo",
  description:
    "Predict any national-team matchup. Win, draw, and loss probabilities computed from current Elo ratings with optional home advantage.",
};

export default function PredictPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Match <span className="gold-text">Predictor</span>
        </h1>
        <p className="text-zinc-400 mt-2">
          Pick any two teams. We compute win / draw / loss probabilities from
          current Elo, with an optional home-advantage adjustment of{" "}
          <span className="text-mono text-zinc-300">+60</span>.
        </p>
      </div>
      <CompareClient teams={TEAMS} />
    </div>
  );
}
