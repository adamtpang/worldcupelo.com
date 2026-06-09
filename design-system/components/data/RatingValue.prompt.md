**RatingValue** — any Elo number, in JetBrains Mono tabular, gold by default. Use `green`/`red` tones for positive/negative diffs and `glow` for hero ratings.

```jsx
<RatingValue value={2171} size="2xl" glow />
<RatingValue value="+58" size="sm" tone="green" />
```

Props: `value`, `size` (xs…2xl), `tone` (gold | primary | muted | green | red), `glow`. Always feed it raw numbers — the mono/tabular figures are the brand.
