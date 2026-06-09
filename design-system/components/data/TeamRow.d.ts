import React from "react";
import type { ConfederationCode } from "../core/Chip";

export interface TeamRowProps {
  rank: number;
  /** 3-letter team code, e.g. "ESP". */
  code: string;
  name: string;
  rating: number;
  confederation?: ConfederationCode;
  host?: boolean;
  /** Number of World Cup titles → that many gold stars. */
  wcTitles?: number;
  /** Show the rating-tier label. @default true */
  showTier?: boolean;
  /** Show a confederation chip. @default false */
  showConfederation?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  style?: React.CSSProperties;
}

/**
 * One rankings-table line: rank · flag · name (+host/stars) · rating · tier.
 * @startingPoint section="Data" subtitle="A national-team rankings row" viewport="700x60"
 */
export function TeamRow(props: TeamRowProps): JSX.Element;
