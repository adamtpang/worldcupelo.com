import { TEAMS } from "@/lib/teams";
import CompareClient from "@/components/CompareClient";

export const metadata = {
  title: "Head-to-Head Compare · World Cup Elo",
  description:
    "Compare any two national teams head-to-head. Get win probabilities, expected goals, and rating differentials.",
};

export default function ComparePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
          Head-to-<span className="gold-text">head</span>
        </h1>
        <p className="text-zinc-400 mt-2">
          Pick any two teams. We'll compute the expected outcome from current Elo
          ratings.
        </p>
      </div>
      <CompareClient teams={TEAMS} />
    </div>
  );
}
