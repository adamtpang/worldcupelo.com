import React from "react";

export type TickerItem = string | { text: string; value?: string | number };

export interface NewsTickerProps {
  /** Items to scroll. Strings, or { text, value } where value renders in gold mono. */
  items: TickerItem[];
  /** Leading chip label. @default "LIVE" */
  label?: string;
  /** Seconds per full loop (lower = faster). @default 40 */
  speed?: number;
  style?: React.CSSProperties;
}

/**
 * The animated tri-nation news ticker — black bar, gradient rule, LIVE pulse,
 * seamless marquee. Pauses on hover; freezes under prefers-reduced-motion.
 * @startingPoint section="Feedback" subtitle="Tri-nation broadcast news ticker" viewport="900x44"
 */
export function NewsTicker(props: NewsTickerProps): JSX.Element;
