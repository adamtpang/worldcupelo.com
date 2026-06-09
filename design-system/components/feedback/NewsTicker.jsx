import React from "react";

/**
 * NewsTicker — the animated broadcast ticker. A pure-black bar topped by the
 * tri-nation gradient rule, a "LIVE" pulse, and a seamless marquee of items
 * separated by gold middots. Pauses on hover; honors prefers-reduced-motion
 * (the global reset freezes the marquee).
 */
export function NewsTicker({ items = [], label = "LIVE", speed = 40, style, ...rest }) {
  const [paused, setPaused] = React.useState(false);
  const list = items.length ? items : ["No updates"];

  const Run = () => (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        paddingLeft: "24px",
        animation: `wce-marquee ${speed}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      }}
      aria-hidden
    >
      {list.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            {typeof it === "string" ? it : it.text}
            {it && it.value != null && (
              <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color: "var(--wce-gold-300)", fontWeight: 700, marginLeft: "6px" }}>
                {it.value}
              </span>
            )}
          </span>
          <span style={{ color: "var(--wce-gold)", opacity: 0.5, margin: "0 24px" }}>·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      style={{ background: "var(--surface-void)", borderBottom: "1px solid var(--border-default)", position: "relative", ...style }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...rest}
    >
      {/* tri-nation accent rule */}
      <div style={{ height: "2px", width: "100%", background: "var(--wce-gradient-trination)" }} />
      <div style={{ display: "flex", alignItems: "center", height: "var(--ticker-height)", overflow: "hidden" }}>
        {/* LIVE chip */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px", flexShrink: 0,
            padding: "0 14px", height: "100%", background: "var(--surface-void)",
            borderRight: "1px solid var(--border-default)", zIndex: 1,
          }}
        >
          <span className="wce-live-dot" style={{ background: "var(--wce-neon-magenta)", boxShadow: "var(--wce-glow-magenta)" }} />
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>{label}</span>
        </div>
        {/* marquee — duplicated for a seamless loop */}
        <div style={{ display: "flex", overflow: "hidden", flex: 1, maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)" }}>
          <Run />
          <Run />
        </div>
      </div>
    </div>
  );
}
