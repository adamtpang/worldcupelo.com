import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-4">⚽</div>
      <h1 className="text-4xl font-black tracking-tight mb-2">
        Off the pitch.
      </h1>
      <p className="text-zinc-400 mb-6">
        That page doesn't exist. Let's get you back to the rankings.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-md text-sm transition"
      >
        ← Home
      </Link>
    </div>
  );
}
