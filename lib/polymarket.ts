// Polymarket integration (read-only, public Gamma API, no auth).
// Pulls live "World Cup Winner" market prices so the site can show
// real-money market probabilities next to the Elo model's.
// Display-only market data: no trading, no wallet, no order flow.

const EVENT_SLUG = "world-cup-winner";
const GAMMA = "https://gamma-api.polymarket.com";

export type MarketPrice = {
  team: string; // Polymarket's team label, e.g. "Spain"
  code: string | null; // our team code when mappable
  prob: number; // implied probability 0..1 (price of YES)
  url: string; // deep link to the market
};

// Polymarket team labels -> our codes (finals-relevant teams + majors).
const LABEL_TO_CODE: Record<string, string> = {
  Spain: "ESP", France: "FRA", England: "ENG", Argentina: "ARG",
  Brazil: "BRA", Portugal: "POR", Germany: "GER", Netherlands: "NED",
  Norway: "NOR", Italy: "ITA", Belgium: "BEL", Croatia: "CRO",
  Uruguay: "URU", Colombia: "COL", Mexico: "MEX", USA: "USA",
  "United States": "USA", Canada: "CAN", Japan: "JPN", Morocco: "MAR",
  Switzerland: "SUI", Turkey: "TUR", "Türkiye": "TUR", Ecuador: "ECU",
  Senegal: "SEN", Denmark: "DEN", Austria: "AUT", Paraguay: "PAR",
};

type GammaMarket = {
  question?: string;
  groupItemTitle?: string;
  outcomePrices?: string; // JSON-encoded array like '["0.62","0.38"]'
  outcomes?: string; // '["Yes","No"]'
  slug?: string;
  closed?: boolean;
};

type GammaEvent = { slug: string; markets?: GammaMarket[] };

/**
 * Live World Cup winner probabilities from Polymarket, sorted descending.
 * Returns null when the API is unreachable so callers can degrade gracefully.
 * ISR-cached for 15 minutes.
 */
export async function getWinnerMarket(): Promise<MarketPrice[] | null> {
  try {
    const res = await fetch(`${GAMMA}/events?slug=${EVENT_SLUG}`, {
      next: { revalidate: 900 },
    });
    if (!res.ok) return null;
    const events = (await res.json()) as GammaEvent[];
    const ev = events?.[0];
    if (!ev?.markets?.length) return null;

    const prices: MarketPrice[] = [];
    for (const m of ev.markets) {
      const label =
        m.groupItemTitle ??
        m.question?.replace(/^Will |Wins? the .*$/g, "").trim() ??
        null;
      if (!label) continue;
      let prob: number | null = null;
      try {
        const arr = JSON.parse(m.outcomePrices ?? "[]") as string[];
        if (arr.length > 0) prob = parseFloat(arr[0]);
      } catch {
        prob = null;
      }
      if (prob === null || Number.isNaN(prob)) continue;
      prices.push({
        team: label,
        code: LABEL_TO_CODE[label] ?? null,
        prob,
        url: `https://polymarket.com/event/${EVENT_SLUG}`,
      });
    }
    if (!prices.length) return null;
    return prices.sort((a, b) => b.prob - a.prob);
  } catch {
    return null;
  }
}
