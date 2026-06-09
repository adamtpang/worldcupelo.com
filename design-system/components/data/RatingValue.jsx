import React from "react";

/**
 * RatingValue — an Elo number in JetBrains Mono, tabular, weight-bold.
 * Gold by default (the brand's treatment for the rating itself).
 */
export function RatingValue({ value, size = "md", tone = "gold", glow = false, style, ...rest }) {
  const sizes = {
    xs: "13px",
    sm: "16px",
    md: "20px",
    lg: "28px",
    xl: "36px",
    "2xl": "44px",
  };
  const tones = {
    gold: "var(--wce-gold-300)",
    primary: "var(--text-primary)",
    muted: "var(--text-tertiary)",
    green: "var(--wce-green-text)",
    red: "var(--wce-red-text)",
  };
  return (
    <span
      className="wce-tabular"
      style={{
        fontFamily: "var(--font-mono)",
        fontVariantNumeric: "tabular-nums",
        fontWeight: size === "xl" || size === "2xl" ? 800 : 700,
        fontSize: sizes[size] || sizes.md,
        lineHeight: 1,
        color: tones[tone] || tones.gold,
        textShadow: glow ? "var(--glow-gold)" : "none",
        ...style,
      }}
      {...rest}
    >
      {value}
    </span>
  );
}
