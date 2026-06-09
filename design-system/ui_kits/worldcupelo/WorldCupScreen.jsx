// WorldCupScreen — the 2026 hub: hero + countdown, hosts, title favorites.
const WC_DS = window.WorldCupEloDesignSystem_6a6b1a;

function WorldCupScreen({ onOpenTeam }) {
  const { TEAMS, CONFEDERATIONS } = window.WCE;
  const { FlagThumb, RatingValue, Chip, Eyebrow, SectionHeading } = WC_DS;
  const hosts = TEAMS.filter((t) => t.host);
  const top16 = TEAMS.slice(0, 16);
  const top16Total = top16.reduce((a, x) => a + Math.pow(10, (x.rating - 1800) / 400), 0);

  return (
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px" }}>
      {/* hero */}
      <div style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.10), transparent 55%, rgba(16,185,129,0.05))", border: "1px solid rgba(212,175,55,0.20)", borderRadius: "var(--radius-2xl)", padding: "40px", marginBottom: "40px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", right: 0, top: 0, fontSize: "260px", lineHeight: 1, opacity: 0.07, transform: "translate(32px,-48px)", userSelect: "none" }}>🏆</div>
        <div style={{ position: "relative" }}>
          <Eyebrow tone="gold">FIFA World Cup 2026</Eyebrow>
          <h1 style={{ margin: "12px 0 0", fontSize: "60px", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-primary)", maxWidth: "760px" }}>
            The first <span className="gold-text">48-team</span> World Cup.<br />Three hosts. One trophy.
          </h1>
          <p style={{ margin: "16px 0 0", color: "var(--text-tertiary)", maxWidth: "620px", fontSize: "15px" }}>
            June 11 – July 19, 2026 · Hosted across the United States, Canada, and Mexico. Here's how every contender stacks up by Elo.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "24px" }}>
            <HeroStat label="Kickoff in" value="184d" gold />
            <HeroStat label="Teams" value="48" />
            <HeroStat label="Matches" value="104" />
            <HeroStat label="Host cities" value="16" />
          </div>
        </div>
      </div>

      {/* hosts */}
      <section style={{ marginBottom: "40px" }}>
        <SectionHeading title="Host Nations" subtitle="Automatic qualification for hosting." style={{ marginBottom: "16px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {hosts.map((t) => (
            <button key={t.code} onClick={() => onOpenTeam(t.code)}
              style={{ background: "var(--surface-card)", border: "1px solid rgba(212,175,55,0.20)", borderRadius: "var(--radius-xl)", padding: "20px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <Chip variant="host">Host</Chip>
                <span style={{ fontSize: "10px", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>RANK #{t.rank}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <FlagThumb code={t.code} name={t.name} size="md" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "20px", color: "var(--text-primary)" }}>{t.name}</div>
                  <div style={{ marginTop: "2px" }}><RatingValue value={t.rating} size="lg" /></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* title favorites */}
      <section style={{ marginBottom: "16px" }}>
        <SectionHeading title="Title Favorites" subtitle="The 16 highest-rated teams in the world right now." style={{ marginBottom: "16px" }} />
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", borderBottom: "1px solid var(--border-default)" }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500, width: "60px" }}>Rank</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Team</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 500 }}>Elo</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 500 }}>Title odds*</th>
            </tr></thead>
            <tbody>
              {top16.map((t, i) => {
                const odds = (Math.pow(10, (t.rating - 1800) / 400) / top16Total) * 100 * 0.85;
                return (
                  <tr key={t.code} style={{ borderBottom: "1px solid var(--border-faint)" }}>
                    <td style={{ padding: "10px 12px", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color: "var(--text-tertiary)", fontSize: "14px" }}>{i + 1}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <button onClick={() => onOpenTeam(t.code)} style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", padding: 0 }}>
                        <FlagThumb code={t.code} name={t.name} size="sm" />
                        <span style={{ fontWeight: 600, fontSize: "14px" }}>{t.name}</span>
                        {t.host && <Chip variant="host">Host</Chip>}
                        {t.wcTitles > 0 && <span style={{ color: "var(--wce-gold-300)", fontSize: "10px" }}>{"★".repeat(t.wcTitles)}</span>}
                      </button>
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right" }}><RatingValue value={t.rating} size="sm" /></td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color: "var(--text-secondary)", fontSize: "14px" }}>{odds.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "8px" }}>* Naïve title odds derived from Elo only — not a forecast.</p>
      </section>
    </div>
  );
}

function HeroStat({ label, value, gold }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.3)", border: gold ? "1px solid rgba(212,175,55,0.30)" : "1px solid var(--wce-white-10)", borderRadius: "var(--radius-lg)", padding: "12px 16px" }}>
      <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, color: gold ? "var(--wce-gold-300)" : "var(--text-secondary)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontWeight: 900, fontSize: "24px", lineHeight: 1, marginTop: "4px", color: gold ? "var(--wce-gold-300)" : "var(--text-primary)" }}>{value}</div>
    </div>
  );
}

window.WorldCupScreen = WorldCupScreen;
