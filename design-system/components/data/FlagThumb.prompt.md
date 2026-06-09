**FlagThumb** — a national flag (from flagcdn) rendered as a rounded rectangle with the signature `ring-1 white/10`. The brand's primary "icon."

```jsx
<FlagThumb code="ESP" name="Spain" size="xs" />   // table row
<FlagThumb code="BRA" name="Brazil" size="lg" lift /> // hero
```

Props: `code` (3-letter team code), `name` (alt text), `size` (xs | sm | md | lg), `lift` (soft shadow). Also exports `flagUrl(code)` and the `ISO2` map.
