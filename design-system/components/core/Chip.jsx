import React from "react";

const CONFEDERATIONS = {
  UEFA: { name: "UEFA", color: "#0066b3", text: "#4d9fe0" },
  CONMEBOL: { name: "CONMEBOL", color: "#febe10", text: "#febe10" },
  CONCACAF: { name: "CONCACAF", color: "#e30613", text: "#f06a72" },
  AFC: { name: "AFC", color: "#003a70", text: "#5a8fc7" },
  CAF: { name: "CAF", color: "#009639", text: "#3cc06f" },
  OFC: { name: "OFC", color: "#0080c0", text: "#3ba3da" },
};

/**
 * Chip — small pill/tag. Three flavors:
 *  - variant="confederation" + confederation="UEFA" → flat-color tint chip
 *  - variant="host"   → gold "Host" tag
 *  - variant="gold" / "neutral" → generic tinted tag
 */
export function Chip({
  children,
  variant = "neutral",
  confederation,
  style,
  ...rest
}) {
  let bg = "var(--wce-white-05)";
  let color = "var(--text-secondary)";

  if (variant === "confederation" && confederation && CONFEDERATIONS[confederation]) {
    const c = CONFEDERATIONS[confederation];
    bg = `color-mix(in srgb, ${c.color} ${confederation === "AFC" ? "22%" : "16%"}, transparent)`;
    color = c.text;
    children = children ?? c.name;
  } else if (variant === "host" || variant === "gold") {
    bg = "var(--wce-gold-soft)";
    color = "var(--wce-gold-300)";
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontFamily: "var(--font-sans)",
        fontSize: "10px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        padding: "2px 8px",
        borderRadius: "var(--radius-md)",
        background: bg,
        color,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
