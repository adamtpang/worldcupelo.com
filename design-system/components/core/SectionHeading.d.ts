import React from "react";

export interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Right-aligned meta slot (mono), e.g. "Updated · Jun 2026". */
  right?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Standard section header — bold tracked title + muted subtitle. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
