/* @ds-bundle: {"format":3,"namespace":"WorldCupEloDesignSystem_6a6b1a","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Emblem","sourcePath":"components/core/Logo.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"ISO2","sourcePath":"components/data/FlagThumb.jsx"},{"name":"FlagThumb","sourcePath":"components/data/FlagThumb.jsx"},{"name":"ProbabilityBar","sourcePath":"components/data/ProbabilityBar.jsx"},{"name":"RatingValue","sourcePath":"components/data/RatingValue.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"},{"name":"TeamRow","sourcePath":"components/data/TeamRow.jsx"},{"name":"NewsTicker","sourcePath":"components/feedback/NewsTicker.jsx"}],"sourceHashes":{"components/core/Button.jsx":"6514f4b8f68c","components/core/Chip.jsx":"991a9e817d21","components/core/Eyebrow.jsx":"8bfa071058e3","components/core/Logo.jsx":"6a96daaaca8a","components/core/SectionHeading.jsx":"d80231c6c54c","components/data/FlagThumb.jsx":"f21934c09933","components/data/ProbabilityBar.jsx":"5936ff34d948","components/data/RatingValue.jsx":"56231927acad","components/data/StatTile.jsx":"09de4fdccfa3","components/data/TeamRow.jsx":"4e710a51a9e8","components/feedback/NewsTicker.jsx":"5c217a8179fc","styleguide.jsx":"603618e22107","ui_kits/worldcupelo/App.jsx":"ef24c5b91e8d","ui_kits/worldcupelo/CompareScreen.jsx":"998efd62f777","ui_kits/worldcupelo/Header.jsx":"c9e31a1c5228","ui_kits/worldcupelo/RankingsScreen.jsx":"91662f87076a","ui_kits/worldcupelo/TeamScreen.jsx":"bf92280aae2f","ui_kits/worldcupelo/WorldCupScreen.jsx":"568b94ae3cc5","ui_kits/worldcupelo/data.js":"7f0655546257"},"inlinedExternals":[],"unexposedExports":[{"name":"flagUrl","sourcePath":"components/data/FlagThumb.jsx"}]} */

(() => {

const __ds_ns = (window.WorldCupEloDesignSystem_6a6b1a = window.WorldCupEloDesignSystem_6a6b1a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — worldcupelo.com's button.
 * Variants: primary (trophy-gold gradient, black text), secondary (glass),
 * ghost (transparent → faint white on hover). Sizes: sm, md.
 * Color-only hover/press, no scale. Pass `arrow` to append a → glyph.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  disabled = false,
  href,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "6px 12px",
      fontSize: "12px",
      radius: "var(--radius-md)"
    },
    md: {
      padding: "8px 16px",
      fontSize: "14px",
      radius: "var(--radius-md)"
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-sans)",
    fontWeight: variant === "primary" ? 700 : variant === "secondary" ? 500 : 500,
    fontSize: s.fontSize,
    lineHeight: 1,
    padding: s.padding,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    userSelect: "none"
  };
  const variants = {
    primary: {
      background: "linear-gradient(180deg, var(--wce-gold-bright), var(--wce-gold))",
      color: "#000"
    },
    secondary: {
      background: "var(--wce-white-05)",
      borderColor: "var(--wce-white-10)",
      color: "var(--text-primary)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyles = {
    primary: {
      background: "linear-gradient(180deg, #f6da6a, var(--wce-gold-bright))"
    },
    secondary: {
      background: "var(--wce-white-10)"
    },
    ghost: {
      background: "var(--wce-white-05)",
      color: "var(--text-primary)"
    }
  };
  const composed = {
    ...base,
    ...variants[variant],
    ...(hover && !disabled ? hoverStyles[variant] : null),
    ...style
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, children, arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      opacity: 0.8
    }
  }, "\u2192"));
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: composed,
      onClick: onClick
    }, handlers, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: composed,
    onClick: onClick
  }, handlers, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CONFEDERATIONS = {
  UEFA: {
    name: "UEFA",
    color: "#0066b3",
    text: "#4d9fe0"
  },
  CONMEBOL: {
    name: "CONMEBOL",
    color: "#febe10",
    text: "#febe10"
  },
  CONCACAF: {
    name: "CONCACAF",
    color: "#e30613",
    text: "#f06a72"
  },
  AFC: {
    name: "AFC",
    color: "#003a70",
    text: "#5a8fc7"
  },
  CAF: {
    name: "CAF",
    color: "#009639",
    text: "#3cc06f"
  },
  OFC: {
    name: "OFC",
    color: "#0080c0",
    text: "#3ba3da"
  }
};

/**
 * Chip — small pill/tag. Three flavors:
 *  - variant="confederation" + confederation="UEFA" → flat-color tint chip
 *  - variant="host"   → gold "Host" tag
 *  - variant="gold" / "neutral" → generic tinted tag
 */
function Chip({
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
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the uppercase, wide-tracked label used above headings and in
 * identity bars. Optional pulsing live dot. Optional gold tone.
 */
function Eyebrow({
  children,
  live = false,
  tone = "muted",
  style,
  ...rest
}) {
  const tones = {
    muted: "var(--text-secondary)",
    dim: "var(--text-tertiary)",
    gold: "var(--wce-gold-300)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-sans)",
      fontSize: "11px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: tones[tone] || tones.muted,
      ...style
    }
  }, rest), live && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      borderRadius: "var(--radius-full)",
      background: "var(--wce-green)",
      animation: "wce-pulse 2s var(--ease-standard) infinite",
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Emblem — the worldcupelo mark: a gold coin/ring (trophy + unity) holding
 * three ascending tri-nation bars (rising Elo + the 2026 hosts CAN·MEX·USA),
 * crowned by a gold peak-spark. Original mark — not the official FWC26 emblem.
 */
function Emblem({
  size = 28,
  style,
  ...rest
}) {
  const id = React.useId();
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    style: style,
    "aria-hidden": true
  }, rest), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `g${id}`,
    x1: "8",
    y1: "6",
    x2: "56",
    y2: "58",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#F4D04A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.5",
    stopColor: "#D4AF37"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#B78821"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: `s${id}`,
    cx: "0.5",
    cy: "0.5",
    r: "0.5"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#FFF2C2"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#D4AF37"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: "30",
    fill: "#0A0A0B"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: "30",
    stroke: `url(#g${id})`,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: "25.5",
    stroke: "#D4AF37",
    strokeWidth: "1",
    strokeOpacity: "0.25"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "17.5",
    y: "32",
    width: "7",
    height: "13",
    rx: "3",
    fill: "#E4002B"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "28.5",
    y: "24",
    width: "7",
    height: "21",
    rx: "3",
    fill: "#2ECC71"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "39.5",
    y: "17",
    width: "7",
    height: "28",
    rx: "3",
    fill: "#3B82F6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "43",
    cy: "15",
    r: "4.5",
    fill: `url(#s${id})`
  }), /*#__PURE__*/React.createElement("rect", {
    x: "16.5",
    y: "46.5",
    width: "31",
    height: "1.6",
    rx: "0.8",
    fill: "#D4AF37",
    fillOpacity: "0.4"
  }));
}

/**
 * Logo — the worldcupelo lockup: Emblem + wordmark. The wordmark is set in
 * Archivo Expanded (the sporty display face), always lower-case, with "elo"
 * in gradient gold.
 */
function Logo({
  size = "md",
  emblemOnly = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      mark: 24,
      font: 16
    },
    md: {
      mark: 30,
      font: 20
    },
    lg: {
      mark: 44,
      font: 30
    }
  };
  const s = sizes[size] || sizes.md;
  if (emblemOnly) return /*#__PURE__*/React.createElement(Emblem, _extends({
    size: s.mark,
    style: style
  }, rest));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Emblem, {
    size: s.mark
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: s.font,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      lineHeight: 1
    }
  }, "worldcup", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--wce-gradient-gold)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent"
    }
  }, "elo")));
}
Object.assign(__ds_scope, { Emblem, Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionHeading — the standard section header: bold tracked title + a
 * muted one-line subtitle. Optionally a right-aligned slot (e.g. "Updated · Jun 2026").
 */
function SectionHeading({
  title,
  subtitle,
  size = "md",
  right,
  style,
  ...rest
}) {
  const sizes = {
    sm: "18px",
    md: "24px",
    lg: "30px"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "16px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: sizes[size] || sizes.md,
      letterSpacing: "-0.015em",
      color: "var(--text-primary)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      color: "var(--text-tertiary)"
    }
  }, subtitle)), right && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--text-tertiary)",
      whiteSpace: "nowrap"
    }
  }, right));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/data/FlagThumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ISO 3166-1 alpha-2 slugs for flagcdn (home nations use UK subdivisions).
// Lifted from lib/teams.ts — extend as needed.
const ISO2 = {
  ESP: "es",
  ARG: "ar",
  FRA: "fr",
  ENG: "gb-eng",
  COL: "co",
  BRA: "br",
  POR: "pt",
  NED: "nl",
  CRO: "hr",
  ECU: "ec",
  NOR: "no",
  GER: "de",
  SUI: "ch",
  URU: "uy",
  TUR: "tr",
  JPN: "jp",
  SEN: "sn",
  DEN: "dk",
  ITA: "it",
  BEL: "be",
  MEX: "mx",
  PAR: "py",
  AUT: "at",
  MAR: "ma",
  CAN: "ca",
  UKR: "ua",
  SCO: "gb-sct",
  KOR: "kr",
  RUS: "ru",
  AUS: "au",
  SRB: "rs",
  GRE: "gr",
  IRN: "ir",
  USA: "us",
  PAN: "pa",
  NGA: "ng",
  POL: "pl",
  UZB: "uz",
  CZE: "cz",
  CHI: "cl",
  ALG: "dz",
  WAL: "gb-wls",
  VEN: "ve",
  KVX: "xk",
  PER: "pe",
  HUN: "hu",
  SVN: "si",
  JOR: "jo",
  IRL: "ie",
  SVK: "sk",
  BOL: "bo",
  ALB: "al",
  SWE: "se",
  EGY: "eg",
  GEO: "ge",
  ROU: "ro",
  COD: "cd",
  CIV: "ci",
  CRC: "cr",
  ISR: "il",
  TUN: "tn",
  CMR: "cm",
  NIR: "gb-nir",
  MKD: "mk",
  KSA: "sa",
  MLI: "ml",
  NZL: "nz",
  IRQ: "iq",
  BIH: "ba",
  HON: "hn",
  ISL: "is",
  CPV: "cv"
};

/** Real flag image URL (SVG, scales crisply). */
function flagUrl(code) {
  const iso = ISO2[(code || "").toUpperCase()];
  return iso ? `https://flagcdn.com/${iso}.svg` : "";
}

/**
 * FlagThumb — a national flag as a rounded rect with the brand's white ring.
 * Sizes echo the product: xs (table), sm, md, lg (hero, with soft lift).
 */
function FlagThumb({
  code,
  name,
  size = "sm",
  lift = false,
  style,
  ...rest
}) {
  const sizes = {
    xs: {
      w: 20,
      h: 14,
      r: "var(--radius-xs)"
    },
    sm: {
      w: 24,
      h: 16,
      r: "var(--radius-xs)"
    },
    md: {
      w: 40,
      h: 28,
      r: "var(--radius-sm)"
    },
    lg: {
      w: 80,
      h: 56,
      r: "var(--radius-md)"
    }
  };
  const s = sizes[size] || sizes.sm;
  const url = flagUrl(code);
  return /*#__PURE__*/React.createElement("img", _extends({
    src: url,
    alt: name ? `${name} flag` : "",
    loading: "lazy",
    width: s.w,
    height: s.h,
    style: {
      width: s.w,
      height: s.h,
      objectFit: "cover",
      borderRadius: s.r,
      boxShadow: lift ? "var(--ring-faint), var(--shadow-flag)" : "var(--ring-faint)",
      flexShrink: 0,
      display: "block",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { ISO2, flagUrl, FlagThumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/FlagThumb.jsx", error: String((e && e.message) || e) }); }

// components/data/ProbabilityBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProbabilityBar — the win/draw/loss tri-segment bar from the compare view.
 * Pass fractions 0–1 (they're normalized). Emerald · zinc · rose.
 */
function ProbabilityBar({
  win,
  draw,
  loss,
  height = 12,
  showLabels = false,
  style,
  ...rest
}) {
  const total = (win || 0) + (draw || 0) + (loss || 0) || 1;
  const w = win / total * 100;
  const d = draw / total * 100;
  const l = loss / total * 100;
  const pct = n => `${Math.round(n / total * 100)}%`;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), showLabels && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontWeight: 700,
      fontSize: "12px",
      marginBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-green-text)"
    }
  }, pct(win)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, pct(draw)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-red-text)"
    }
  }, pct(loss))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height,
      borderRadius: "var(--radius-full)",
      overflow: "hidden",
      background: "var(--surface-inset)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${w}%`,
      background: "var(--wce-green)"
    },
    title: "Win"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${d}%`,
      background: "#71717a"
    },
    title: "Draw"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${l}%`,
      background: "var(--wce-rose)"
    },
    title: "Loss"
  })));
}
Object.assign(__ds_scope, { ProbabilityBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProbabilityBar.jsx", error: String((e && e.message) || e) }); }

// components/data/RatingValue.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * RatingValue — an Elo number in JetBrains Mono, tabular, weight-bold.
 * Gold by default (the brand's treatment for the rating itself).
 */
function RatingValue({
  value,
  size = "md",
  tone = "gold",
  glow = false,
  style,
  ...rest
}) {
  const sizes = {
    xs: "13px",
    sm: "16px",
    md: "20px",
    lg: "28px",
    xl: "36px",
    "2xl": "44px"
  };
  const tones = {
    gold: "var(--wce-gold-300)",
    primary: "var(--text-primary)",
    muted: "var(--text-tertiary)",
    green: "var(--wce-green-text)",
    red: "var(--wce-red-text)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "wce-tabular",
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontWeight: size === "xl" || size === "2xl" ? 800 : 700,
      fontSize: sizes[size] || sizes.md,
      lineHeight: 1,
      color: tones[tone] || tones.gold,
      textShadow: glow ? "var(--glow-gold)" : "none",
      ...style
    }
  }, rest), value);
}
Object.assign(__ds_scope, { RatingValue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RatingValue.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatTile — a labelled stat box (Current Elo, Peak, World Rank…).
 * Uppercase caption + big mono tabular value, optional sub note.
 */
function StatTile({
  label,
  value,
  sub,
  accent = "primary",
  big = false,
  style,
  ...rest
}) {
  const accents = {
    gold: "var(--wce-gold-300)",
    primary: "var(--text-primary)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: "12px 14px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "10px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--text-tertiary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "wce-tabular",
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontWeight: 800,
      fontSize: big ? "36px" : "24px",
      lineHeight: 1,
      marginTop: "6px",
      color: accents[accent] || accents.primary
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      color: "var(--text-tertiary)",
      marginTop: "6px"
    }
  }, sub));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/data/TeamRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TIERS = [{
  min: 2100,
  label: "Elite",
  color: "var(--wce-tier-elite)"
}, {
  min: 2000,
  label: "World Class",
  color: "var(--wce-tier-world)"
}, {
  min: 1900,
  label: "Top Tier",
  color: "var(--wce-tier-top)"
}, {
  min: 1800,
  label: "Strong",
  color: "var(--wce-tier-strong)"
}, {
  min: 1700,
  label: "Competitive",
  color: "var(--wce-tier-competitive)"
}, {
  min: 1600,
  label: "Developing",
  color: "var(--wce-tier-developing)"
}, {
  min: 0,
  label: "Emerging",
  color: "var(--wce-tier-emerging)"
}];
function tierOf(r) {
  return TIERS.find(t => r >= t.min) || TIERS[TIERS.length - 1];
}

/**
 * TeamRow — one rankings line: rank · flag · name (+host/stars) · rating · tier.
 * Composes FlagThumb, RatingValue and Chip. Hover wash like the product table.
 */
function TeamRow({
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
  const row = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "wce-tabular",
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-tertiary)",
      fontSize: "13px",
      width: "32px",
      flexShrink: 0
    }
  }, rank), /*#__PURE__*/React.createElement(__ds_scope.FlagThumb, {
    code: code,
    name: name,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: "14px",
      color: hover ? "var(--wce-gold-300)" : "var(--text-primary)",
      flex: 1,
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "color var(--duration-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, name), host && /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    variant: "host"
  }, "Host"), wcTitles > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-gold-300)",
      fontSize: "10px",
      letterSpacing: "1px"
    }
  }, "★".repeat(wcTitles))), showConfederation && confederation && /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    variant: "confederation",
    confederation: confederation
  }), showTier && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "11px",
      fontWeight: 600,
      color: tier.color,
      width: "92px",
      textAlign: "right",
      flexShrink: 0
    }
  }, tier.label), /*#__PURE__*/React.createElement(__ds_scope.RatingValue, {
    value: rating,
    size: "sm",
    style: {
      width: "48px",
      textAlign: "right"
    }
  }));
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
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick
  };
  if (href) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: baseStyle
    }, handlers, rest), row);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: baseStyle
  }, handlers, rest), row);
}
Object.assign(__ds_scope, { TeamRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TeamRow.jsx", error: String((e && e.message) || e) }); }

// components/feedback/NewsTicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NewsTicker — the animated broadcast ticker. A pure-black bar topped by the
 * tri-nation gradient rule, a "LIVE" pulse, and a seamless marquee of items
 * separated by gold middots. Pauses on hover; honors prefers-reduced-motion
 * (the global reset freezes the marquee).
 */
function NewsTicker({
  items = [],
  label = "LIVE",
  speed = 40,
  style,
  ...rest
}) {
  const [paused, setPaused] = React.useState(false);
  const list = items.length ? items : ["No updates"];
  const Run = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      flexShrink: 0,
      paddingLeft: "24px",
      animation: `wce-marquee ${speed}s linear infinite`,
      animationPlayState: paused ? "paused" : "running"
    },
    "aria-hidden": true
  }, list.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-flex",
      alignItems: "center",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "13px",
      color: "var(--text-secondary)",
      fontFamily: "var(--font-sans)"
    }
  }, typeof it === "string" ? it : it.text, it && it.value != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      color: "var(--wce-gold-300)",
      fontWeight: 700,
      marginLeft: "6px"
    }
  }, it.value)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-gold)",
      opacity: 0.5,
      margin: "0 24px"
    }
  }, "\xB7"))));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-void)",
      borderBottom: "1px solid var(--border-default)",
      position: "relative",
      ...style
    },
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false)
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "2px",
      width: "100%",
      background: "var(--wce-gradient-trination)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      height: "var(--ticker-height)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      flexShrink: 0,
      padding: "0 14px",
      height: "100%",
      background: "var(--surface-void)",
      borderRight: "1px solid var(--border-default)",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wce-live-dot",
    style: {
      background: "var(--wce-neon-magenta)",
      boxShadow: "var(--wce-glow-magenta)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.16em",
      color: "var(--text-primary)",
      fontFamily: "var(--font-sans)"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      overflow: "hidden",
      flex: 1,
      maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)"
    }
  }, /*#__PURE__*/React.createElement(Run, null), /*#__PURE__*/React.createElement(Run, null))));
}
Object.assign(__ds_scope, { NewsTicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/NewsTicker.jsx", error: String((e && e.message) || e) }); }

// styleguide.jsx
try { (() => {
/* World Cup Elo — living styleguide body. Renders every token + component
   state from the design-system bundle, with a rationale note per section. */
const DS = window.WorldCupEloDesignSystem_6a6b1a;
const {
  Logo,
  Emblem,
  Button,
  Chip,
  Eyebrow,
  SectionHeading,
  RatingValue,
  StatTile,
  FlagThumb,
  TeamRow,
  ProbabilityBar,
  NewsTicker
} = DS;
function Section({
  id,
  kicker,
  title,
  why,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    className: "sg-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-kicker"
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    className: "sg-title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "sg-why"
  }, why), children);
}
function Swatch({
  name,
  hex,
  varName,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sw",
    style: {
      background: `var(${varName})`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "n",
    style: {
      color: dark ? "#000" : "#fff"
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "h",
    style: {
      color: dark ? "#000" : "#fff"
    }
  }, hex));
}
function Card({
  label,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sg-card",
    style: style
  }, label && /*#__PURE__*/React.createElement("div", {
    className: "sg-label"
  }, label), children);
}
const TICKER = [{
  text: "Spain",
  value: "2171 ▲4"
}, {
  text: "Argentina 1–1 Brazil"
}, {
  text: "France climbs to",
  value: "#3"
}, {
  text: "Morocco",
  value: "1806 ▲12"
}, {
  text: "Kickoff in",
  value: "184d"
}];
function App() {
  const [filter, setFilter] = React.useState("ALL");
  const FILTERS = ["ALL", "UEFA", "CONMEBOL", "CONCACAF", "AFC", "CAF", "OFC"];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NewsTicker, {
    label: "LIVE",
    speed: 30,
    items: TICKER
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: "lg"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "sg-h1",
    style: {
      marginTop: 22
    }
  }, "The ", /*#__PURE__*/React.createElement("span", {
    className: "gold-text"
  }, "World Cup Elo"), " system"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      fontSize: 16,
      maxWidth: 720,
      marginTop: 10,
      lineHeight: 1.6
    }
  }, "One disciplined dark base for ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, "unity"), "; gold, tri-nation and neon accents for ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, "diversity"), ". A data instrument for the 2026 World Cup in the Americas \u2014 table-first, numbers-forward, restrained."), /*#__PURE__*/React.createElement("hr", {
    className: "divider",
    style: {
      marginTop: 24
    }
  })), /*#__PURE__*/React.createElement(Section, {
    id: "brand",
    kicker: "01 \xB7 Brand",
    title: "Logo & emblem",
    why: /*#__PURE__*/React.createElement(React.Fragment, null, "The emblem is an original mark \u2014 a ", /*#__PURE__*/React.createElement("b", null, "gold coin"), " (the trophy, our one unifying token) holding three ", /*#__PURE__*/React.createElement("b", null, "ascending bars in the host colors"), " (Canada red, Mexico green, USA blue) that read at once as a rising Elo chart and the three 2026 hosts, capped by a gold peak-spark. It is never the official FWC26 emblem. The wordmark is Archivo Expanded, lower-case, with \u201Celo\u201D in gold.")
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Lockup \u2014 dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      minHeight: 60
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: "lg"
  }))), /*#__PURE__*/React.createElement(Card, {
    label: "On light",
    style: {
      background: "#f5f5f7"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      minHeight: 60
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Emblem, {
    size: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 26,
      letterSpacing: "-0.02em",
      color: "#0a0a0b"
    }
  }, "worldcup", /*#__PURE__*/React.createElement("span", {
    className: "gold-text"
  }, "elo"))))), /*#__PURE__*/React.createElement(Card, {
    label: "Sizes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Logo, {
    size: "md"
  }), /*#__PURE__*/React.createElement(Logo, {
    size: "sm"
  }))), /*#__PURE__*/React.createElement(Card, {
    label: "Emblem only \u2014 favicon / avatar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Emblem, {
    size: 56
  }), /*#__PURE__*/React.createElement(Emblem, {
    size: 40
  }), /*#__PURE__*/React.createElement(Emblem, {
    size: 28
  }))))), /*#__PURE__*/React.createElement(Section, {
    id: "color",
    kicker: "02 \xB7 Color",
    title: "Color system",
    why: /*#__PURE__*/React.createElement(React.Fragment, null, "Near-black surfaces and a near-white text ramp do the structural work; ", /*#__PURE__*/React.createElement("b", null, "gold"), " is the single primary accent, reserved for ratings and the one primary action. The ", /*#__PURE__*/React.createElement("b", null, "tri-nation"), " families and the ", /*#__PURE__*/React.createElement("b", null, "neon"), " layer (magenta \xB7 cyan \xB7 electric-blue, pulled from the Americas-neon reference) are seasoning \u2014 confederation tints, host context, tickers, pulses and chart strokes \u2014 never flat fills behind content.")
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Neutrals \u2014 surface stack & text",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "swrow"
  }, /*#__PURE__*/React.createElement(Swatch, {
    name: "Page",
    hex: "#0A0A0B",
    varName: "--wce-bg"
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "Elevated",
    hex: "#111113",
    varName: "--wce-bg-elevated"
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "Card",
    hex: "#16161A",
    varName: "--wce-bg-card"
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "Border",
    hex: "#26262C",
    varName: "--wce-border"
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "Text",
    hex: "#F5F5F7",
    varName: "--wce-text",
    dark: true
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "Muted",
    hex: "#9CA3AF",
    varName: "--wce-text-muted",
    dark: true
  }))), /*#__PURE__*/React.createElement(Card, {
    label: "Gold \u2014 primary accent (unity / ratings)",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "swrow"
  }, /*#__PURE__*/React.createElement(Swatch, {
    name: "300",
    hex: "#ECC85D",
    varName: "--wce-gold-300",
    dark: true
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "500",
    hex: "#D4AF37",
    varName: "--wce-gold-500",
    dark: true
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "600",
    hex: "#B78821",
    varName: "--wce-gold-600",
    dark: true
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "700",
    hex: "#92651E",
    varName: "--wce-gold-700"
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "800",
    hex: "#7A5220",
    varName: "--wce-gold-800"
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "900",
    hex: "#684520",
    varName: "--wce-gold-900"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Tri-nation hosts (diversity)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swrow",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(Swatch, {
    name: "\uD83C\uDDE8\uD83C\uDDE6 CAN",
    hex: "#E4002B",
    varName: "--wce-can-500"
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "\uD83C\uDDF2\uD83C\uDDFD MEX",
    hex: "#009639",
    varName: "--wce-mex-500"
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "\uD83C\uDDFA\uD83C\uDDF8 USA",
    hex: "#0066B3",
    varName: "--wce-usa-600"
  }))), /*#__PURE__*/React.createElement(Card, {
    label: "Neon energy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swrow",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(Swatch, {
    name: "Magenta",
    hex: "#FD36F5",
    varName: "--wce-neon-magenta",
    dark: true
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "Cyan",
    hex: "#6FF7FF",
    varName: "--wce-neon-cyan",
    dark: true
  }), /*#__PURE__*/React.createElement(Swatch, {
    name: "Blue",
    hex: "#0050FF",
    varName: "--wce-neon-blue"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Semantic \u2014 win / draw / loss + tiers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: "var(--wce-green-text)",
      fontWeight: 800,
      fontSize: 22
    }
  }, "62%"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: "var(--text-secondary)",
      fontWeight: 800,
      fontSize: 22
    }
  }, "21%"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: "var(--wce-red-text)",
      fontWeight: 800,
      fontSize: 22
    }
  }, "17%"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-tier-elite)",
      fontWeight: 700,
      fontSize: 12
    }
  }, "Elite"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-tier-world)",
      fontWeight: 700,
      fontSize: 12
    }
  }, "World"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-tier-top)",
      fontWeight: 700,
      fontSize: 12
    }
  }, "Top"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-tier-strong)",
      fontWeight: 700,
      fontSize: 12
    }
  }, "Strong")))), /*#__PURE__*/React.createElement(Card, {
    label: "Gradients"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14,
      borderRadius: 6,
      background: "var(--wce-gradient-trination)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14,
      borderRadius: 6,
      background: "var(--wce-gradient-neon)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14,
      borderRadius: 6,
      background: "var(--wce-gradient-gold)"
    }
  }))))), /*#__PURE__*/React.createElement(Section, {
    id: "type",
    kicker: "03 \xB7 Type",
    title: "Typography",
    why: /*#__PURE__*/React.createElement(React.Fragment, null, "Three voices: ", /*#__PURE__*/React.createElement("b", null, "Archivo Expanded"), " for sporty broadcast display, ", /*#__PURE__*/React.createElement("b", null, "Inter"), " for legible UI and labels, and ", /*#__PURE__*/React.createElement("b", null, "JetBrains Mono"), " for every number \u2014 always tabular, so ratings and ranks align in a column and never jitter as they update.")
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Display \u2014 Archivo Expanded"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 36,
      letterSpacing: "-0.02em",
      lineHeight: 1.02
    }
  }, "Elo ", /*#__PURE__*/React.createElement("span", {
    className: "gold-text"
  }, "ratings")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 18,
      textTransform: "uppercase",
      marginTop: 8
    }
  }, "We Are 26")), /*#__PURE__*/React.createElement(Card, {
    label: "Body \u2014 Inter + Eyebrow"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    live: true
  }, "Live Elo \xB7 every team"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      fontSize: 14,
      marginTop: 10,
      marginBottom: 0,
      lineHeight: 1.5
    }
  }, "A continuous rating of every men's national team \u2014 results, opponent strength, home advantage.")), /*#__PURE__*/React.createElement(Card, {
    label: "Numbers \u2014 JetBrains Mono, tabular",
    style: {
      gridColumn: "span 2"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 26
    }
  }, /*#__PURE__*/React.createElement(RatingValue, {
    value: 2171,
    size: "2xl",
    glow: true
  }), /*#__PURE__*/React.createElement(RatingValue, {
    value: "+58",
    size: "md",
    tone: "green"
  }), /*#__PURE__*/React.createElement(RatingValue, {
    value: "\u221235",
    size: "md",
    tone: "muted"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: "var(--text-secondary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, "1879 \xB7 #16 \xB7 62%"))))), /*#__PURE__*/React.createElement(Section, {
    id: "space",
    kicker: "04 \xB7 Layout",
    title: "Space, radius & elevation",
    why: /*#__PURE__*/React.createElement(React.Fragment, null, "An 8-pt rhythm with dense paddings keeps the ", /*#__PURE__*/React.createElement("b", null, "rankings table high on the page"), " \u2014 it is the hero artifact. Rounding is restrained (6\u201316px) and elevation is ", /*#__PURE__*/React.createElement("b", null, "border-driven"), ": hover lifts a hairline, not a shadow. The dark surface stack supplies depth.")
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Radii"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, [["6", "--radius-md"], ["8", "--radius-lg"], ["12", "--radius-xl"], ["16", "--radius-2xl"]].map(([n, v]) => /*#__PURE__*/React.createElement("div", {
    key: v,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 44,
      background: "var(--surface-inset)",
      border: "1px solid var(--border-strong)",
      borderRadius: `var(${v})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: "var(--text-tertiary)",
      marginTop: 6
    }
  }, n, "px"))))), /*#__PURE__*/React.createElement(Card, {
    label: "Spacing \u2014 8pt scale"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      alignItems: "flex-end"
    }
  }, [8, 12, 16, 24, 32].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: n,
      background: "var(--wce-gradient-gold)",
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: "var(--text-tertiary)",
      marginTop: 6
    }
  }, n))))))), /*#__PURE__*/React.createElement(Section, {
    id: "components",
    kicker: "05 \xB7 Components",
    title: "Components & states",
    why: /*#__PURE__*/React.createElement(React.Fragment, null, "Primitives compose the product. Hover and press shift ", /*#__PURE__*/React.createElement("b", null, "color and border"), ", never scale; focus shows a neon-cyan ring. One gold primary button per view \u2014 gold is precious.")
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Buttons \u2014 variant \xB7 size \xB7 state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    arrow: true
  }, "World Cup 2026"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Predict \u2192"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Rankings")), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "View team"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    disabled: true
  }, "Disabled"))), /*#__PURE__*/React.createElement(Card, {
    label: "Chips & badges"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Chip, {
    variant: "confederation",
    confederation: "UEFA"
  }), /*#__PURE__*/React.createElement(Chip, {
    variant: "confederation",
    confederation: "CONMEBOL"
  }), /*#__PURE__*/React.createElement(Chip, {
    variant: "confederation",
    confederation: "CAF"
  }), /*#__PURE__*/React.createElement(Chip, {
    variant: "host"
  }, "Host"), /*#__PURE__*/React.createElement(Chip, {
    variant: "gold"
  }, "Qualified"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-gold-300)",
      fontSize: 12
    }
  }, "\u2605\u2605\u2605"))), /*#__PURE__*/React.createElement(Card, {
    label: "Input & segmented filter",
    style: {
      gridColumn: "span 2"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Search teams\u2026",
    style: {
      background: "var(--surface-inset)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "8px 12px",
      color: "var(--text-primary)",
      fontSize: 14,
      fontFamily: "var(--font-sans)",
      minWidth: 200
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, FILTERS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFilter(f),
    style: {
      fontSize: 11,
      fontWeight: 600,
      padding: "6px 10px",
      borderRadius: "var(--radius-md)",
      border: "none",
      cursor: "pointer",
      background: filter === f ? "var(--wce-gold)" : "var(--wce-white-05)",
      color: filter === f ? "#000" : "var(--text-secondary)"
    }
  }, f === "ALL" ? "All" : f)))))), /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Current Elo",
    value: "2171",
    accent: "gold"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Peak Elo",
    value: "2171",
    sub: "at peak"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "World Rank",
    value: "#1"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Confed",
    value: "UEFA"
  })), /*#__PURE__*/React.createElement(Card, {
    label: "Data table \u2014 the hero artifact",
    style: {
      marginBottom: 12,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(TeamRow, {
    rank: 1,
    code: "ESP",
    name: "Spain",
    rating: 2171,
    wcTitles: 1,
    showConfederation: true,
    confederation: "UEFA",
    href: "#"
  }), /*#__PURE__*/React.createElement(TeamRow, {
    rank: 2,
    code: "ARG",
    name: "Argentina",
    rating: 2113,
    wcTitles: 3,
    showConfederation: true,
    confederation: "CONMEBOL",
    href: "#"
  }), /*#__PURE__*/React.createElement(TeamRow, {
    rank: 21,
    code: "MEX",
    name: "Mexico",
    rating: 1834,
    confederation: "CONCACAF",
    host: true,
    showConfederation: true,
    href: "#"
  })), /*#__PURE__*/React.createElement(Card, {
    label: "Win / draw / loss probability bar"
  }, /*#__PURE__*/React.createElement(ProbabilityBar, {
    win: 0.62,
    draw: 0.21,
    loss: 0.17,
    showLabels: true,
    height: 12
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "ticker",
    kicker: "06 \xB7 Motion piece",
    title: "News ticker",
    why: /*#__PURE__*/React.createElement(React.Fragment, null, "The one overtly animated element: a black crawl under the tri-nation rule, fronted by a ", /*#__PURE__*/React.createElement("b", null, "magenta LIVE pulse"), ". It carries rating moves and fixtures. It pauses on hover and freezes entirely under reduced-motion.")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(NewsTicker, {
    label: "LIVE",
    speed: 26,
    items: TICKER
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "motion",
    kicker: "07 \xB7 Motion",
    title: "Motion principles",
    why: /*#__PURE__*/React.createElement(React.Fragment, null, "Subtle, sporty, purposeful. Color/border transitions at ~180ms; the only loops are the ", /*#__PURE__*/React.createElement("b", null, "live pulse"), " and the ticker marquee. No bounces, no parallax. Everything respects ", /*#__PURE__*/React.createElement("b", null, "prefers-reduced-motion"), ".")
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Live pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      minHeight: 30
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wce-live-dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)"
    }
  }, "emerald \xB7 2s"))), /*#__PURE__*/React.createElement(Card, {
    label: "Magenta pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      minHeight: 30
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wce-live-dot",
    style: {
      background: "var(--wce-neon-magenta)",
      boxShadow: "var(--wce-glow-magenta)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)"
    }
  }, "ticker LIVE"))), /*#__PURE__*/React.createElement(Card, {
    label: "Hover = color, not scale"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Hover me")))), /*#__PURE__*/React.createElement(Section, {
    id: "a11y",
    kicker: "08 \xB7 Accessibility",
    title: "Accessibility",
    why: /*#__PURE__*/React.createElement(React.Fragment, null, "Dark-native with ", /*#__PURE__*/React.createElement("b", null, "AA-tuned"), " accent text (the \u201C-text\u201D/\u201C-300\u201D tokens), a visible ", /*#__PURE__*/React.createElement("b", null, "neon-cyan focus ring"), " via :focus-visible, and \u226544px touch targets. Numbers are tabular for scannability; color is never the only signal \u2014 tiers and outcomes also carry labels.")
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Focus-visible ring (Tab to it)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: "var(--wce-white-05)",
      border: "1px solid var(--wce-white-10)",
      color: "var(--text-primary)",
      padding: "10px 16px",
      borderRadius: "var(--radius-md)",
      fontSize: 14,
      cursor: "pointer",
      minHeight: 44
    }
  }, "Focusable"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Focus me",
    style: {
      background: "var(--surface-inset)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "10px 12px",
      color: "var(--text-primary)",
      fontSize: 14,
      minHeight: 44
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    label: "Touch targets \u2265 44px"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    style: {
      minHeight: 44
    }
  }, "44px tall")))), /*#__PURE__*/React.createElement("footer", {
    style: {
      paddingTop: 64,
      color: "var(--text-tertiary)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("hr", {
    className: "divider",
    style: {
      marginBottom: 24
    }
  }), "World Cup Elo design system \xB7 tokens in ", /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "styles.css"), " \xB7 components under ", /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "window.WorldCupEloDesignSystem_6a6b1a"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "styleguide.jsx", error: String((e && e.message) || e) }); }

// ui_kits/worldcupelo/App.jsx
try { (() => {
// App — routes between the worldcupelo surfaces.
const APP_DS = window.WorldCupEloDesignSystem_6a6b1a;
function MethodologyScreen({
  onBack
}) {
  const {
    Eyebrow
  } = APP_DS;
  const Tier = ({
    band,
    label,
    color,
    note
  }) => /*#__PURE__*/React.createElement("li", {
    style: {
      display: "flex",
      gap: "10px",
      alignItems: "baseline",
      padding: "3px 0",
      fontSize: "14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color,
      fontWeight: 700,
      fontFamily: "var(--font-mono)"
    }
  }, band), /*#__PURE__*/React.createElement("span", {
    style: {
      color
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\u2014 ", note));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-prose)",
      margin: "0 auto",
      padding: "40px 24px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      color: "var(--text-tertiary)",
      fontSize: "12px",
      cursor: "pointer",
      marginBottom: "20px",
      padding: 0
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "36px",
      fontWeight: 900,
      letterSpacing: "-0.03em",
      color: "var(--text-primary)"
    }
  }, "Methodology"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-tertiary)",
      marginTop: "8px",
      marginBottom: "32px"
    }
  }, "How national-team Elo ratings work, and what they mean."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "28px",
      color: "var(--text-secondary)",
      lineHeight: 1.65
    }
  }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    style: h2()
  }, "What is Elo?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Elo is a relative skill rating originally developed by physicist Arpad Elo for chess. Every team carries a single number; when two teams play, points flow from the underdog to the favorite based on the result and the gap in ratings beforehand. The system is zero-sum.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    style: h2()
  }, "The formula"), /*#__PURE__*/React.createElement("pre", {
    style: pre()
  }, /*#__PURE__*/React.createElement("code", null, "E_A = 1 / (1 + 10^((R_B \u2212 R_A \u2212 HA) / 400))")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontSize: "13px",
      color: "var(--text-tertiary)"
    }
  }, "Where R_A and R_B are the two teams' ratings and HA is a home-advantage adjustment (typically +100 Elo for the home side, 0 at neutral venues).")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    style: h2()
  }, "Reading the numbers"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  }, /*#__PURE__*/React.createElement(Tier, {
    band: "2100+",
    label: "Elite",
    color: "var(--wce-tier-elite)",
    note: "A top-3 side in the world."
  }), /*#__PURE__*/React.createElement(Tier, {
    band: "2000\u20132099",
    label: "World Class",
    color: "var(--wce-tier-world)",
    note: "Realistic title contenders."
  }), /*#__PURE__*/React.createElement(Tier, {
    band: "1900\u20131999",
    label: "Top Tier",
    color: "var(--wce-tier-top)",
    note: "Capable of beating anyone on the day."
  }), /*#__PURE__*/React.createElement(Tier, {
    band: "1800\u20131899",
    label: "Strong",
    color: "var(--wce-tier-strong)",
    note: "Reliable knockout-round teams."
  }), /*#__PURE__*/React.createElement(Tier, {
    band: "1700\u20131799",
    label: "Competitive",
    color: "var(--wce-tier-competitive)",
    note: "World Cup qualifiers."
  }), /*#__PURE__*/React.createElement(Tier, {
    band: "<1700",
    label: "Developing / Emerging",
    color: "var(--wce-tier-emerging)",
    note: "Regional & emerging programs."
  }))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    style: h2()
  }, "A note on forecasts"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Win probabilities and tournament odds shown here are derived directly from current Elo. They do not account for injuries, recent form, travel fatigue, or stylistic matchups. Treat them as a baseline \u2014 a starting point for conversation, not a forecast."))));
}
function h2() {
  return {
    fontSize: "20px",
    fontWeight: 700,
    color: "var(--text-primary)",
    margin: "0 0 8px",
    letterSpacing: "-0.015em"
  };
}
function pre() {
  return {
    background: "var(--surface-card)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    padding: "16px",
    fontFamily: "var(--font-mono)",
    fontSize: "14px",
    color: "var(--wce-gold-300)",
    overflowX: "auto",
    margin: 0
  };
}
function Footer({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border-default)",
      marginTop: "96px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "32px 24px",
      fontSize: "12px",
      color: "var(--text-tertiary)",
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--text-secondary)"
    }
  }, "World Cup Elo"), " \xB7 An Elo ratings tracker for men's national football teams. Inspired by clubelo.com and playerelo.football."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("methodology"),
    style: fbtn()
  }, "Methodology"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("worldcup"),
    style: fbtn()
  }, "2026 WC"))));
}
function fbtn() {
  return {
    background: "none",
    border: "none",
    color: "var(--text-tertiary)",
    fontSize: "12px",
    cursor: "pointer",
    padding: 0
  };
}
function App() {
  const [route, setRoute] = React.useState("home");
  const [teamCode, setTeamCode] = React.useState(null);
  const navigate = r => {
    setRoute(r);
    window.scrollTo(0, 0);
  };
  const openTeam = code => {
    setTeamCode(code);
    setRoute("team");
    window.scrollTo(0, 0);
  };
  let screen;
  if (route === "team") screen = /*#__PURE__*/React.createElement(TeamScreen, {
    code: teamCode,
    onBack: () => navigate("home"),
    onOpenTeam: openTeam
  });else if (route === "compare") screen = /*#__PURE__*/React.createElement(CompareScreen, null);else if (route === "worldcup") screen = /*#__PURE__*/React.createElement(WorldCupScreen, {
    onOpenTeam: openTeam
  });else if (route === "methodology") screen = /*#__PURE__*/React.createElement(MethodologyScreen, {
    onBack: () => navigate("home")
  });else screen = /*#__PURE__*/React.createElement(RankingsScreen, {
    onOpenTeam: openTeam
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    route: route,
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, screen), /*#__PURE__*/React.createElement(Footer, {
    onNavigate: navigate
  }));
}
window.App = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/worldcupelo/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/worldcupelo/CompareScreen.jsx
try { (() => {
// CompareScreen — head-to-head: two pickers, venue toggle, outcome split + bar.
const CMP_DS = window.WorldCupEloDesignSystem_6a6b1a;
function CompareScreen() {
  const {
    TEAMS,
    resultSplit
  } = window.WCE;
  const {
    FlagThumb,
    RatingValue,
    ProbabilityBar,
    Eyebrow,
    SectionHeading,
    Button
  } = CMP_DS;
  const [codeA, setCodeA] = React.useState("ESP");
  const [codeB, setCodeB] = React.useState("BRA");
  const [neutral, setNeutral] = React.useState(true);
  const teamA = TEAMS.find(t => t.code === codeA);
  const teamB = TEAMS.find(t => t.code === codeB);
  const split = resultSplit(teamA.rating, teamB.rating, neutral ? 0 : 100);
  const Picker = ({
    value,
    onChange
  }) => {
    const team = TEAMS.find(t => t.code === value);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-xl)",
        padding: "20px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "12px"
      }
    }, /*#__PURE__*/React.createElement(FlagThumb, {
      code: team.code,
      name: team.name,
      size: "lg",
      lift: true
    })), /*#__PURE__*/React.createElement("select", {
      value: value,
      onChange: e => onChange(e.target.value),
      style: {
        background: "var(--surface-inset)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        padding: "6px 12px",
        fontSize: "15px",
        fontWeight: 600,
        width: "100%",
        color: "var(--text-primary)",
        fontFamily: "var(--font-sans)",
        cursor: "pointer"
      }
    }, TEAMS.map(t => /*#__PURE__*/React.createElement("option", {
      key: t.code,
      value: t.code
    }, t.name))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "12px"
      }
    }, /*#__PURE__*/React.createElement(RatingValue, {
      value: team.rating,
      size: "lg"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--text-tertiary)",
        fontWeight: 600,
        marginTop: "4px"
      }
    }, "Rank #", team.rank, " \xB7 ", team.confederation));
  };
  const Outcome = ({
    label,
    value,
    color,
    glyph
  }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "24px",
      marginBottom: "4px"
    }
  }, glyph), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--text-tertiary)",
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontWeight: 800,
      fontSize: "40px",
      marginTop: "4px",
      color
    }
  }, Math.round(value * 100), "%"));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-prose)",
      margin: "0 auto",
      padding: "40px 24px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "gold"
  }, "Head-to-head"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "8px 0 28px",
      fontSize: "36px",
      fontWeight: 900,
      letterSpacing: "-0.03em",
      color: "var(--text-primary)"
    }
  }, "Predict any matchup"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      gap: "12px",
      alignItems: "center",
      marginBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement(Picker, {
    value: codeA,
    onChange: setCodeA
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-tertiary)",
      fontFamily: "var(--font-mono)",
      fontSize: "14px"
    }
  }, "vs"), /*#__PURE__*/React.createElement(Picker, {
    value: codeB,
    onChange: setCodeB
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setNeutral(true),
    style: toggle(neutral)
  }, "Neutral venue"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNeutral(false),
    style: toggle(!neutral)
  }, teamA.name, " at home (+100 Elo)")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl)",
      padding: "28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "16px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Outcome, {
    label: `${teamA.name} win`,
    value: split.win,
    color: "var(--wce-green-text)",
    glyph: "\uD83D\uDFE2"
  }), /*#__PURE__*/React.createElement(Outcome, {
    label: "Draw",
    value: split.draw,
    color: "var(--text-secondary)",
    glyph: "\uD83E\uDD1D"
  }), /*#__PURE__*/React.createElement(Outcome, {
    label: `${teamB.name} win`,
    value: split.loss,
    color: "var(--wce-red-text)",
    glyph: "\uD83D\uDD34"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px"
    }
  }, /*#__PURE__*/React.createElement(ProbabilityBar, {
    win: split.win,
    draw: split.draw,
    loss: split.loss,
    height: 12
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "16px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Elo",
    value: teamA.rating
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Difference",
    value: Math.abs(teamA.rating - teamB.rating),
    sub: teamA.rating === teamB.rating ? "even" : teamA.rating > teamB.rating ? `${teamA.name} favored` : `${teamB.name} favored`
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Elo",
    value: teamB.rating
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "11px",
      color: "var(--text-tertiary)",
      marginTop: "12px",
      textAlign: "center"
    }
  }, "Na\xEFve probabilities derived from Elo only \u2014 a starting point for conversation, not a forecast."));
}
function toggle(active) {
  return {
    fontSize: "12px",
    fontWeight: 600,
    padding: "6px 12px",
    borderRadius: "var(--radius-md)",
    border: "none",
    cursor: "pointer",
    transition: "all var(--duration-base)",
    background: active ? "var(--wce-gold)" : "var(--wce-white-05)",
    color: active ? "#000" : "var(--text-secondary)"
  };
}
function Stat({
  label,
  value,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--text-tertiary)",
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontWeight: 700,
      fontSize: "20px",
      marginTop: "4px",
      color: "var(--text-primary)"
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "10px",
      color: "var(--text-tertiary)",
      marginTop: "4px"
    }
  }, sub));
}
window.CompareScreen = CompareScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/worldcupelo/CompareScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/worldcupelo/Header.jsx
try { (() => {
// Header — sticky blurred nav with the worldcupelo lockup.
const {
  Logo: WCELogo
} = window.WorldCupEloDesignSystem_6a6b1a;
function Header({
  route,
  onNavigate,
  kickoffDays
}) {
  const NavLink = ({
    id,
    children
  }) => {
    const active = route === id || id === "rankings" && route === "home";
    const [hover, setHover] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigate(id),
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        background: hover ? "var(--wce-white-05)" : "transparent",
        border: "none",
        color: active ? "var(--text-primary)" : hover ? "var(--text-primary)" : "var(--text-secondary)",
        fontSize: "13px",
        fontWeight: 500,
        padding: "6px 12px",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        transition: "all var(--duration-base) var(--ease-standard)"
      }
    }, children);
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      borderBottom: "1px solid var(--border-default)",
      background: "rgba(10,10,11,0.8)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 24px",
      height: "var(--header-height)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("home"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(WCELogo, {
    size: "md"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement(NavLink, {
    id: "rankings"
  }, "Rankings"), /*#__PURE__*/React.createElement(NavLink, {
    id: "worldcup"
  }, "World Cup 2026"), /*#__PURE__*/React.createElement(NavLink, {
    id: "compare"
  }, "Predict"), /*#__PURE__*/React.createElement(NavLink, {
    id: "methodology"
  }, "Method"))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/worldcupelo/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/worldcupelo/RankingsScreen.jsx
try { (() => {
// RankingsScreen — the home/hero: identity bar + the rankings table.
const RK_DS = window.WorldCupEloDesignSystem_6a6b1a;
function RankingsScreen({
  onOpenTeam
}) {
  const {
    TEAMS,
    CONFEDERATIONS,
    ratingTier
  } = window.WCE;
  const {
    Eyebrow,
    Button,
    SectionHeading,
    FlagThumb,
    Chip,
    RatingValue
  } = RK_DS;
  const [filter, setFilter] = React.useState("ALL");
  const [search, setSearch] = React.useState("");
  const filtered = TEAMS.filter(t => {
    if (filter !== "ALL" && t.confederation !== filter) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const FILTERS = ["ALL", "UEFA", "CONMEBOL", "CONCACAF", "AFC", "CAF", "OFC"];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: "1px solid var(--border-default)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.07,
      backgroundImage: "radial-gradient(circle at 15% 20%, #d4af37 0px, transparent 45%), radial-gradient(circle at 85% 80%, #ef4444 0px, transparent 45%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "24px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    live: true
  }, "Live Elo \xB7 Every men's national team"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "8px 0 0",
      fontSize: "30px",
      fontWeight: 900,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
      color: "var(--text-primary)"
    }
  }, "National-team ", /*#__PURE__*/React.createElement("span", {
    className: "gold-text gold-glow"
  }, "Elo ratings")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      color: "var(--text-tertiary)",
      fontSize: "14px",
      maxWidth: "560px"
    }
  }, "A continuous rating of every men's national team \u2014 match results, opponent strength, and home advantage.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "World Cup 2026 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      background: "rgba(0,0,0,0.2)",
      padding: "2px 6px",
      borderRadius: "4px"
    }
  }, "184d")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    arrow: true
  }, "Predict")))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "24px 24px 40px"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Global Rankings",
    subtitle: `All ${TEAMS.length} men's national teams by Elo rating`,
    right: "Updated \xB7 Jun 2026",
    style: {
      marginBottom: "12px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid var(--border-default)",
      padding: "12px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Search teams\u2026",
    style: {
      background: "var(--surface-inset)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "6px 12px",
      fontSize: "14px",
      color: "var(--text-primary)",
      outline: "none",
      flex: 1,
      minWidth: "140px",
      maxWidth: "280px",
      fontFamily: "var(--font-sans)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "4px",
      marginLeft: "auto"
    }
  }, FILTERS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFilter(f),
    style: {
      fontSize: "11px",
      fontWeight: 600,
      padding: "6px 10px",
      borderRadius: "var(--radius-md)",
      border: "none",
      cursor: "pointer",
      transition: "all var(--duration-base) var(--ease-standard)",
      background: filter === f ? "var(--wce-gold)" : "var(--wce-white-05)",
      color: filter === f ? "#000" : "var(--text-secondary)"
    }
  }, f === "ALL" ? "All" : f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--text-tertiary)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: thL(60)
  }, "Rank"), /*#__PURE__*/React.createElement("th", {
    style: thL()
  }, "Team"), /*#__PURE__*/React.createElement("th", {
    style: thR()
  }, "Elo"), /*#__PURE__*/React.createElement("th", {
    style: thR()
  }, "Peak"), /*#__PURE__*/React.createElement("th", {
    style: thL()
  }, "Confed"), /*#__PURE__*/React.createElement("th", {
    style: thL()
  }, "Tier"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: "1%"
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(t => {
    const tier = ratingTier(t.rating);
    return /*#__PURE__*/React.createElement(Row, {
      key: t.code + t.rank,
      t: t,
      tier: tier,
      onOpenTeam: onOpenTeam,
      FlagThumb: FlagThumb,
      Chip: Chip,
      RatingValue: RatingValue
    });
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    style: {
      textAlign: "center",
      padding: "32px",
      color: "var(--text-tertiary)",
      fontSize: "14px"
    }
  }, "No teams match your search."))))))));
}
function thL(w) {
  return {
    textAlign: "left",
    padding: "8px 12px",
    fontWeight: 500,
    width: w ? w + "px" : undefined
  };
}
function thR() {
  return {
    textAlign: "right",
    padding: "8px 12px",
    fontWeight: 500
  };
}
function Row({
  t,
  tier,
  onOpenTeam,
  FlagThumb,
  Chip,
  RatingValue
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("tr", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderBottom: "1px solid var(--border-faint)",
      background: hover ? "var(--wce-white-02)" : "transparent",
      transition: "background var(--duration-fast)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-tertiary)",
      fontSize: "14px"
    }
  }, t.rank), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenTeam(t.code),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(FlagThumb, {
    code: t.code,
    name: t.name,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: "14px",
      color: hover ? "var(--wce-gold-300)" : "var(--text-primary)",
      transition: "color var(--duration-base)"
    }
  }, t.name), t.host && /*#__PURE__*/React.createElement(Chip, {
    variant: "host"
  }, "Host"), t.wcTitles > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-gold-300)",
      fontSize: "10px"
    }
  }, "★".repeat(t.wcTitles))))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(RatingValue, {
    value: t.rating,
    size: "sm"
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-tertiary)",
      fontSize: "14px"
    }
  }, t.peakRating ?? t.rating), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    variant: "confederation",
    confederation: t.confederation
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      fontSize: "11px",
      fontWeight: 600,
      color: tier.color
    }
  }, tier.label), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenTeam(t.code),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      whiteSpace: "nowrap",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--wce-white-10)",
      background: "var(--wce-white-05)",
      padding: "4px 10px",
      fontSize: "11px",
      fontWeight: 600,
      color: hover ? "var(--wce-gold-200)" : "var(--text-secondary)",
      cursor: "pointer",
      transition: "all var(--duration-base)"
    }
  }, "View ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true
  }, "\u2192"))));
}
window.RankingsScreen = RankingsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/worldcupelo/RankingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/worldcupelo/TeamScreen.jsx
try { (() => {
// TeamScreen — per-team detail: hero, stats, win-prob table, rivals, regional table.
const TS_DS = window.WorldCupEloDesignSystem_6a6b1a;
function TeamScreen({
  code,
  onBack,
  onOpenTeam
}) {
  const {
    TEAMS,
    CONFEDERATIONS,
    ratingTier,
    resultSplit
  } = window.WCE;
  const {
    FlagThumb,
    RatingValue,
    StatTile,
    Chip,
    Eyebrow,
    SectionHeading,
    flagUrl
  } = TS_DS;
  const team = TEAMS.find(t => t.code === code) || TEAMS[0];
  const tier = ratingTier(team.rating);
  const conf = CONFEDERATIONS[team.confederation];
  const peakDiff = (team.peakRating ?? team.rating) - team.rating;
  const sameConf = TEAMS.filter(t => t.confederation === team.confederation && t.code !== team.code).slice(0, 8);
  const rivals = TEAMS.filter(t => t.code !== team.code).map(t => ({
    ...t,
    diff: Math.abs(t.rating - team.rating)
  })).sort((a, b) => a.diff - b.diff).slice(0, 6);
  const opponents = TEAMS.slice(0, 8).filter(t => t.code !== team.code).slice(0, 6);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "24px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      color: "var(--text-tertiary)",
      fontSize: "12px",
      cursor: "pointer",
      marginBottom: "20px",
      padding: 0
    }
  }, "\u2190 Back to rankings"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
      marginBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl)",
      padding: "28px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: flagUrl(team.code),
    alt: "",
    "aria-hidden": true,
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      height: "260px",
      opacity: 0.05,
      transform: "translate(64px,-24px)",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    variant: "confederation",
    confederation: team.confederation
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      color: "var(--text-tertiary)",
      fontFamily: "var(--font-mono)"
    }
  }, "RANK #", team.rank), team.host && /*#__PURE__*/React.createElement(Chip, {
    variant: "host"
  }, "2026 Host")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "16px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(FlagThumb, {
    code: team.code,
    name: team.name,
    size: "lg",
    lift: true
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "48px",
      fontWeight: 900,
      letterSpacing: "-0.03em",
      color: "var(--text-primary)",
      lineHeight: 1
    }
  }, team.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px",
      fontWeight: 600,
      color: tier.color
    }
  }, tier.label), team.wcTitles > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wce-gold-300)",
      fontSize: "14px"
    }
  }, "★".repeat(team.wcTitles), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontSize: "11px"
    }
  }, team.wcTitles, " World Cup", team.wcTitles > 1 ? "s" : ""))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 2"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Current Elo",
    value: team.rating,
    accent: "gold",
    big: true
  })), /*#__PURE__*/React.createElement(StatTile, {
    label: "Peak Elo",
    value: team.peakRating ?? team.rating,
    sub: peakDiff > 0 ? "−" + peakDiff : "at peak"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "World Rank",
    value: "#" + team.rank
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    size: "sm",
    title: "Win probability vs. top opponents",
    style: {
      marginBottom: "12px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--text-tertiary)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "8px 12px",
      fontWeight: 500
    }
  }, "Opponent"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      padding: "8px 12px",
      fontWeight: 500
    }
  }, "Their Elo"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      padding: "8px 12px",
      fontWeight: 500
    }
  }, team.name, " win"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      padding: "8px 12px",
      fontWeight: 500
    }
  }, "Draw"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      padding: "8px 12px",
      fontWeight: 500
    }
  }, "Opp win"))), /*#__PURE__*/React.createElement("tbody", null, opponents.map(opp => {
    const s = resultSplit(team.rating, opp.rating);
    return /*#__PURE__*/React.createElement("tr", {
      key: opp.code,
      style: {
        borderBottom: "1px solid var(--border-faint)"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onOpenTeam(opp.code),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--text-primary)",
        padding: 0,
        fontSize: "14px",
        fontWeight: 500
      }
    }, /*#__PURE__*/React.createElement(FlagThumb, {
      code: opp.code,
      name: opp.name,
      size: "xs"
    }), " ", opp.name)), /*#__PURE__*/React.createElement("td", {
      style: tdNum("var(--text-secondary)")
    }, opp.rating), /*#__PURE__*/React.createElement("td", {
      style: tdNum("var(--wce-green-text)", 700)
    }, Math.round(s.win * 100), "%"), /*#__PURE__*/React.createElement("td", {
      style: tdNum("var(--text-tertiary)")
    }, Math.round(s.draw * 100), "%"), /*#__PURE__*/React.createElement("td", {
      style: tdNum("var(--wce-red-text)")
    }, Math.round(s.loss * 100), "%"));
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    size: "sm",
    title: "Closest rivals (by Elo)",
    style: {
      marginBottom: "12px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)"
    }
  }, rivals.map((r, i) => /*#__PURE__*/React.createElement("button", {
    key: r.code,
    onClick: () => onOpenTeam(r.code),
    style: rowBtn(i, rivals.length)
  }, /*#__PURE__*/React.createElement(FlagThumb, {
    code: r.code,
    name: r.name,
    size: "xs"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      flex: 1,
      textAlign: "left",
      fontSize: "14px"
    }
  }, r.name), /*#__PURE__*/React.createElement(RatingValue, {
    value: r.rating,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "11px",
      width: "44px",
      textAlign: "right",
      color: r.rating > team.rating ? "var(--wce-green-text)" : "var(--text-tertiary)"
    }
  }, r.rating > team.rating ? "+" : "−", Math.abs(r.rating - team.rating)))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    size: "sm",
    title: `${team.confederation} regional table`,
    style: {
      marginBottom: "12px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)"
    }
  }, sameConf.map((r, i) => /*#__PURE__*/React.createElement("button", {
    key: r.code,
    onClick: () => onOpenTeam(r.code),
    style: rowBtn(i, sameConf.length)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      width: "28px",
      textAlign: "left"
    }
  }, "#", r.rank), /*#__PURE__*/React.createElement(FlagThumb, {
    code: r.code,
    name: r.name,
    size: "xs"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      flex: 1,
      textAlign: "left",
      fontSize: "14px"
    }
  }, r.name), /*#__PURE__*/React.createElement(RatingValue, {
    value: r.rating,
    size: "sm"
  })))))));
}
function tdNum(color, weight) {
  return {
    padding: "10px 12px",
    textAlign: "right",
    fontFamily: "var(--font-mono)",
    fontVariantNumeric: "tabular-nums",
    color,
    fontWeight: weight || 400,
    fontSize: "14px"
  };
}
function rowBtn(i, len) {
  return {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    width: "100%",
    background: "none",
    border: "none",
    borderBottom: i < len - 1 ? "1px solid var(--border-faint)" : "none",
    cursor: "pointer",
    color: "var(--text-primary)"
  };
}
window.TeamScreen = TeamScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/worldcupelo/TeamScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/worldcupelo/WorldCupScreen.jsx
try { (() => {
// WorldCupScreen — the 2026 hub: hero + countdown, hosts, title favorites.
const WC_DS = window.WorldCupEloDesignSystem_6a6b1a;
function WorldCupScreen({
  onOpenTeam
}) {
  const {
    TEAMS,
    CONFEDERATIONS
  } = window.WCE;
  const {
    FlagThumb,
    RatingValue,
    Chip,
    Eyebrow,
    SectionHeading
  } = WC_DS;
  const hosts = TEAMS.filter(t => t.host);
  const top16 = TEAMS.slice(0, 16);
  const top16Total = top16.reduce((a, x) => a + Math.pow(10, (x.rating - 1800) / 400), 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, rgba(212,175,55,0.10), transparent 55%, rgba(16,185,129,0.05))",
      border: "1px solid rgba(212,175,55,0.20)",
      borderRadius: "var(--radius-2xl)",
      padding: "40px",
      marginBottom: "40px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      fontSize: "260px",
      lineHeight: 1,
      opacity: 0.07,
      transform: "translate(32px,-48px)",
      userSelect: "none"
    }
  }, "\uD83C\uDFC6"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "gold"
  }, "FIFA World Cup 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "12px 0 0",
      fontSize: "60px",
      fontWeight: 900,
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      color: "var(--text-primary)",
      maxWidth: "760px"
    }
  }, "The first ", /*#__PURE__*/React.createElement("span", {
    className: "gold-text"
  }, "48-team"), " World Cup.", /*#__PURE__*/React.createElement("br", null), "Three hosts. One trophy."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      color: "var(--text-tertiary)",
      maxWidth: "620px",
      fontSize: "15px"
    }
  }, "June 11 \u2013 July 19, 2026 \xB7 Hosted across the United States, Canada, and Mexico. Here's how every contender stacks up by Elo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginTop: "24px"
    }
  }, /*#__PURE__*/React.createElement(HeroStat, {
    label: "Kickoff in",
    value: "184d",
    gold: true
  }), /*#__PURE__*/React.createElement(HeroStat, {
    label: "Teams",
    value: "48"
  }), /*#__PURE__*/React.createElement(HeroStat, {
    label: "Matches",
    value: "104"
  }), /*#__PURE__*/React.createElement(HeroStat, {
    label: "Host cities",
    value: "16"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Host Nations",
    subtitle: "Automatic qualification for hosting.",
    style: {
      marginBottom: "16px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "12px"
    }
  }, hosts.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.code,
    onClick: () => onOpenTeam(t.code),
    style: {
      background: "var(--surface-card)",
      border: "1px solid rgba(212,175,55,0.20)",
      borderRadius: "var(--radius-xl)",
      padding: "20px",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    variant: "host"
  }, "Host"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      color: "var(--text-tertiary)",
      fontFamily: "var(--font-mono)"
    }
  }, "RANK #", t.rank)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(FlagThumb, {
    code: t.code,
    name: t.name,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: "20px",
      color: "var(--text-primary)"
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "2px"
    }
  }, /*#__PURE__*/React.createElement(RatingValue, {
    value: t.rating,
    size: "lg"
  })))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Title Favorites",
    subtitle: "The 16 highest-rated teams in the world right now.",
    style: {
      marginBottom: "16px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--text-tertiary)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "8px 12px",
      fontWeight: 500,
      width: "60px"
    }
  }, "Rank"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "8px 12px",
      fontWeight: 500
    }
  }, "Team"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      padding: "8px 12px",
      fontWeight: 500
    }
  }, "Elo"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      padding: "8px 12px",
      fontWeight: 500
    }
  }, "Title odds*"))), /*#__PURE__*/React.createElement("tbody", null, top16.map((t, i) => {
    const odds = Math.pow(10, (t.rating - 1800) / 400) / top16Total * 100 * 0.85;
    return /*#__PURE__*/React.createElement("tr", {
      key: t.code,
      style: {
        borderBottom: "1px solid var(--border-faint)"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px",
        fontFamily: "var(--font-mono)",
        fontVariantNumeric: "tabular-nums",
        color: "var(--text-tertiary)",
        fontSize: "14px"
      }
    }, i + 1), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onOpenTeam(t.code),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--text-primary)",
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(FlagThumb, {
      code: t.code,
      name: t.name,
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: "14px"
      }
    }, t.name), t.host && /*#__PURE__*/React.createElement(Chip, {
      variant: "host"
    }, "Host"), t.wcTitles > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--wce-gold-300)",
        fontSize: "10px"
      }
    }, "★".repeat(t.wcTitles)))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px",
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement(RatingValue, {
      value: t.rating,
      size: "sm"
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px",
        textAlign: "right",
        fontFamily: "var(--font-mono)",
        fontVariantNumeric: "tabular-nums",
        color: "var(--text-secondary)",
        fontSize: "14px"
      }
    }, odds.toFixed(1), "%"));
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "11px",
      color: "var(--text-tertiary)",
      marginTop: "8px"
    }
  }, "* Na\xEFve title odds derived from Elo only \u2014 not a forecast.")));
}
function HeroStat({
  label,
  value,
  gold
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,0,0,0.3)",
      border: gold ? "1px solid rgba(212,175,55,0.30)" : "1px solid var(--wce-white-10)",
      borderRadius: "var(--radius-lg)",
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontWeight: 700,
      color: gold ? "var(--wce-gold-300)" : "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontWeight: 900,
      fontSize: "24px",
      lineHeight: 1,
      marginTop: "4px",
      color: gold ? "var(--wce-gold-300)" : "var(--text-primary)"
    }
  }, value));
}
window.WorldCupScreen = WorldCupScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/worldcupelo/WorldCupScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/worldcupelo/data.js
try { (() => {
// worldcupelo.com — team data + helpers, lifted from lib/teams.ts.
// Exposed as window.WCE for the UI-kit screens.
(function () {
  const TEAMS = [{
    rank: 1,
    name: "Spain",
    code: "ESP",
    rating: 2171,
    confederation: "UEFA",
    wcTitles: 1,
    peakRating: 2171
  }, {
    rank: 2,
    name: "Argentina",
    code: "ARG",
    rating: 2113,
    confederation: "CONMEBOL",
    wcTitles: 3,
    peakRating: 2148
  }, {
    rank: 3,
    name: "France",
    code: "FRA",
    rating: 2063,
    confederation: "UEFA",
    wcTitles: 2,
    peakRating: 2117
  }, {
    rank: 4,
    name: "England",
    code: "ENG",
    rating: 2042,
    confederation: "UEFA",
    wcTitles: 1,
    peakRating: 2062
  }, {
    rank: 5,
    name: "Colombia",
    code: "COL",
    rating: 1998,
    confederation: "CONMEBOL",
    peakRating: 2024
  }, {
    rank: 6,
    name: "Brazil",
    code: "BRA",
    rating: 1979,
    confederation: "CONMEBOL",
    wcTitles: 5,
    peakRating: 2154
  }, {
    rank: 7,
    name: "Portugal",
    code: "POR",
    rating: 1976,
    confederation: "UEFA",
    peakRating: 2027
  }, {
    rank: 8,
    name: "Netherlands",
    code: "NED",
    rating: 1959,
    confederation: "UEFA",
    peakRating: 2078
  }, {
    rank: 9,
    name: "Croatia",
    code: "CRO",
    rating: 1933,
    confederation: "UEFA",
    peakRating: 1992
  }, {
    rank: 9,
    name: "Ecuador",
    code: "ECU",
    rating: 1933,
    confederation: "CONMEBOL",
    peakRating: 1933
  }, {
    rank: 11,
    name: "Norway",
    code: "NOR",
    rating: 1922,
    confederation: "UEFA",
    peakRating: 1922
  }, {
    rank: 12,
    name: "Germany",
    code: "GER",
    rating: 1910,
    confederation: "UEFA",
    wcTitles: 4,
    peakRating: 2205
  }, {
    rank: 13,
    name: "Switzerland",
    code: "SUI",
    rating: 1897,
    confederation: "UEFA",
    peakRating: 1903
  }, {
    rank: 14,
    name: "Uruguay",
    code: "URU",
    rating: 1890,
    confederation: "CONMEBOL",
    wcTitles: 2,
    peakRating: 2018
  }, {
    rank: 15,
    name: "Turkey",
    code: "TUR",
    rating: 1880,
    confederation: "UEFA",
    peakRating: 1880
  }, {
    rank: 16,
    name: "Japan",
    code: "JPN",
    rating: 1879,
    confederation: "AFC",
    peakRating: 1879
  }, {
    rank: 17,
    name: "Senegal",
    code: "SEN",
    rating: 1869,
    confederation: "CAF",
    peakRating: 1869
  }, {
    rank: 18,
    name: "Denmark",
    code: "DEN",
    rating: 1864,
    confederation: "UEFA",
    peakRating: 1934
  }, {
    rank: 19,
    name: "Italy",
    code: "ITA",
    rating: 1859,
    confederation: "UEFA",
    wcTitles: 4,
    peakRating: 2117
  }, {
    rank: 20,
    name: "Belgium",
    code: "BEL",
    rating: 1849,
    confederation: "UEFA",
    peakRating: 2055
  }, {
    rank: 21,
    name: "Mexico",
    code: "MEX",
    rating: 1834,
    confederation: "CONCACAF",
    host: true,
    qualified: true,
    peakRating: 1875
  }, {
    rank: 22,
    name: "Paraguay",
    code: "PAR",
    rating: 1833,
    confederation: "CONMEBOL",
    peakRating: 1872
  }, {
    rank: 23,
    name: "Austria",
    code: "AUT",
    rating: 1818,
    confederation: "UEFA",
    peakRating: 1880
  }, {
    rank: 24,
    name: "Morocco",
    code: "MAR",
    rating: 1806,
    confederation: "CAF",
    peakRating: 1869
  }, {
    rank: 24,
    name: "Canada",
    code: "CAN",
    rating: 1806,
    confederation: "CONCACAF",
    host: true,
    qualified: true,
    peakRating: 1806
  }, {
    rank: 26,
    name: "Ukraine",
    code: "UKR",
    rating: 1802,
    confederation: "UEFA",
    peakRating: 1830
  }, {
    rank: 27,
    name: "Scotland",
    code: "SCO",
    rating: 1790,
    confederation: "UEFA",
    peakRating: 1830
  }, {
    rank: 28,
    name: "South Korea",
    code: "KOR",
    rating: 1784,
    confederation: "AFC",
    peakRating: 1838
  }, {
    rank: 29,
    name: "Russia",
    code: "RUS",
    rating: 1782,
    confederation: "UEFA",
    peakRating: 1850
  }, {
    rank: 30,
    name: "Australia",
    code: "AUS",
    rating: 1774,
    confederation: "AFC",
    peakRating: 1796
  }, {
    rank: 31,
    name: "Serbia",
    code: "SRB",
    rating: 1769,
    confederation: "UEFA",
    peakRating: 1827
  }, {
    rank: 32,
    name: "Greece",
    code: "GRE",
    rating: 1761,
    confederation: "UEFA",
    peakRating: 1853
  }, {
    rank: 33,
    name: "Iran",
    code: "IRN",
    rating: 1754,
    confederation: "AFC",
    peakRating: 1797
  }, {
    rank: 34,
    name: "United States",
    code: "USA",
    rating: 1747,
    confederation: "CONCACAF",
    host: true,
    qualified: true,
    peakRating: 1810
  }, {
    rank: 35,
    name: "Panama",
    code: "PAN",
    rating: 1743,
    confederation: "CONCACAF",
    peakRating: 1755
  }, {
    rank: 36,
    name: "Nigeria",
    code: "NGA",
    rating: 1739,
    confederation: "CAF",
    peakRating: 1801
  }, {
    rank: 37,
    name: "Poland",
    code: "POL",
    rating: 1735,
    confederation: "UEFA",
    peakRating: 1841
  }, {
    rank: 37,
    name: "Uzbekistan",
    code: "UZB",
    rating: 1735,
    confederation: "AFC",
    peakRating: 1735
  }, {
    rank: 39,
    name: "Czechia",
    code: "CZE",
    rating: 1731,
    confederation: "UEFA",
    peakRating: 1907
  }, {
    rank: 39,
    name: "Chile",
    code: "CHI",
    rating: 1731,
    confederation: "CONMEBOL",
    peakRating: 1939
  }, {
    rank: 41,
    name: "Algeria",
    code: "ALG",
    rating: 1728,
    confederation: "CAF",
    peakRating: 1809
  }, {
    rank: 42,
    name: "Wales",
    code: "WAL",
    rating: 1715,
    confederation: "UEFA",
    peakRating: 1768
  }, {
    rank: 42,
    name: "Venezuela",
    code: "VEN",
    rating: 1715,
    confederation: "CONMEBOL",
    peakRating: 1715
  }, {
    rank: 44,
    name: "Kosovo",
    code: "KVX",
    rating: 1714,
    confederation: "UEFA",
    peakRating: 1714
  }, {
    rank: 45,
    name: "Peru",
    code: "PER",
    rating: 1708,
    confederation: "CONMEBOL",
    peakRating: 1815
  }, {
    rank: 46,
    name: "Hungary",
    code: "HUN",
    rating: 1698,
    confederation: "UEFA",
    peakRating: 1969
  }, {
    rank: 47,
    name: "Slovenia",
    code: "SVN",
    rating: 1695,
    confederation: "UEFA",
    peakRating: 1700
  }, {
    rank: 48,
    name: "Jordan",
    code: "JOR",
    rating: 1691,
    confederation: "AFC",
    peakRating: 1691
  }, {
    rank: 49,
    name: "Ireland",
    code: "IRL",
    rating: 1688,
    confederation: "UEFA",
    peakRating: 1814
  }, {
    rank: 50,
    name: "Slovakia",
    code: "SVK",
    rating: 1687,
    confederation: "UEFA",
    peakRating: 1740
  }, {
    rank: 51,
    name: "Bolivia",
    code: "BOL",
    rating: 1665,
    confederation: "CONMEBOL",
    peakRating: 1814
  }, {
    rank: 52,
    name: "Albania",
    code: "ALB",
    rating: 1664,
    confederation: "UEFA",
    peakRating: 1664
  }, {
    rank: 53,
    name: "Sweden",
    code: "SWE",
    rating: 1660,
    confederation: "UEFA",
    peakRating: 1881
  }, {
    rank: 53,
    name: "Egypt",
    code: "EGY",
    rating: 1660,
    confederation: "CAF",
    peakRating: 1735
  }, {
    rank: 55,
    name: "Georgia",
    code: "GEO",
    rating: 1650,
    confederation: "UEFA",
    peakRating: 1660
  }, {
    rank: 56,
    name: "Romania",
    code: "ROU",
    rating: 1642,
    confederation: "UEFA",
    peakRating: 1842
  }, {
    rank: 57,
    name: "DR Congo",
    code: "COD",
    rating: 1639,
    confederation: "CAF",
    peakRating: 1684
  }, {
    rank: 58,
    name: "Ivory Coast",
    code: "CIV",
    rating: 1637,
    confederation: "CAF",
    peakRating: 1786
  }, {
    rank: 59,
    name: "Costa Rica",
    code: "CRC",
    rating: 1632,
    confederation: "CONCACAF",
    peakRating: 1722
  }, {
    rank: 60,
    name: "Israel",
    code: "ISR",
    rating: 1631,
    confederation: "UEFA",
    peakRating: 1701
  }, {
    rank: 61,
    name: "Tunisia",
    code: "TUN",
    rating: 1614,
    confederation: "CAF",
    peakRating: 1714
  }, {
    rank: 62,
    name: "Cameroon",
    code: "CMR",
    rating: 1606,
    confederation: "CAF",
    peakRating: 1763
  }, {
    rank: 63,
    name: "Northern Ireland",
    code: "NIR",
    rating: 1602,
    confederation: "UEFA",
    peakRating: 1735
  }, {
    rank: 64,
    name: "North Macedonia",
    code: "MKD",
    rating: 1592,
    confederation: "UEFA",
    peakRating: 1606
  }, {
    rank: 64,
    name: "Saudi Arabia",
    code: "KSA",
    rating: 1592,
    confederation: "AFC",
    peakRating: 1701
  }, {
    rank: 66,
    name: "Mali",
    code: "MLI",
    rating: 1589,
    confederation: "CAF",
    peakRating: 1660
  }, {
    rank: 67,
    name: "New Zealand",
    code: "NZL",
    rating: 1586,
    confederation: "OFC",
    peakRating: 1645
  }, {
    rank: 68,
    name: "Iraq",
    code: "IRQ",
    rating: 1583,
    confederation: "AFC",
    peakRating: 1614
  }, {
    rank: 69,
    name: "Bosnia & Herzegovina",
    code: "BIH",
    rating: 1571,
    confederation: "UEFA",
    peakRating: 1773
  }, {
    rank: 70,
    name: "Honduras",
    code: "HON",
    rating: 1567,
    confederation: "CONCACAF",
    peakRating: 1690
  }, {
    rank: 71,
    name: "Iceland",
    code: "ISL",
    rating: 1566,
    confederation: "UEFA",
    peakRating: 1733
  }];
  const CONFEDERATIONS = {
    UEFA: {
      name: "UEFA",
      region: "Europe",
      color: "#0066b3",
      text: "#4d9fe0"
    },
    CONMEBOL: {
      name: "CONMEBOL",
      region: "South America",
      color: "#febe10",
      text: "#febe10"
    },
    CONCACAF: {
      name: "CONCACAF",
      region: "North America",
      color: "#e30613",
      text: "#f06a72"
    },
    AFC: {
      name: "AFC",
      region: "Asia",
      color: "#003a70",
      text: "#5a8fc7"
    },
    CAF: {
      name: "CAF",
      region: "Africa",
      color: "#009639",
      text: "#3cc06f"
    },
    OFC: {
      name: "OFC",
      region: "Oceania",
      color: "#0080c0",
      text: "#3ba3da"
    }
  };
  function ratingTier(r) {
    if (r >= 2100) return {
      label: "Elite",
      color: "var(--wce-tier-elite)"
    };
    if (r >= 2000) return {
      label: "World Class",
      color: "var(--wce-tier-world)"
    };
    if (r >= 1900) return {
      label: "Top Tier",
      color: "var(--wce-tier-top)"
    };
    if (r >= 1800) return {
      label: "Strong",
      color: "var(--wce-tier-strong)"
    };
    if (r >= 1700) return {
      label: "Competitive",
      color: "var(--wce-tier-competitive)"
    };
    if (r >= 1600) return {
      label: "Developing",
      color: "var(--wce-tier-developing)"
    };
    return {
      label: "Emerging",
      color: "var(--wce-tier-emerging)"
    };
  }
  function winProbability(rA, rB, homeAdvantage = 0) {
    return 1 / (1 + Math.pow(10, (rB - rA - homeAdvantage) / 400));
  }

  // Full result split (win/draw/loss) given two ratings + home advantage.
  function resultSplit(rA, rB, homeAdvantage = 0) {
    const pWin = winProbability(rA, rB, homeAdvantage);
    const pLose = 1 - pWin;
    const drawFactor = Math.exp(-Math.pow(rA + homeAdvantage - rB, 2) / 200000);
    const draw = 0.27 * drawFactor;
    return {
      win: pWin * (1 - draw / 2),
      draw,
      loss: pLose * (1 - draw / 2)
    };
  }
  window.WCE = {
    TEAMS,
    CONFEDERATIONS,
    ratingTier,
    winProbability,
    resultSplit
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/worldcupelo/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Emblem = __ds_scope.Emblem;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ISO2 = __ds_scope.ISO2;

__ds_ns.FlagThumb = __ds_scope.FlagThumb;

__ds_ns.ProbabilityBar = __ds_scope.ProbabilityBar;

__ds_ns.RatingValue = __ds_scope.RatingValue;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.TeamRow = __ds_scope.TeamRow;

__ds_ns.NewsTicker = __ds_scope.NewsTicker;

})();
