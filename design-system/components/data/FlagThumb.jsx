import React from "react";

// ISO 3166-1 alpha-2 slugs for flagcdn (home nations use UK subdivisions).
// Lifted from lib/teams.ts — extend as needed.
export const ISO2 = {
  ESP: "es", ARG: "ar", FRA: "fr", ENG: "gb-eng", COL: "co", BRA: "br",
  POR: "pt", NED: "nl", CRO: "hr", ECU: "ec", NOR: "no", GER: "de",
  SUI: "ch", URU: "uy", TUR: "tr", JPN: "jp", SEN: "sn", DEN: "dk",
  ITA: "it", BEL: "be", MEX: "mx", PAR: "py", AUT: "at", MAR: "ma",
  CAN: "ca", UKR: "ua", SCO: "gb-sct", KOR: "kr", RUS: "ru", AUS: "au",
  SRB: "rs", GRE: "gr", IRN: "ir", USA: "us", PAN: "pa", NGA: "ng",
  POL: "pl", UZB: "uz", CZE: "cz", CHI: "cl", ALG: "dz", WAL: "gb-wls",
  VEN: "ve", KVX: "xk", PER: "pe", HUN: "hu", SVN: "si", JOR: "jo",
  IRL: "ie", SVK: "sk", BOL: "bo", ALB: "al", SWE: "se", EGY: "eg",
  GEO: "ge", ROU: "ro", COD: "cd", CIV: "ci", CRC: "cr", ISR: "il",
  TUN: "tn", CMR: "cm", NIR: "gb-nir", MKD: "mk", KSA: "sa", MLI: "ml",
  NZL: "nz", IRQ: "iq", BIH: "ba", HON: "hn", ISL: "is", CPV: "cv",
};

/** Real flag image URL (SVG, scales crisply). */
export function flagUrl(code) {
  const iso = ISO2[(code || "").toUpperCase()];
  return iso ? `https://flagcdn.com/${iso}.svg` : "";
}

/**
 * FlagThumb — a national flag as a rounded rect with the brand's white ring.
 * Sizes echo the product: xs (table), sm, md, lg (hero, with soft lift).
 */
export function FlagThumb({ code, name, size = "sm", lift = false, style, ...rest }) {
  const sizes = {
    xs: { w: 20, h: 14, r: "var(--radius-xs)" },
    sm: { w: 24, h: 16, r: "var(--radius-xs)" },
    md: { w: 40, h: 28, r: "var(--radius-sm)" },
    lg: { w: 80, h: 56, r: "var(--radius-md)" },
  };
  const s = sizes[size] || sizes.sm;
  const url = flagUrl(code);
  return (
    <img
      src={url}
      alt={name ? `${name} flag` : ""}
      loading="lazy"
      width={s.w}
      height={s.h}
      style={{
        width: s.w,
        height: s.h,
        objectFit: "cover",
        borderRadius: s.r,
        boxShadow: lift
          ? "var(--ring-faint), var(--shadow-flag)"
          : "var(--ring-faint)",
        flexShrink: 0,
        display: "block",
        ...style,
      }}
      {...rest}
    />
  );
}
