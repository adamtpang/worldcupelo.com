import React from "react";

/**
 * Eyebrow — the uppercase, wide-tracked label used above headings and in
 * identity bars. Optional pulsing live dot. Optional gold tone.
 */
export function Eyebrow({ children, live = false, tone = "muted", style, ...rest }) {
  const tones = {
    muted: "var(--text-secondary)",
    dim: "var(--text-tertiary)",
    gold: "var(--wce-gold-300)",
  };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-sans)",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: tones[tone] || tones.muted,
        ...style,
      }}
      {...rest}
    >
      {live && (
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "var(--radius-full)",
            background: "var(--wce-green)",
            animation: "wce-pulse 2s var(--ease-standard) infinite",
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </div>
  );
}
