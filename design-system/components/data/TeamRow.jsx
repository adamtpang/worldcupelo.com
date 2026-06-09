import React from "react";
import { FlagThumb } from "./FlagThumb.jsx";
import { RatingValue } from "./RatingValue.jsx";
import { Chip } from "../core/Chip.jsx";

const TIERS = [
  { min: 2100, label: "Elite", color: "var(--wce-tier-elite)" },
  { min: 2000, label: "World Class", color: "var(--wce-tier-world)" },
  { min: 1900, label: "Top Tier", color: "var(--wce-tier-top)" },
  { min: 1800, label: "Strong", color: "var(--wce-tier-strong)" },
  { min: 1700, label: "Competitive", color: "var(--wce-tier-competitive)" },
  { min: 1600, label: "Developing", color: "var(--wce-tier-developing)" },
  { min: 0, label: "Emerging", color: "var(--wce-tier-emerging)" },
];
function tierOf(r) {
  return TIERS.find((t) => r >= t.min) || TIERS[TIERS.length - 1];
}

/**
 * TeamRow — one rankings line: rank · flag · name (+host/stars) · rating · tier.
 * Composes FlagThumb, RatingValue and Chip. Hover wash like the product table.
 */
export function TeamRow({
  rank,
  code,
  name,
  rating,
  confederation,
  host = false,
  wcTitles = 0,
  showTier = true,
  showConfederation = false,
  onClick,
  href,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tier = tierOf(rating);

  const row = (
    <>
      <span
        className="wce-tabular"
        style={{
          fontFamily: "var(--font-mono)",
          fontVariantNumeric: "tabular-nums",
          color: "var(--text-tertiary)",
          fontSize: "13px",
          width: "32px",
          flexShrink: 0,
        }}
      >
        {rank}
      </span>
      <FlagThumb code={code} name={name} size="sm" />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "14px",
          color: hover ? "var(--wce-gold-300)" : "var(--text-primary)",
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "color var(--duration-base) var(--ease-standard)",
        }}
      >
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {name}
        </span>
        {host && <Chip variant="host">Host</Chip>}
        {wcTitles > 0 && (
          <span style={{ color: "var(--wce-gold-300)", fontSize: "10px", letterSpacing: "1px" }}>
            {"★".repeat(wcTitles)}
          </span>
        )}
      </span>
      {showConfederation && confederation && (
        <Chip variant="confederation" confederation={confederation} />
      )}
      {showTier && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 600,
            color: tier.color,
            width: "92px",
            textAlign: "right",
            flexShrink: 0,
          }}
        >
          {tier.label}
        </span>
      )}
      <RatingValue value={rating} size="sm" style={{ width: "48px", textAlign: "right" }} />
    </>
  );

  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    borderBottom: "1px solid var(--border-faint)",
    background: hover ? "var(--wce-white-02)" : "transparent",
    cursor: onClick || href ? "pointer" : "default",
    transition: "background var(--duration-fast) var(--ease-standard)",
    textDecoration: "none",
    ...style,
  };

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick,
  };

  if (href) {
    return (
      <a href={href} style={baseStyle} {...handlers} {...rest}>
        {row}
      </a>
    );
  }
  return (
    <div style={baseStyle} {...handlers} {...rest}>
      {row}
    </div>
  );
}
