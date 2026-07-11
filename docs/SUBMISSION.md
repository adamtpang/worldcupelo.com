# Elo Arena: hackathon submission package

TxODDS World Cup Hackathon, July 2026. Copy-paste source for both listings.

- Global track: Consumer & Fan Experiences. Deadline **July 19 2026, 23:59 UTC**.
- Superteam MY NS chapter listing (stacks on global, same project). Deadline **July 20 2026, 23:59 MYT**.

Everything below is grounded in the shipped code: `app/arena/page.tsx`, `app/arena/record/page.tsx`, `app/arena/about/page.tsx`, `app/arena/agent/page.tsx`, `lib/agent.ts`, `lib/txodds.ts`, `lib/tournament.ts`, `lib/picks.ts`.

---

## 1. Submission fields (paste-ready)

### Project title

```
Elo Arena: beat the algorithm, beat the market
```

### Briefly explain your project (150 to 250 words)

```
Elo Arena is a World Cup 2026 pick'em with three players in every match: you, an
Elo rating model, and the betting market.

It lives at worldcupelo.com/arena on live tournament data. The site replays all
104 fixtures chronologically through a World Football Elo engine (logistic
expected score, tournament-weighted K, goal-difference multipliers), so every
match card carries honest pre-match probabilities computed from ratings as they
stood at kickoff, not hindsight. You call home, draw, or away before kickoff;
picks lock and settle on the full-time score. Your accuracy is scored against
the model's accuracy on the exact same matches at /arena/record: one brain
versus one algorithm, same fixtures, same information deadline.

TxODDS TxLINE is the market layer. A single integration module authenticates
with a guest JWT plus hackathon apiToken and pulls 1X2 odds, which the Arena
de-vigs into probabilities shown beside the model's, so users can see exactly
where the algorithm disagrees with the market and pick a side.

The edge story is "Kelly" at /arena/agent: a deterministic paper-trading agent
that replays the tournament, staking fractional-Kelly positions wherever the
Elo model's probability beats the market's implied probability by a threshold.
Bankroll curve, settled positions, live signals on upcoming fixtures, and a
Brier score for model calibration are all on the page. Roadmap: picks and
settlement move on-chain via an Anchor program with trustless TxLINE
validate_stat settlement and devnet play-token stakes.
```

(Word count: about 230. Trim the roadmap sentence if a field caps at 200.)

### Live MVP link

```
https://worldcupelo.com/arena
```

Supporting pages judges will click through: `/arena/record`, `/arena/agent`, `/arena/about`, plus the host site (`/today`, `/match/[slug]`, live rankings).

### Demo video link

```
[PLACEHOLDER: unlisted YouTube link, under 5 minutes. Script in section 2.]
```

### Public repo link

```
[PLACEHOLDER: https://github.com/adamtpang/worldcupelo]
```

Note to self: the standalone extraction repos `worldcupelo-elo` and `elo-arena` are currently **private**. Flip them public before submitting (exact commands in section 4). Decide the canonical repo link after the legacy-project ruling (section 4, item 3).

### Technical documentation

```
Architecture

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind, deployed on Vercel.
Server components throughout the Arena; ISR (revalidate 1800) keeps every page
current with zero client fetching and zero database.

Data flow, three layers:

1. lib/tournament.ts: fetches the openfootball public-domain World Cup 2026
   fixtures feed (ISR 30 min, bundled snapshot fallback), sorts all 104 matches
   chronologically, and backfills live Elo by replaying every finished match
   through the Elo engine in true match order. Each fixture carries pre-match
   probabilities (p1Win / pDraw / p2Win), Elo before/delta, and group standings
   fall out of the same pass.

2. lib/txodds.ts: the single boundary to TxODDS TxLINE. Auth flow per the
   TxLINE quickstart: POST /auth/guest/start returns a guest JWT; every data
   request then sends BOTH headers, Authorization: Bearer <jwt> and
   X-Api-Token: <apiToken>. Endpoints used: GET /odds/1x2?matchId= for 1X2
   market prices (de-vigged to normalized probabilities) and GET /scores?matchId=
   for live/final results. Base: https://txline-dev.txodds.com/api (devnet),
   mainnet switchable via TXODDS_NETWORK. Until the hackathon apiToken is
   provisioned, hasCredentials() is false and callers fall back to Elo-implied
   odds and a clearly labeled simulated market; setting TXODDS_API_TOKEN in env
   flips the whole site to live TxLINE data with no UI changes.

3. lib/agent.ts: "Kelly", the paper-trading agent. Pure deterministic replay
   over the fixture list: for each match it compares Elo probabilities against
   de-vigged 1X2 market probabilities, and when the edge clears minEdge (4%),
   stakes a quarter-Kelly position capped at 10% of bankroll. Positions settle
   on full-time scores; bankroll compounds; it emits open signals for unplayed
   fixtures and a multiclass Brier score for model calibration. No storage, no
   clock, fully reproducible: the same trick as the Elo backfill.

Picks (lib/picks.ts) persist in localStorage behind one module so the on-chain
swap (Anchor picks program, TxLINE validate_stat settlement, devnet play-token
stakes) touches no callers.
```

### Share your team's experience using the TxLINE API

```
The quickstart is genuinely good: the guest-JWT-then-apiToken flow was clear,
and getting a quote is simple once you hold both credentials. The dual-header
scheme (Authorization: Bearer plus X-Api-Token) is unusual but documented, and
the devnet base URL worked as advertised. The on-chain subscription model with
waived hackathon fees is a smart way to demo the Solana-native angle.

Friction, honestly reported. First, hackathon token provisioning was the
biggest blocker: it was not obvious from the docs how or when hackathon teams
receive their apiToken, so we built our integration behind a single module
(lib/txodds.ts) with a labeled simulated-market fallback and shipped without
it. Second, there is no public sandbox odds endpoint usable before token
activation, which means you cannot verify response shapes against real payloads
until you are provisioned; even a static example-response page would have saved
a day. Third, the docs are light on operational details: websocket or push
availability for live odds, rate limits, and pagination are not spelled out,
so we defaulted to conservative polling with 30 to 60 second revalidation.

None of this changed the architecture. Because every TxLINE call is isolated
in one file, activating the token flips the entire product from simulated to
live market data with zero UI changes, which is exactly how we would want to
integrate it in production.
```

---

## 2. Demo video script (under 5 minutes)

Record at 1440p or better, dark browser theme, no bookmarks bar. Calm, precise delivery: a statistician showing you the receipts, not a hype reel. One take per segment is fine; cut on the navigations.

| Time | Shot | Spoken line |
| --- | --- | --- |
| 0:00 | `/arena` hero, cursor still. Live pulse dot and "84/104 matches played" pill visible. | "This is Elo Arena, live on worldcupelo.com, in the middle of the actual World Cup. Round of 16. Every match on this page is real and pickable right now." |
| 0:15 | Scroll to Pickable now. Hover a PickCard, point at the tri-color probability bar. | "Three players in every match. You. An Elo model that has replayed all 104 fixtures in order, so these probabilities are what the ratings said before kickoff, not after. And the market, priced by TxODDS." |
| 0:35 | Click a pick (home / draw / away) on one card. Pick a second match. | "One call per match. Picks lock at kickoff and settle on the full-time score. No spreads, no partial credit. You called it or you did not." |
| 1:00 | Navigate to `/arena/record`. Your accuracy vs the model's, streak counter. | "Here is the honest part. Your accuracy and the model's accuracy, on the same matches, same information deadline. Beating a calibrated rating system over a full tournament is genuinely hard. That is the game." |
| 1:45 | Navigate to `/arena/agent`. Let the bankroll curve land. | "And this is Kelly, the edge story. A deterministic paper-trading agent that replays the tournament and stakes fractional-Kelly positions wherever the Elo model disagrees with the market by more than four percent." |
| 2:10 | Point at the headline stats: bankroll, ROI, hit rate, Brier. | "Quarter-Kelly, capped at ten percent of bankroll per position. Every settled position is on this page: the odds it took, the model's probability, the market's, the edge, the P&L. The Brier score keeps the model itself honest." |
| 2:35 | Scroll to open signals on upcoming fixtures. | "These are its live signals for the next matches. The whole run is a pure replay: no database, no clock, same answer on every build. When the fixtures update, the agent updates." |
| 3:00 | Cut to editor: `lib/txodds.ts`, scrolled to the auth comment block and headers. | "The market layer is TxODDS TxLINE, a Solana-native, cryptographically verifiable sports-data feed. One module is the entire boundary: guest JWT from auth/guest/start, then every request carries the bearer JWT and the X-Api-Token header." |
| 3:20 | Show `getMarketOdds` and `devig`, then `hasCredentials` fallback. | "We pull 1X2 odds, strip the bookmaker margin, and normalize to probabilities. Until the hackathon token is provisioned this falls back to a clearly labeled simulated market, and the judging criteria allow either. Set one environment variable and the entire product flips to live TxLINE prices. No UI changes." |
| 4:00 | Back to browser: `/today`, then a `/match/[slug]` page, point at the Elo swing. | "The Arena sits on a real product. Live rankings, a today page, and a page for every match with the Elo swing it caused, all rebuilt every thirty minutes from the live feed." |
| 4:25 | `/arena/about`, scroll to The road to on-chain. | "Next release: picks and settlement move on-chain. An Anchor program on Solana devnet, settled trustlessly from TxLINE data with validate_stat and Merkle proofs. No admin key decides who won. The feed proves it." |
| 4:45 | Back to `/arena` hero. Hold. | "Elo Arena. You, the model, and the market. Consumer and fan experiences track. Come take your picks." |

---

## 3. Canva pitch deck outline (MY NS requirement)

Eight slides. Dark background, gold accent, tabular numerals for every stat. One idea per slide.

**Slide 1: Elo Arena**
- Beat the algorithm. Beat the market.
- worldcupelo.com/arena, live during World Cup 2026
- TxODDS World Cup Hackathon, Consumer & Fan Experiences (+ Superteam MY)

**Slide 2: The problem**
- Pick'em games are guessing contests with no yardstick
- Fans never learn whether they actually read the game well
- Prediction skill is unmeasurable without a calibrated baseline and a market price

**Slide 3: Three players in every match**
- You: one call, home, draw, or away, locked at kickoff
- The model: World Football Elo, replayed through all 104 fixtures chronologically
- The market: TxODDS TxLINE 1X2 odds, de-vigged into probabilities
- Same matches, same deadline, one scoreboard

**Slide 4: Product tour**
- /arena: every pickable match with model probability bars (screenshot)
- /arena/record: your accuracy vs the model's, plus streaks (screenshot)
- /arena/agent: the Kelly agent's bankroll curve and live signals (screenshot)
- Server-rendered, ISR every 30 minutes, zero database

**Slide 5: TxLINE is the market input**
- Guest JWT (POST /auth/guest/start) + X-Api-Token on every request
- GET /odds/1x2 for prices, GET /scores for settlement, devnet base
- One integration module; one env var flips simulated to live with no UI changes
- Solana-native, cryptographically verifiable feed

**Slide 6: Kelly, the edge agent**
- Deterministic replay: stake where Elo probability beats market probability by 4%+
- Quarter-Kelly sizing, 10% bankroll cap, compounding P&L
- Full audit trail: every position's odds, edge, stake, and result on the page
- Brier score keeps the model honest

**Slide 7: Traction**
- Live at worldcupelo.com since before the tournament: rankings, teams, matches
- 324 statically generated pages, sitemap, OG cards, llms.txt
- Arena shipped mid-tournament on live data, 84 of 104 matches already replayed
- Vercel Analytics wired

**Slide 8: Roadmap + team + ask**
- Anchor picks program on devnet: picks anchored on-chain
- Trustless settlement via TxLINE validate_stat + Merkle proofs, no admin key
- Play-token stakes (devnet, no real wagering)
- Team: Adam Pangelinan, solo, built at Network School build day (Superteam MY)
- Ask: prize + TxLINE production token to run the 2027+ international calendar

---

## 4. Pre-submission checklist

Work top to bottom. Nothing here takes more than an hour except the video.

1. **Flip the extraction repos public** (worldcupelo.com's repo is already public; these two are the fallback packaging sources and are cited from /arena/about):

   ```sh
   gh repo edit adamtpang/worldcupelo-elo --visibility public --accept-visibility-change-consequences
   gh repo edit adamtpang/elo-arena --visibility public --accept-visibility-change-consequences
   ```

   Verify: `gh repo view adamtpang/worldcupelo-elo --json visibility` and same for `elo-arena`.

2. **Record the demo video** from the script in section 2. Under 5 minutes is a hard judging requirement. Upload unlisted to YouTube, paste the link into both listings.

3. **Confirm the legacy-project ruling with @tuakdotsol** (https://t.me/tuakdotsol). The FAQ bans legacy projects; worldcupelo.com predates the hackathon, but the Arena, the picks store, the TxLINE module, and the Kelly agent were all built during it. Ask explicitly whether the consolidated worldcupelo.com/arena submission qualifies. If the answer is no, extract to the standalone repos (`worldcupelo-elo`, `elo-arena`) and submit those instead; the code is already structured for it. Also confirm MY NS build-day eligibility (Network School attendance) and the 1st-prize contradiction in the MY listing (1,000 vs 1,500 USDC).

4. **Provision the TxLINE token**. When the hackathon apiToken lands:

   ```sh
   vercel env add TXODDS_API_TOKEN production
   vercel deploy --prod --yes
   ```

   The CLI deploy matters: the Vercel Git webhook has been broken since commit 702ff96, so pushes do not auto-deploy. Verify on /arena that market bars flip from the simulated label to TxODDS.

5. **Submit to BOTH listings**. The MY NS chapter stacks on global and requires submission to both: the global Consumer & Fan Experiences track (by July 19, 23:59 UTC) and the Superteam MY NS listing (by July 20, 23:59 MYT). MY NS additionally requires the Canva deck (section 3) and the brief tech doc (section 1).

6. **Final sweep**: click every link in the submission from an incognito window (live MVP, repo, video, deck). Confirm /arena, /arena/record, /arena/agent, and /arena/about all render on production with current tournament data.
