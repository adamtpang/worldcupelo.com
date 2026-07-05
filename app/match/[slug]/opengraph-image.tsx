import { ImageResponse } from "next/og";
import { getTournament, type Fixture } from "@/lib/tournament";
import { ISO2 } from "@/lib/teams";

export const runtime = "edge";
export const alt = "World Cup 2026 match card · Elo odds on worldcupelo.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "linear-gradient(135deg, #0a0a0b 0%, #16161a 60%, #1a1410 100%)";
const MINUS = "−";

function flagPng(code: string | null): string | null {
  if (!code) return null;
  const iso = ISO2[code.toUpperCase()];
  return iso ? `https://flagcdn.com/w160/${iso}.png` : null;
}

function pct(x: number): string {
  return `${Math.round(x * 100)}%`;
}

function fmtDelta(d: number): string {
  const v = Math.abs(d).toFixed(1);
  return d >= 0 ? `+${v}` : `${MINUS}${v}`;
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let f: Fixture | null = null;
  try {
    const t = await getTournament();
    f = t.fixtures.find((x) => x.slug === slug) ?? null;
  } catch {
    f = null;
  }

  if (!f) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: BG,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            color: "white",
            fontFamily: "system-ui",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#d4af37",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 6,
            }}
          >
            WORLDCUPELO
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 900 }}>
            World Cup 2026
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const src1 = flagPng(f.team1);
  const src2 = flagPng(f.team2);
  const roundLine = `${f.group ? `Group ${f.group} · ` : ""}${f.round} · Match ${f.num}`;
  const dateLine = new Date(f.dateUtc).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const probs =
    !f.played && f.p1Win !== null && f.pDraw !== null && f.p2Win !== null
      ? { p1: f.p1Win, pd: f.pDraw, p2: f.p2Win }
      : null;

  const barWidth = 1080;
  const w1 = probs ? Math.round(barWidth * probs.p1) : 0;
  const wd = probs ? Math.round(barWidth * probs.pd) : 0;
  const w2 = probs ? barWidth - w1 - wd : 0;

  const teamBlock = (name: string, src: string | null) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        width: 400,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          width={160}
          height={107}
          style={{ borderRadius: 10, objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 160,
            height: 107,
            borderRadius: 10,
            background: "#1c1c21",
            border: "1px solid #26262c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          TBD
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: name.length > 14 ? 34 : 44,
          fontWeight: 800,
          lineHeight: 1.15,
        }}
      >
        {name}
      </div>
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 60,
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#d4af37",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 5,
            }}
          >
            WORLDCUPELO
          </div>
          <div style={{ display: "flex", color: "#9ca3af", fontSize: 24 }}>
            {roundLine}
          </div>
        </div>

        {/* Teams */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {teamBlock(f.team1Name, src1)}
          {f.played && f.score ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 120,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {f.score[0]}-{f.score[1]}
              </div>
              {f.ht ? (
                <div
                  style={{ display: "flex", color: "#6b7280", fontSize: 24 }}
                >
                  HT {f.ht[0]}-{f.ht[1]}
                </div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  color: "#10b981",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 3,
                }}
              >
                FULL TIME
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 56,
                  fontWeight: 900,
                  color: "#6b7280",
                }}
              >
                VS
              </div>
              <div style={{ display: "flex", color: "#9ca3af", fontSize: 22 }}>
                {dateLine}
              </div>
            </div>
          )}
          {teamBlock(f.team2Name, src2)}
        </div>

        {/* Probability bar (upcoming) or Elo swing (played) */}
        {probs ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              <div style={{ display: "flex", color: "#6ee7b7" }}>
                {f.team1Name} {pct(probs.p1)}
              </div>
              <div style={{ display: "flex", color: "#a1a1aa" }}>
                Draw {pct(probs.pd)}
              </div>
              <div style={{ display: "flex", color: "#fda4af" }}>
                {f.team2Name} {pct(probs.p2)}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: barWidth,
                height: 22,
                borderRadius: 11,
                overflow: "hidden",
              }}
            >
              <div
                style={{ display: "flex", width: w1, background: "#10b981" }}
              />
              <div
                style={{ display: "flex", width: wd, background: "#71717a" }}
              />
              <div
                style={{ display: "flex", width: w2, background: "#f43f5e" }}
              />
            </div>
          </div>
        ) : f.played && f.elo1Delta !== null && f.elo2Delta !== null ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 30,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                display: "flex",
                color: f.elo1Delta >= 0 ? "#34d399" : "#f87171",
              }}
            >
              {f.team1Name} {fmtDelta(f.elo1Delta)}
            </div>
            <div style={{ display: "flex", color: "#3a3a40" }}>·</div>
            <div
              style={{
                display: "flex",
                color: f.elo2Delta >= 0 ? "#34d399" : "#f87171",
              }}
            >
              {f.team2Name} {fmtDelta(f.elo2Delta)}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#9ca3af",
              fontSize: 26,
            }}
          >
            World Cup 2026 · Elo odds when the pairing is set
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#6b7280",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>{f.venue}</div>
          <div style={{ display: "flex" }}>
            World Cup 2026 · worldcupelo.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
