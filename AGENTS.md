<!-- BEGIN:claude-chat-continuation -->
Claude chat continuation: read `CODEX_CONTINUE_FROM_CLAUDE.md` to resume from the latest local Claude Code sessions for this project.
<!-- END:claude-chat-continuation -->

<!-- BEGIN:claude-codex-sync -->
# Claude/Codex sync

Before making changes, read `CLAUDE.md` in this project if it exists. It is the live handoff from Claude Code and the source of truth for current project progress, design decisions, constraints, and open tasks. Keep future progress updates there so Claude and Codex stay in sync.

If this file contains older project context that conflicts with `CLAUDE.md`, prefer `CLAUDE.md` unless the user says otherwise.
<!-- END:claude-codex-sync -->

<!-- BEGIN:imported-claude-context -->
# Imported Claude context

Copied from `CLAUDE.md` on 2026-07-08 so Codex starts with the same project context Claude Code used. Keep `CLAUDE.md` as the source of truth and refresh this block after meaningful Claude-side progress.

<!-- SOURCE: CLAUDE.md -->

# CLAUDE.md - worldcupelo.com

Context for Claude Code, Codex, and humans working in this folder.

## What this is

This handoff was generated on 2026-07-07 so every top-level Codex project under
`C:\Users\adamp\OneDrive\Aether` has both `CLAUDE.md` and `AGENTS.md`.

No richer Claude handoff was found here during the workspace sync. Treat this file
as a starting point, then inspect the actual code and docs before making changes.

## Detected project facts

- Workspace folder: `worldcupelo.com`
- Git repository: yes
- `package.json`: yes
- Detected stack: Next.js, React, Tailwind, TypeScript, package "worldcupelo"
- Existing context-like files: README.md, readme.md, LAUNCH.md
- Notable top-level files: .gitignore, LAUNCH.md, next-env.d.ts, next.config.mjs, package-lock.json, package.json, postcss.config.mjs, README.md, tailwind.config.ts, tsconfig.json

## How to keep this useful

- If you learn the product purpose, stack, run commands, deployment target, or open
  tasks, update this file.
- Keep `AGENTS.md` synchronized with this file so Codex sessions have the same
  context inline.
- Prefer concrete project facts over generic instructions.

## Imported existing context

Source: `README.md`

```markdown
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
```
<!-- END:imported-claude-context -->
