**NewsTicker** — the broadcast ticker that sits under the header: a black bar capped by the tri-nation gradient rule, a magenta LIVE pulse, and a seamless gold-middot-separated marquee. Pauses on hover; freezes under reduced-motion.

```jsx
<NewsTicker
  label="LIVE"
  speed={40}
  items={[
    { text: "Spain", value: "2171 ▲4" },
    "Argentina draw 1–1 Brazil",
    { text: "Kickoff in", value: "184d" },
  ]}
/>
```

Props: `items` (strings or `{text, value}` — value renders gold/mono), `label`, `speed` (seconds/loop). Keep items short and numeric — it's a data crawl, not a headline reel.
