import React from "react";

export interface StatTileProps {
  /** Uppercase caption, e.g. "Current Elo". */
  label: React.ReactNode;
  value: React.ReactNode;
  /** Small mono sub-note under the value. */
  sub?: React.ReactNode;
  /** @default "primary" */
  accent?: "gold" | "primary";
  /** Larger value type for the headline stat. @default false */
  big?: boolean;
  style?: React.CSSProperties;
}

/** A labelled stat box: uppercase caption + big mono tabular value. */
export function StatTile(props: StatTileProps): JSX.Element;
