# Brand assets — World Cup Elo

## The wordmark / logo lockup

There is **no logo image file** in the source repo. The brand mark is built in markup:

- A **28×28px circle** with a gold gradient fill (`from-amber-300 via-amber-500 to-amber-700`, i.e. `--wce-gold-bright → --wce-gold → --wce-gold-deep`), containing the **⚽ emoji** centered.
- Next to it, the wordmark **`worldcupelo`** set in Inter bold (`font-weight: 700`, `~15px`, tracking-tight), where the **`elo`** segment uses the `.wce-gold-text` gradient-clip treatment. The `worldcup` portion is in `--text-primary`.

Reproduce it with the `Logo` markup shown in `guidelines/brand-logo.card.html`, never by drawing new artwork.

## Imagery

The product uses **no photography or illustration**. Its only imagery is:

- **Flags** — SVGs from `https://flagcdn.com/{iso2}.svg`. See the `FlagThumb` component and the `ISO2` map in the README's iconography section. These are loaded at runtime from the CDN (matching production); nothing is vendored here.

## Fonts

Loaded from Google Fonts (`tokens/fonts.css`):
- **Inter** — 400/500/600/700/800/900
- **JetBrains Mono** — 400/500/600/700

Both are free & open-source. To vendor them offline, place `.woff2` files in `assets/fonts/` and add matching `@font-face` rules (the compiler ships any `src: url(...)` it finds in the `styles.css` import closure).
