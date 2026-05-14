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

## Data

National team Elo ratings are based on the publicly published [World Football Elo Ratings](https://eloratings.net), the standard for national-team Elo.

## Deploy

This project deploys to Vercel out of the box.

```bash
vercel
```
