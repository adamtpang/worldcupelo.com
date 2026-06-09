**Button** — the brand's call-to-action; gold-gradient primary for the one main action, glass secondary, ghost for nav/tertiary. Hover/press shift color only (no scale).

```jsx
<Button variant="primary" arrow>World Cup 2026</Button>
<Button variant="secondary">Predict →</Button>
<Button variant="ghost" size="sm">Rankings</Button>
```

Props: `variant` (primary | secondary | ghost), `size` (sm | md), `arrow` (appends →), `href` (renders an `<a>`), `disabled`. Use exactly one primary per view — gold is precious.
