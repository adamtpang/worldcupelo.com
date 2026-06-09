import React from "react";

export type ConfederationCode =
  | "UEFA" | "CONMEBOL" | "CONCACAF" | "AFC" | "CAF" | "OFC";

export interface ChipProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  variant?: "confederation" | "host" | "gold" | "neutral";
  /** Required when variant="confederation"; also fills the label if no children. */
  confederation?: ConfederationCode;
  style?: React.CSSProperties;
}

/** Small uppercase tag: confederation tint, gold "Host", or neutral. */
export function Chip(props: ChipProps): JSX.Element;
