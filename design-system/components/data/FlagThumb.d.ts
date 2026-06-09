import React from "react";

export declare const ISO2: Record<string, string>;
export declare function flagUrl(code: string): string;

export interface FlagThumbProps {
  /** Team code (3-letter), e.g. "ESP". Mapped to a flagcdn ISO-2 slug. */
  code: string;
  /** Team name for alt text. */
  name?: string;
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg";
  /** Add a soft drop shadow (hero usage). @default false */
  lift?: boolean;
  style?: React.CSSProperties;
}

/** A national flag image with the brand's white-ring rounded-rect frame. */
export function FlagThumb(props: FlagThumbProps): JSX.Element;
