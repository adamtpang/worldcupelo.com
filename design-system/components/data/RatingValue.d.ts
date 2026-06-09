import React from "react";

export interface RatingValueProps {
  value: React.ReactNode;
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** @default "gold" */
  tone?: "gold" | "primary" | "muted" | "green" | "red";
  /** Add the soft gold halo (hero ratings). @default false */
  glow?: boolean;
  style?: React.CSSProperties;
}

/** A mono, tabular Elo rating number — gold by default. */
export function RatingValue(props: RatingValueProps): JSX.Element;
