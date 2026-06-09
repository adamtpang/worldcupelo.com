---
name: worldcupelo-design
description: Use this skill to generate well-branded interfaces and assets for World Cup Elo (worldcupelo.com), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **`styles.css`** — link this one file for all tokens + fonts (Inter + JetBrains Mono).
- **`tokens/`** — colors, typography, spacing/radii/shadows, base utilities (`.gold-text`, `.wce-tabular`, `.wce-live-dot`).
- **`components/`** — React primitives: `Button`, `Chip`, `Eyebrow`, `Logo`, `SectionHeading`, `RatingValue`, `StatTile`, `FlagThumb`, `TeamRow`, `ProbabilityBar`. Each has a `.prompt.md` with usage.
- **`guidelines/`** — foundation specimen cards.
- **`ui_kits/worldcupelo/`** — a full interactive recreation of the product to copy patterns from.

## The brand in one breath
Dark-mode broadcast graphics: near-black surface stack (`#0a0a0b → #16161a`), hairline borders, ONE trophy-gold accent (`#d4af37`, often gradient + glow). Inter pushed to 800/900 for display; JetBrains Mono tabular for every number (ratings, ranks, %). Border-driven elevation, almost no shadows. Functional emoji + flags (flagcdn) instead of an icon set. Sentence-case headlines, UPPERCASE tracked eyebrows, the `·` middot as connective tissue. Honest, statistician's voice — odds are always flagged "not a forecast."
