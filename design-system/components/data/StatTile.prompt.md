**StatTile** — the labelled stat box used on team pages (Current Elo, Peak, World Rank, Confederation). Big mono value over an uppercase caption.

```jsx
<StatTile label="Current Elo" value="2171" accent="gold" big />
<StatTile label="Peak Elo" value="2171" sub="at peak" />
```

Props: `label`, `value`, `sub`, `accent` (gold | primary), `big`. The headline stat gets `accent="gold" big`; the rest stay primary.
