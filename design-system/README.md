# World Cup Elo — Design System

A complete brand & UI design system for **[worldcupelo.com](https://worldcupelo.com)** — live Elo ratings for every men's national football team, built for the road to the 2026 World Cup.

> This project is consumed by design agents to generate on-brand interfaces, decks, and mocks for World Cup Elo. Link `styles.css` for tokens + fonts; import components from the compiled bundle under the `window.WorldCupEloDesignSystem_6a6b1a` namespace.

---

## Quickstart (for agents)

```html
<!-- 1. tokens + fonts (Inter + JetBrains Mono) -->
<link rel="stylesheet" href="styles.css" />
<!-- 2. the generated component bundle (relative to project root) -->
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, TeamRow, RatingValue, FlagThumb, Chip } =
    window.WorldCupEloDesignSystem_6a6b1a;
</script>
```

Available now: **5 token files** (colors, typography, spacing, fonts, base), **13 components** (`Button`, `Chip`, `Eyebrow`, `Logo`, `Emblem`, `SectionHeading`, `RatingValue`, `StatTile`, `FlagThumb`, `TeamRow`, `ProbabilityBar`, `NewsTicker`), **21 specimen cards**, a living **`/styleguide`** page, and a full **UI kit** at `ui_kits/worldcupelo/`. Each component has a sibling `.prompt.md` with usage. Starting points: the `styleguide` reference and the `worldcupelo` app screen.

---

## Design rationale — FWC26 "unity + diversity"

The official 2026 World Cup identity is **black / white / gold** (the trophy-in-"26" emblem) plus a **tri-nation accent system** — one color family per host: **Canada red, Mexico green, USA blue** — under the "We Are 26" idea: *unity through one emblem, diversity through many looks.* This system translates that literally, and fuses it with the **Americas-neon** energy of the user's reference image (electric magenta · cyan · blue on pure black — Shakira-2010 / Waka-Waka spirit). One decision per line:

- **One dark base = unity.** Every surface is the same near-black stack (`#0A0A0B → #16161A`). Consistency *is* the brand; the accents are what vary.
- **Gold = the one unifying accent.** Reserved for ratings and the single primary action — the trophy, present on every screen. Gold is precious; one gold button per view.
- **Tri-nation families = host/context diversity.** Canada red, Mexico green, USA blue (full ramps) tag host nations, regions and matchups. Used as **tints and rules**, never flat fills behind content.
- **Neon layer = the 2026-in-the-Americas spark.** Magenta · cyan · electric-blue (sampled from the reference) power the **news ticker, the LIVE pulse, hover glows, and chart strokes** — seasoning that signals *live, energetic, Americas-nightlife*, on a disciplined data instrument.
- **Archivo Expanded = sporty display voice.** A wide, broadcast-grotesque headline face (The Athletic × FiveThirtyEight energy) over Inter (UI) and JetBrains Mono (tabular numbers).
- **Original emblem, not the FWC26 mark.** A gold coin holding three ascending host-color bars (rising Elo + the three hosts) crowned by a gold spark — meaningful and trademark-safe.
- **Restraint throughout.** It's a data instrument, not a splash: tabular numbers everywhere, border-driven elevation, AA-tuned accent text, motion only where it earns its place.

---

## 1. Product context

**World Cup Elo** is a single-purpose data product: a continuously-updated Elo rating for every men's national football team, presented as a broadcast-grade leaderboard. It was inspired by [clubelo.com](https://clubelo.com) and [playerelo.football](https://playerelo.football) but focuses exclusively on **international** football and the **2026 FIFA World Cup** (the first 48-team tournament, hosted across the USA, Canada, and Mexico).

The whole product is essentially **one hero artifact — the rankings table — surrounded by ways to slice it**:

| Surface | What it is |
| --- | --- |
| **Home / Rankings** | The Top-100 national-team leaderboard. Search + confederation filters. The primary artifact. |
| **Team page** | Per-team detail: current & peak Elo, world rank, win-probability table vs. top sides, closest rivals, regional table, deep links to related sites. |
| **Predict / Compare** | Head-to-head: pick two teams, toggle neutral vs. home (+100 Elo), see win/draw/loss split. |
| **World Cup 2026** | Tournament hub: countdown, hosts, title favorites with naïve odds, strongest contenders by confederation. |
| **Methodology** | Long-form explainer of the Elo formula and rating tiers. |

It also exposes a **public JSON API** (`/api/rankings`, `/api/team/[code]`, `/api/match/[t1]/[t2]`) — the product has an engineer's sensibility: numbers first, no fluff.

### Sources used to build this system
- **GitHub repo (source of truth):** [`adamtpang/worldcupelo.com`](https://github.com/adamtpang/worldcupelo.com) — Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 3. Every token, color, and component here was lifted directly from this codebase (`app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/world-cup-2026/page.tsx`, `app/team/[code]/page.tsx`, `app/methodology/page.tsx`, `components/RankingsTable.tsx`, `components/CompareClient.tsx`, `lib/teams.ts`).
- **Live site:** [worldcupelo.com](https://worldcupelo.com)
- **Data:** [World Football Elo Ratings](https://eloratings.net) (the de facto standard, originally by Bob Runyan). Flag images are served from [flagcdn.com](https://flagcdn.com) as SVGs.

Readers with repo access should explore `adamtpang/worldcupelo.com` directly to ground any new work in the real implementation.

---

## 2. Content fundamentals

How World Cup Elo writes. The voice is **the confident statistician** — precise, lower-case-leaning, allergic to hype, occasionally dry.

- **Tone:** factual, declarative, sports-almanac. States numbers as facts. Never exclaims. No marketing adjectives ("amazing", "revolutionary"). When it editorializes it does so in a clipped, knowing way: *"Capable of beating anyone on the day." "A starting point for conversation, not a forecast."*
- **Person:** mostly **impersonal / third-person** ("Every team carries a single number"). Slides into a light first-person-plural for methodology ("how **we** calculate"). Rarely addresses "you". Never chatty.
- **Casing:**
  - The **wordmark is always lower-case**: `worldcupelo`, with `elo` in gold. Never "WorldCupElo" in running text for the logo.
  - **Eyebrows / labels are UPPERCASE** with wide tracking: `FIFA WORLD CUP 2026`, `LIVE ELO · EVERY MEN'S NATIONAL TEAM`, `RANK #4`, `KICKOFF IN`.
  - Headlines use **sentence case**, not title case: *"National-team Elo ratings"*, *"Strongest contenders by confederation"*, *"Title Favorites"* (the odd Title Case heading exists but sentence case is the norm).
- **Numbers are the content.** Ratings (`2171`), ranks (`#4`), percentages (`62%`), diffs (`+58`, `−35`), countdowns (`184d`), counts (`48 teams`, `104 matches`) — always in **JetBrains Mono, tabular**. Diffs use a real minus sign `−`, not a hyphen. Gold is reserved for the rating number itself.
- **Domain vocabulary:** Elo, rating, peak, tier (Elite / World Class / Top Tier / Strong / Competitive / Developing / Emerging), confederation (UEFA, CONMEBOL, CONCACAF, AFC, CAF, OFC), home advantage, win probability, head-to-head, contenders, favorites, qualifiers, host.
- **Honesty disclaimers** are part of the voice: odds are flagged `*naïve title odds derived from Elo only — not a forecast.*` The brand consistently undercuts its own predictions. This builds trust; keep it.
- **Punctuation:** the **middot `·`** is the brand's connective tissue — used everywhere as a separator (`World Cup Elo · An Elo ratings tracker`, `Rank #4 · UEFA`, `Updated · Jun 2026`). The **em-dash `—`** sets off definitions. The **arrow `→`** ends CTAs ("Predict →").
- **Emoji:** used **functionally, not decoratively** — ⚽ in the logo lockup, 🏆 as a giant low-opacity watermark on the WC hero, 🤝 to mean "draw", ★ to count World Cup titles. Real **flag images** (not emoji) are preferred in dense tables; emoji flags appear only in a few larger cards. Don't sprinkle emoji into prose.
- **Examples of real copy:**
  - *"A continuous rating of every men's national team — match results, opponent strength, and home advantage."*
  - *"The first 48-team World Cup. Three hosts. One trophy."*
  - *"Treat them as a baseline — a starting point for conversation, not a forecast."*
  - *"Each region's strongest side."*

---

## 3. Visual foundations

The aesthetic is **dark-mode broadcast graphics meets financial terminal**. Think a betting/stats overlay rendered for a premium sports app: near-black, dense, tabular, with a single trophy-gold accent doing all the emotional work.

- **Color & mood:** A four-step near-black surface stack — page `#0a0a0b`, elevated `#111113`, card `#16161a`, with hairline borders `#26262c`. The *only* chromatic accent is **trophy gold `#d4af37`**, often rendered as a 135° gradient (`#f4d04a → #d4af37 → #b78821`) clipped to text, with a soft glow (`text-shadow: 0 0 24px rgba(212,175,55,.3)`). Win/loss semantics use emerald `#10b981` and red `#ef4444`. Each confederation has a flat brand color (UEFA blue, CONMEBOL yellow, etc.) used **only as a 10–20% alpha tint** behind a label — never as a fill. The palette is cool/neutral overall, warmed by exactly one gold.
- **Typography:** **Inter** for everything structural, pushed hard to **800/900 (black)** for display headlines with tight tracking (`-0.03em`). **JetBrains Mono** for every number that can change — ratings, ranks, %, countdowns — always `tabular-nums`. Inter runs with stylistic sets `cv02 cv03 cv04 cv11 ss01` on globally. Uppercase eyebrow labels at 10–11px with `0.1–0.18em` tracking are a signature.
- **Backgrounds:** flat near-black, **no photographic imagery**. Occasional **very low-opacity decoration**: dual radial gradients at `~7%` opacity (gold top-left, red bottom-right) behind the home identity bar; a giant 🏆 emoji at `~7%` opacity bleeding off the WC hero; the team's own flag at `~5%` opacity as a watermark on its hero card. The WC hero uses a subtle `from-amber-500/10 via-transparent to-emerald-500/5` gradient wash inside a gold-bordered block. No textures, no noise, no mesh gradients.
- **Borders & cards:** the system is **border-driven, not shadow-driven**. Cards are `--surface-card` (`#16161a`) + a 1px `#26262c` border, rounded `8–16px`. Hover lifts the border to `rgba(255,255,255,.2)` rather than adding shadow. Drop shadows are nearly absent — reserved for the hero flag image (`shadow-lg`) and any popover/dialog. Tables sit inside a single rounded-`lg` card with hairline row dividers (`border` at 50% alpha) and a header eyebrow row.
- **Radii:** restrained. `6px` buttons/inputs/chips, `8px` cards/tables, `12px` feature cards & compare panel, `16px` hero blocks, `2–3px` flag thumbnails, `full` for pills/dots/progress bars.
- **Shadows:** minimal. One soft lift on the hero flag; a custom dark scrollbar; otherwise elevation comes from the surface-stack contrast.
- **Motion:** quiet and quick. `transition` on color/background/border at ~180ms. The only looping animation is the **emerald "live" pulse dot** (opacity in/out). Buttons don't bounce or scale; they shift color. Respect `prefers-reduced-motion`.
- **Hover states:** ghost elements go `bg: rgba(255,255,255,.05) → .10`; text goes `zinc-300/400 → white` or `→ amber-300`; card borders go faint → `white/20` or `amber-500/40`; table rows get a barely-there `rgba(255,255,255,.02)` wash. The gold primary button lightens its gradient (`amber-300→500` becomes `amber-200→400`).
- **Press states:** color-only — the deeper gold stop engages; no scale-down.
- **Transparency & blur:** the sticky header is `--bg/80` + `backdrop-blur-xl`. Tints (confederation chips, gold chips, glass buttons) all use alpha over the dark base. Blur is used **only** for the sticky header.
- **Layout rules:** content is centered in a `max-w-7xl` (1280px) container with `px-4 → sm:px-6` gutters; long-form (methodology) drops to `max-w-3xl`. A `56px` sticky, blurred header; a thin footer pushed down with a big top margin. Dense vertical rhythm — small paddings, `gap-2/3` between chips and cards.
- **Imagery vibe:** the only "imagery" is **flags** (SVG from flagcdn), shown as small `ring-1 ring-white/10` rounded rectangles in tables and large with `shadow-lg` on team heroes. No photos, no illustrations, no 3D. The visual richness is entirely **data + flags + gold**.

---

## 4. Iconography

See [§ Iconography in detail](#iconography-in-detail) below — the short version: **there is no icon library.** The brand deliberately uses **flag images, a few functional emoji, and unicode glyphs** instead of an icon set.

---

## 5. Index / manifest

Root files:
- **`styles.css`** — the entry point consumers link. `@import` lines only.
- **`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`.
- **`assets/`** — brand lockup notes & any vendored imagery (`assets/README.md`).
- **`README.md`** — this file.
- **`SKILL.md`** — Agent-Skills-compatible entry point.

Foundation specimen cards (Design System tab): in `guidelines/` — color, type, spacing, and brand cards.

**Components** (`components/`, namespace `window.WorldCupEloDesignSystem_6a6b1a`):
- `Button` — gold primary / glass secondary / ghost, sizes, with-icon, disabled.
- `Chip` — confederation tint chip, gold "Host" chip, tier label.
- `RatingValue` — the mono/tabular gold rating number, sizes.
- `StatTile` — labelled stat box (Current Elo, Peak, Rank…).
- `FlagThumb` — flagcdn flag image with the standard ring, sizes.
- `TeamRow` — a rankings-table row (rank · flag · name · rating · tier).
- `ProbabilityBar` — win/draw/loss tri-segment bar.
- `SectionHeading` — heading + sub, the standard section header.
- `Eyebrow` — uppercase tracked label, optional live dot.

**UI kits** (`ui_kits/`):
- `ui_kits/worldcupelo/` — interactive recreation: Rankings (home), Team page, Compare/Predict, World Cup 2026 hub, Methodology. See its own `README.md`.

**Living reference:** `styleguide.html` (+ `styleguide.jsx`) — a single page rendering every token and component state with a rationale note per section. Registered as the `styleguide` starting point.

**Foundation cards** (`guidelines/`, shown in the Design System tab): surfaces, gold, text & semantics, confederation tints, rating tiers, **tri-nation hosts, neon energy, gradients** (Colors); display (Inter & **Archivo**), body & eyebrows, mono & tabular (Type); radii, spacing scale, elevation (Spacing); logo lockup, flags & iconography (Brand).

**`SKILL.md`** — Agent-Skills-compatible entry point for downloading this system into Claude Code.

---

## Iconography in detail

The product ships **no icon font and no SVG icon set** — a deliberate, content-first choice. What it uses instead:

- **Flag images** are the primary "icons." They come from **[flagcdn.com](https://flagcdn.com)** as SVGs (`https://flagcdn.com/{iso2}.svg`), keyed off ISO-3166 alpha-2 slugs (home nations use FlagCDN's UK subdivision slugs: `gb-eng`, `gb-sct`, `gb-wls`, `gb-nir`). Rendered as small rounded rectangles (`rounded-[2px]`/`[3px]`) with `ring-1 ring-white/10`; large with `shadow-lg` on team heroes; and as a `~5%`-opacity watermark behind team hero cards. The `flagUrl(code)` + `ISO2` map in `lib/teams.ts` is the source of truth — copied into the `FlagThumb` component.
- **Functional emoji**, used sparingly and only where they carry meaning:
  - The **logo emblem** is now an original SVG mark (`assets/logo-emblem.svg`, and the `Emblem`/`Logo` components) — a gold coin with three ascending tri-nation bars + a gold spark — replacing the earlier ⚽-in-a-disc lockup.
  - 🏆 — giant `~7%`-opacity watermark on the World Cup 2026 hero.
  - 🤝 — represents the "Draw" outcome in the compare view.
  - ★ (U+2605) — repeated to count a nation's World Cup titles (gold).
  - Large emoji flags (`text-5xl`/`text-7xl`) appear in a few big cards (hosts, compare pickers) where a crisp single glyph reads better than an image.
- **Unicode glyphs as UI icons:** `→` (CTA / "view team"), `↗` (external link), `←` (back), `·` (separator middot). No chevron/arrow SVGs.

**Guidance for new work:** do **not** introduce a generic icon library (Lucide, Heroicons, etc.) — it would read as off-brand. Prefer flags, the established functional emoji, and unicode arrows. If a genuinely new UI affordance needs an icon (e.g. a settings gear) and none of the above fits, use a **thin-stroke (1.5px) Lucide** glyph in `--text-tertiary` and **flag the substitution** to the team — but reach for it last.

---

## 6. Caveats / substitutions — read me

- **Display font is a NEW choice, not from the original codebase.** The production site uses only Inter + JetBrains Mono. I added **Archivo Expanded** (free, Google Fonts) as the sporty display face per your brief. If you'd prefer a different sporty face (e.g. Anton, Saira, Oswald) or a licensed one (Druk, Tungsten), say so and I'll swap `--font-archivo` in one place. Fonts load via `@import` in `tokens/fonts.css`; for offline binaries drop `.woff2` in `assets/fonts/` and add `@font-face` rules.
- **The neon palette is my read of your reference image**, which actually scans **magenta + cyan + electric-blue on black** (not the red/yellow you described). I leaned into the image. If you truly want warm red/yellow Waka-Waka tones instead, I can retune the neon layer — it's isolated in `tokens/colors.css`.
- **The logo is an original mark** I designed (no logo existed in the repo and the official FWC26 emblem is trademarked). Happy to iterate on the emblem concept — ball motif, "26" integration, monogram, etc.
- **Tri-nation + neon are seasoning.** Per your constraint, gold and accents stay restrained; the base is a near-black data instrument. Tell me if you want the neon dialed up or down.
- **Flags** depend on the external flagcdn.com CDN (matching production).
