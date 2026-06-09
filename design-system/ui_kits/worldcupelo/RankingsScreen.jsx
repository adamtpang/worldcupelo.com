// RankingsScreen — the home/hero: identity bar + the rankings table.
const RK_DS = window.WorldCupEloDesignSystem_6a6b1a;

function RankingsScreen({ onOpenTeam }) {
  const { TEAMS, CONFEDERATIONS, ratingTier } = window.WCE;
  const { Eyebrow, Button, SectionHeading, FlagThumb, Chip, RatingValue } = RK_DS;
  const [filter, setFilter] = React.useState("ALL");
  const [search, setSearch] = React.useState("");

  const filtered = TEAMS.filter((t) => {
    if (filter !== "ALL" && t.confederation !== filter) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const FILTERS = ["ALL", "UEFA", "CONMEBOL", "CONCACAF", "AFC", "CAF", "OFC"];

  return (
    <div>
      {/* Identity bar */}
      <section style={{ borderBottom: "1px solid var(--border-default)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.07,
          backgroundImage: "radial-gradient(circle at 15% 20%, #d4af37 0px, transparent 45%), radial-gradient(circle at 85% 80%, #ef4444 0px, transparent 45%)" }} />
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <Eyebrow live>Live Elo · Every men's national team</Eyebrow>
            <h1 style={{ margin: "8px 0 0", fontSize: "30px", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)" }}>
              National-team <span className="gold-text gold-glow">Elo ratings</span>
            </h1>
            <p style={{ margin: "6px 0 0", color: "var(--text-tertiary)", fontSize: "14px", maxWidth: "560px" }}>
              A continuous rating of every men's national team — match results, opponent strength, and home advantage.
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button variant="primary">World Cup 2026 <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", background: "rgba(0,0,0,0.2)", padding: "2px 6px", borderRadius: "4px" }}>184d</span></Button>
            <Button variant="secondary" arrow>Predict</Button>
          </div>
        </div>
      </section>

      {/* Rankings table */}
      <section style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px 24px 40px" }}>
        <SectionHeading title="Global Rankings" subtitle={`All ${TEAMS.length} men's national teams by Elo rating`} right="Updated · Jun 2026" style={{ marginBottom: "12px" }} />

        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {/* toolbar */}
          <div style={{ borderBottom: "1px solid var(--border-default)", padding: "12px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams…"
              style={{ background: "var(--surface-inset)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)",
                padding: "6px 12px", fontSize: "14px", color: "var(--text-primary)", outline: "none", flex: 1, minWidth: "140px", maxWidth: "280px", fontFamily: "var(--font-sans)" }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginLeft: "auto" }}>
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ fontSize: "11px", fontWeight: 600, padding: "6px 10px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
                    transition: "all var(--duration-base) var(--ease-standard)",
                    background: filter === f ? "var(--wce-gold)" : "var(--wce-white-05)",
                    color: filter === f ? "#000" : "var(--text-secondary)" }}>
                  {f === "ALL" ? "All" : f}
                </button>
              ))}
            </div>
          </div>

          {/* table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", borderBottom: "1px solid var(--border-default)" }}>
                  <th style={thL(60)}>Rank</th>
                  <th style={thL()}>Team</th>
                  <th style={thR()}>Elo</th>
                  <th style={thR()}>Peak</th>
                  <th style={thL()}>Confed</th>
                  <th style={thL()}>Tier</th>
                  <th style={{ width: "1%" }}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const tier = ratingTier(t.rating);
                  return <Row key={t.code + t.rank} t={t} tier={tier} onOpenTeam={onOpenTeam} FlagThumb={FlagThumb} Chip={Chip} RatingValue={RatingValue} />;
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "var(--text-tertiary)", fontSize: "14px" }}>No teams match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function thL(w) { return { textAlign: "left", padding: "8px 12px", fontWeight: 500, width: w ? w + "px" : undefined }; }
function thR() { return { textAlign: "right", padding: "8px 12px", fontWeight: 500 }; }

function Row({ t, tier, onOpenTeam, FlagThumb, Chip, RatingValue }) {
  const [hover, setHover] = React.useState(false);
  return (
    <tr onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ borderBottom: "1px solid var(--border-faint)", background: hover ? "var(--wce-white-02)" : "transparent", transition: "background var(--duration-fast)" }}>
      <td style={{ padding: "10px 12px", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color: "var(--text-tertiary)", fontSize: "14px" }}>{t.rank}</td>
      <td style={{ padding: "10px 12px" }}>
        <button onClick={() => onOpenTeam(t.code)} style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <FlagThumb code={t.code} name={t.name} size="sm" />
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: 600, fontSize: "14px", color: hover ? "var(--wce-gold-300)" : "var(--text-primary)", transition: "color var(--duration-base)" }}>{t.name}</span>
            {t.host && <Chip variant="host">Host</Chip>}
            {t.wcTitles > 0 && <span style={{ color: "var(--wce-gold-300)", fontSize: "10px" }}>{"★".repeat(t.wcTitles)}</span>}
          </span>
        </button>
      </td>
      <td style={{ padding: "10px 12px", textAlign: "right" }}><RatingValue value={t.rating} size="sm" /></td>
      <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color: "var(--text-tertiary)", fontSize: "14px" }}>{t.peakRating ?? t.rating}</td>
      <td style={{ padding: "10px 12px" }}><Chip variant="confederation" confederation={t.confederation} /></td>
      <td style={{ padding: "10px 12px", fontSize: "11px", fontWeight: 600, color: tier.color }}>{tier.label}</td>
      <td style={{ padding: "10px 12px", textAlign: "right" }}>
        <button onClick={() => onOpenTeam(t.code)}
          style={{ display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap", borderRadius: "var(--radius-md)",
            border: "1px solid var(--wce-white-10)", background: "var(--wce-white-05)", padding: "4px 10px", fontSize: "11px", fontWeight: 600,
            color: hover ? "var(--wce-gold-200)" : "var(--text-secondary)", cursor: "pointer", transition: "all var(--duration-base)" }}>
          View <span aria-hidden>→</span>
        </button>
      </td>
    </tr>
  );
}

window.RankingsScreen = RankingsScreen;
