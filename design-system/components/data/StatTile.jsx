import React from "react";

/**
 * StatTile — a labelled stat box (Current Elo, Peak, World Rank…).
 * Uppercase caption + big mono tabular value, optional sub note.
 */
export function StatTile({ label, value, sub, accent = "primary", big = false, style, ...rest }) {
  const accents = {
    gold: "var(--wce-gold-300)",
    primary: "var(--text-primary)",
  };
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: "12px 14px",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--text-tertiary)",
        }}
      >
        {label}
      </div>
      <div
        className="wce-tabular"
        style={{
          fontFamily: "var(--font-mono)",
          fontVariantNumeric: "tabular-nums",
          fontWeight: 800,
          fontSize: big ? "36px" : "24px",
          lineHeight: 1,
          marginTop: "6px",
          color: accents[accent] || accents.primary,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--text-tertiary)",
            marginTop: "6px",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
