import React from "react";

export interface EmblemProps {
  /** Pixel size (square). @default 28 */
  size?: number;
  style?: React.CSSProperties;
}

export interface LogoProps {
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render just the emblem, no wordmark. @default false */
  emblemOnly?: boolean;
  style?: React.CSSProperties;
}

/** The worldcupelo coin/ring emblem (gold ring + ascending tri-nation bars + spark). */
export function Emblem(props: EmblemProps): JSX.Element;

/** The worldcupelo lockup: Emblem + Archivo-Expanded wordmark, "elo" in gold. */
export function Logo(props: LogoProps): JSX.Element;
