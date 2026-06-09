import React from "react";

/**
 * Emblem — the worldcupelo mark: a gold coin/ring (trophy + unity) holding
 * three ascending tri-nation bars (rising Elo + the 2026 hosts CAN·MEX·USA),
 * crowned by a gold peak-spark. Original mark — not the official FWC26 emblem.
 */
export function Emblem({ size = 28, style, ...rest }) {
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={style} aria-hidden {...rest}>
      <defs>
        <linearGradient id={`g${id}`} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4D04A" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#B78821" />
        </linearGradient>
        <radialGradient id={`s${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#FFF2C2" />
          <stop offset="1" stopColor="#D4AF37" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#0A0A0B" />
      <circle cx="32" cy="32" r="30" stroke={`url(#g${id})`} strokeWidth="3" />
      <circle cx="32" cy="32" r="25.5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.25" />
      <rect x="17.5" y="32" width="7" height="13" rx="3" fill="#E4002B" />
      <rect x="28.5" y="24" width="7" height="21" rx="3" fill="#2ECC71" />
      <rect x="39.5" y="17" width="7" height="28" rx="3" fill="#3B82F6" />
      <circle cx="43" cy="15" r="4.5" fill={`url(#s${id})`} />
      <rect x="16.5" y="46.5" width="31" height="1.6" rx="0.8" fill="#D4AF37" fillOpacity="0.4" />
    </svg>
  );
}

/**
 * Logo — the worldcupelo lockup: Emblem + wordmark. The wordmark is set in
 * Archivo Expanded (the sporty display face), always lower-case, with "elo"
 * in gradient gold.
 */
export function Logo({ size = "md", emblemOnly = false, style, ...rest }) {
  const sizes = {
    sm: { mark: 24, font: 16 },
    md: { mark: 30, font: 20 },
    lg: { mark: 44, font: 30 },
  };
  const s = sizes[size] || sizes.md;
  if (emblemOnly) return <Emblem size={s.mark} style={style} {...rest} />;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", ...style }} {...rest}>
      <Emblem size={s.mark} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: s.font,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          lineHeight: 1,
        }}
      >
        worldcup
        <span
          style={{
            background: "var(--wce-gradient-gold)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          elo
        </span>
      </span>
    </span>
  );
}
