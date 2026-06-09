**TeamRow** — one line of the rankings leaderboard: rank, flag, name (with optional Host chip and World-Cup-title stars), tier label, and gold rating. Composes `FlagThumb`, `RatingValue`, and `Chip`. Stack rows inside a `--surface-card` panel.

```jsx
<TeamRow rank={1} code="ESP" name="Spain" rating={2171} wcTitles={1} href="#" />
<TeamRow rank={21} code="MEX" name="Mexico" rating={1834} confederation="CONCACAF" host showConfederation />
```

Props: `rank`, `code`, `name`, `rating`, `confederation`, `host`, `wcTitles`, `showTier`, `showConfederation`, `href`/`onClick`. Tier is derived from `rating` automatically.
