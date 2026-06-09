import React from "react";

export interface EyebrowProps {
  children: React.ReactNode;
  /** Show the pulsing emerald "live" dot. @default false */
  live?: boolean;
  /** @default "muted" */
  tone?: "muted" | "dim" | "gold";
  style?: React.CSSProperties;
}

/** Uppercase, wide-tracked eyebrow label with an optional live pulse dot. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
