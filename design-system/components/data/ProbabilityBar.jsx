import React from "react";

/**
 * ProbabilityBar — the win/draw/loss tri-segment bar from the compare view.
 * Pass fractions 0–1 (they're normalized). Emerald · zinc · rose.
 */
export function ProbabilityBar({ win, draw, loss, height = 12, showLabels = false, style, ...rest }) {
  const total = (win || 0) + (draw || 0) + (loss || 0) || 1;
  const w = (win / total) * 100;
  const d = (draw / total) * 100;
  const l = (loss / total) * 100;
  const pct = (n) => `${Math.round((n / total) * 100)}%`;

  return (
    <div style={{ ...style }} {...rest}>
      {showLabels && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 700,
            fontSize: "12px",
            marginBottom: "6px",
          }}
        >
          <span style={{ color: "var(--wce-green-text)" }}>{pct(win)}</span>
          <span style={{ color: "var(--text-secondary)" }}>{pct(draw)}</span>
          <span style={{ color: "var(--wce-red-text)" }}>{pct(loss)}</span>
        </div>
      )}
      <div
        style={{
          display: "flex",
          height,
          borderRadius: "var(--radius-full)",
          overflow: "hidden",
          background: "var(--surface-inset)",
        }}
      >
        <div style={{ width: `${w}%`, background: "var(--wce-green)" }} title="Win" />
        <div style={{ width: `${d}%`, background: "#71717a" }} title="Draw" />
        <div style={{ width: `${l}%`, background: "var(--wce-rose)" }} title="Loss" />
      </div>
    </div>
  );
}
