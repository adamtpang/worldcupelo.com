// TxODDS TxLINE integration seam (Superteam World Cup hackathon).
//
// TxLINE is a Solana-native, cryptographically verifiable sports-data API.
// Access flow (see https://txline-docs.txodds.com/documentation/quickstart):
//   1. POST /auth/guest/start                 -> guest JWT
//   2. subscribe on-chain (WAIVED for hackathon) then POST /token/activate -> apiToken
//   3. every data request sends BOTH:
//        Authorization: Bearer <jwt>
//        X-Api-Token:   <apiToken>
//
// This module is the single boundary between our app and TxLINE. Until the
// hackathon apiToken is provisioned, `hasCredentials()` is false and callers
// fall back to our own Elo-implied odds (lib/elo). Once TXODDS_API_TOKEN is set
// in env, market odds and official results flow from TxLINE with no UI changes.

const NETWORK = (process.env.TXODDS_NETWORK ?? "devnet").toLowerCase();

export const TXODDS_BASE =
  NETWORK === "mainnet"
    ? "https://txline.txodds.com/api"
    : "https://txline-dev.txodds.com/api";

const API_TOKEN = process.env.TXODDS_API_TOKEN ?? "";

export function hasCredentials(): boolean {
  return API_TOKEN.length > 0;
}

// ---- Types (TxLINE market shape; refined once the live feed is wired) ----
export type TxMarketOdds = {
  matchId: string;
  // decimal odds; win/draw/loss (1X2)
  home: number;
  draw: number;
  away: number;
  // implied probabilities, de-vigged, normalized to sum 1
  pHome: number;
  pDraw: number;
  pAway: number;
  updatedAt: string;
  source: "txodds";
};

export type TxResult = {
  matchId: string;
  homeScore: number;
  awayScore: number;
  status: "in_play" | "finished";
  minute?: number;
  updatedAt: string;
  source: "txodds";
};

// ---- Auth ----
export async function getGuestJwt(): Promise<string | null> {
  try {
    const res = await fetch(`${TXODDS_BASE}/auth/guest/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // guest token is short-lived; do not cache
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { token?: string };
    return data.token ?? null;
  } catch {
    return null;
  }
}

async function authedHeaders(): Promise<Record<string, string> | null> {
  if (!hasCredentials()) return null;
  const jwt = await getGuestJwt();
  if (!jwt) return null;
  return {
    Authorization: `Bearer ${jwt}`,
    "X-Api-Token": API_TOKEN,
    "Content-Type": "application/json",
  };
}

// ---- Data (return null when unprovisioned so callers fall back to Elo) ----

/** De-vigged 1X2 market odds for a fixture, or null if TxLINE is unavailable. */
export async function getMarketOdds(
  matchId: string
): Promise<TxMarketOdds | null> {
  const headers = await authedHeaders();
  if (!headers) return null;
  try {
    // Endpoint path finalized against the live feed once the hackathon token
    // is provisioned; kept isolated here so nothing else changes.
    const res = await fetch(
      `${TXODDS_BASE}/odds/1x2?matchId=${encodeURIComponent(matchId)}`,
      { headers, next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const raw = (await res.json()) as {
      home: number;
      draw: number;
      away: number;
      updatedAt?: string;
    };
    return devig(matchId, raw.home, raw.draw, raw.away, raw.updatedAt);
  } catch {
    return null;
  }
}

/** Latest live/final score for a fixture, or null if unavailable. */
export async function getResult(matchId: string): Promise<TxResult | null> {
  const headers = await authedHeaders();
  if (!headers) return null;
  try {
    const res = await fetch(
      `${TXODDS_BASE}/scores?matchId=${encodeURIComponent(matchId)}`,
      { headers, next: { revalidate: 30 } }
    );
    if (!res.ok) return null;
    const raw = (await res.json()) as {
      homeScore: number;
      awayScore: number;
      status: "in_play" | "finished";
      minute?: number;
      updatedAt?: string;
    };
    return {
      matchId,
      homeScore: raw.homeScore,
      awayScore: raw.awayScore,
      status: raw.status,
      minute: raw.minute,
      updatedAt: raw.updatedAt ?? new Date().toISOString(),
      source: "txodds",
    };
  } catch {
    return null;
  }
}

/** Convert decimal 1X2 odds to normalized, de-vigged probabilities. */
export function devig(
  matchId: string,
  home: number,
  draw: number,
  away: number,
  updatedAt?: string
): TxMarketOdds {
  const rh = 1 / home;
  const rd = 1 / draw;
  const ra = 1 / away;
  const overround = rh + rd + ra;
  return {
    matchId,
    home,
    draw,
    away,
    pHome: rh / overround,
    pDraw: rd / overround,
    pAway: ra / overround,
    updatedAt: updatedAt ?? new Date().toISOString(),
    source: "txodds",
  };
}

// ---- Elo vs market "edge" (the Arena's differentiator) ----
export type EdgeView = {
  // our model
  eloHome: number;
  eloDraw: number;
  eloAway: number;
  // the market (null until TxLINE is provisioned)
  market: TxMarketOdds | null;
  // signed edge on each outcome (elo - market), null without a market
  edgeHome: number | null;
  edgeDraw: number | null;
  edgeAway: number | null;
  // outcome where our model most disagrees with the market
  bestEdge: { outcome: "home" | "draw" | "away"; value: number } | null;
};

export function computeEdge(
  elo: { home: number; draw: number; away: number },
  market: TxMarketOdds | null
): EdgeView {
  if (!market) {
    return {
      eloHome: elo.home,
      eloDraw: elo.draw,
      eloAway: elo.away,
      market: null,
      edgeHome: null,
      edgeDraw: null,
      edgeAway: null,
      bestEdge: null,
    };
  }
  const edgeHome = elo.home - market.pHome;
  const edgeDraw = elo.draw - market.pDraw;
  const edgeAway = elo.away - market.pAway;
  const edges: { outcome: "home" | "draw" | "away"; value: number }[] = [
    { outcome: "home", value: edgeHome },
    { outcome: "draw", value: edgeDraw },
    { outcome: "away", value: edgeAway },
  ];
  const bestEdge = edges.reduce((a, b) =>
    Math.abs(b.value) > Math.abs(a.value) ? b : a
  );
  return {
    eloHome: elo.home,
    eloDraw: elo.draw,
    eloAway: elo.away,
    market,
    edgeHome,
    edgeDraw,
    edgeAway,
    bestEdge,
  };
}
