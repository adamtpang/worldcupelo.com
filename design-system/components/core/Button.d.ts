import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md";
  /** Append a → arrow glyph after the label. @default false */
  arrow?: boolean;
  disabled?: boolean;
  /** Render as an anchor instead of a button. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

/**
 * The worldcupelo.com button: gold-gradient primary, glass secondary, ghost.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost button" viewport="700x120"
 */
export function Button(props: ButtonProps): JSX.Element;
