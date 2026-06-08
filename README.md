# worldcupelo.com

Live Elo ratings for men's national football teams. Built for the road to the 2026 World Cup.

🌐 Live at [worldcupelo.com](https://worldcupelo.com)

Inspired by [clubelo.com](https://clubelo.com) and [playerelo.com](https://playerelo.com), but focused on international football.

## Features

- Top 100 national team rankings by Elo
- Per-team pages with peak rating, regional table, and closest rivals
- Head-to-head comparison with win/draw/loss probabilities and home-advantage toggle
- 2026 World Cup hub — hosts, favorites, and confederation contenders
- Methodology explainer

## Stack

- Next.js 15 (App Router, static export friendly)
- React 19
- TypeScript
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

JSON endpoints (no key required):

| Endpoint | Description |
| --- | --- |
| `GET /api/rankings` | All teams. Query: `?confederation=UEFA&limit=50` |
| `GET /api/team/[code]` | Team detail + regional table + win probabilities vs. top sides. e.g. `/api/team/ESP` |
| `GET /api/match/[team1]/[team2]` | Head-to-head prediction. Query: `?venue=home` (adds +60 home Elo) or `?venue=neutral`. e.g. `/api/match/ESP/BRA` |

The Elo engine (`lib/elo.ts`) implements the World Football Elo methodology: logistic expected score, tournament-weighted K, ~+60 home advantage, and goal-difference weighting (GD2 ×1.5, GD3 ×1.75, GD4+ scaled).

## Data

National team Elo ratings are based on the publicly published [World Football Elo Ratings](https://eloratings.net), the standard for national-team Elo.

**Phase 2 (data freshness pipeline — the real moat):** automated recompute after each international window via a match-data API (API-Football or the free Football-Data.org), persisted to Postgres, rebuilding the static ratings. This is what separates an evergreen tracker from a one-off World Cup page.

## Deploy

This project deploys to Vercel out of the box.

```bash
vercel
```
