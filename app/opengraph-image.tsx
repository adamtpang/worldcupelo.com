import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "World Cup Elo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a0a0b 0%, #16161a 60%, #1a1410 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          fontFamily: "system-ui",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#d4af37", fontSize: 26, fontWeight: 700, letterSpacing: 4 }}>
          <span>⚽</span> WORLDCUPELO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>
            Elo ratings for{" "}
            <span style={{ background: "linear-gradient(135deg, #f4d04a, #d4af37, #b78821)", backgroundClip: "text", color: "transparent" }}>
              every national team.
            </span>
          </div>
          <div style={{ fontSize: 32, color: "#9ca3af", marginTop: 12 }}>
            Built for the road to the 2026 World Cup.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 28 }}>
          <span>🇪🇸 2171</span>
          <span style={{ color: "#3a3a40" }}>·</span>
          <span>🇦🇷 2113</span>
          <span style={{ color: "#3a3a40" }}>·</span>
          <span>🇫🇷 2063</span>
          <span style={{ color: "#3a3a40" }}>·</span>
          <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 2042</span>
          <span style={{ color: "#3a3a40" }}>·</span>
          <span>🇧🇷 1979</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
