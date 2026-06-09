# UI Kit — worldcupelo.com

An interactive, high-fidelity recreation of the worldcupelo.com product, composed from the design system's component primitives (`window.WorldCupEloDesignSystem_6a6b1a`).

## Run
Open `index.html`. It loads `styles.css` (tokens + fonts), the generated `_ds_bundle.js` (components), then the screen scripts.

## Screens (`route` state in `App.jsx`)
- **`home` / Rankings** (`RankingsScreen.jsx`) — the hero artifact: identity bar + the Top-100 leaderboard with live search and confederation filters. Click any team → team page.
- **`team`** (`TeamScreen.jsx`) — per-team detail: flag-watermark hero, stat tiles, win-probability table, closest rivals, regional table.
- **`compare` / Predict** (`CompareScreen.jsx`) — head-to-head: two pickers, neutral/home venue toggle, win/draw/loss split + probability bar.
- **`worldcup`** (`WorldCupScreen.jsx`) — the 2026 hub: 🏆-watermark hero with countdown, host nations, title favorites with naïve odds.
- **`methodology`** (in `App.jsx`) — the Elo explainer (formula + rating tiers).

## Data
`data.js` exposes `window.WCE` — the team list (lifted from `lib/teams.ts`), `CONFEDERATIONS`, `ratingTier`, `winProbability`, and `resultSplit`.

## Notes
- Flags load from flagcdn.com at runtime (matching production).
- This is a cosmetic recreation: navigation and probabilities are real-ish (Elo math is faithful) but there's no backend.
- Every numeric is mono/tabular; the one accent is gold. Hover = color/border shift, never scale.
