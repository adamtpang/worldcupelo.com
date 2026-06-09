**ProbabilityBar** — the win/draw/loss split bar from the head-to-head view. Feed fractions (0–1); they're normalized. Emerald / zinc / rose.

```jsx
<ProbabilityBar win={0.62} draw={0.21} loss={0.17} showLabels />
```

Props: `win`, `draw`, `loss`, `height`, `showLabels`. Always order them win → draw → loss so the color semantics read left-to-right.
