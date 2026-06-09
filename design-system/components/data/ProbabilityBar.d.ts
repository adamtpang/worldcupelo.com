import React from "react";

export interface ProbabilityBarProps {
  /** Win fraction (0–1). Segments are normalized to sum to 1. */
  win: number;
  /** Draw fraction (0–1). */
  draw: number;
  /** Loss fraction (0–1). */
  loss: number;
  /** Bar height in px. @default 12 */
  height?: number;
  /** Show win/draw/loss % above the bar. @default false */
  showLabels?: boolean;
  style?: React.CSSProperties;
}

/** Win/draw/loss tri-segment probability bar (emerald · zinc · rose). */
export function ProbabilityBar(props: ProbabilityBarProps): JSX.Element;
