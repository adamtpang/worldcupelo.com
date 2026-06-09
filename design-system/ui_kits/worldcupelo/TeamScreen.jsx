// TeamScreen — per-team detail: hero, stats, win-prob table, rivals, regional table.
const TS_DS = window.WorldCupEloDesignSystem_6a6b1a;

function TeamScreen({ code, onBack, onOpenTeam }) {
  const { TEAMS, CONFEDERATIONS, ratingTier, resultSplit } = window.WCE;
  const { FlagThumb, RatingValue, StatTile, Chip, Eyebrow, SectionHeading, flagUrl } = TS_DS;
  const team = TEAMS.find((t) => t.code === code) || TEAMS[0];
  const tier = ratingTier(team.rating);
  const conf = CONFEDERATIONS[team.confederation];
  const peakDiff = (team.peakRating ?? team.rating) - team.rating;

  const sameConf = TEAMS.filter((t) => t.confederation === team.confederation && t.code !== team.code).slice(0, 8);
  const rivals = TEAMS.filter((t) => t.code !== team.code)
    .map((t) => ({ ...t, diff: Math.abs(t.rating - team.rating) }))
    .sort((a, b) => a.diff - b.diff).slice(0, 6);
  const opponents = TEAMS.slice(0, 8).filter((t) => t.code !== team.code).slice(0, 6);

  return (
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-tertiary)", fontSize: "12px", cursor: "pointer", marginBottom: "20px", padding: 0 }}>← Back to rankings</button>

      {/* hero */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "40px" }}>
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", padding: "28px", position: "relative", overflow: "hidden" }}>
          <img src={flagUrl(team.code)} alt="" aria-hidden style={{ position: "absolute", right: 0, top: 0, height: "260px", opacity: 0.05, transform: "translate(64px,-24px)", objectFit: "cover" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Chip variant="confederation" confederation={team.confederation} />
              <span style={{ fontSize: "10px", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>RANK #{team.rank}</span>
              {team.host && <Chip variant="host">2026 Host</Chip>}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
              <FlagThumb code={team.code} name={team.name} size="lg" lift />
              <div>
                <h1 style={{ margin: 0, fontSize: "48px", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1 }}>{team.name}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: tier.color }}>{tier.label}</span>
                  {team.wcTitles > 0 && (
                    <span style={{ color: "var(--wce-gold-300)", fontSize: "14px" }}>{"★".repeat(team.wcTitles)} <span style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>{team.wcTitles} World Cup{team.wcTitles > 1 ? "s" : ""}</span></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div style={{ gridColumn: "span 2" }}><StatTile label="Current Elo" value={team.rating} accent="gold" big /></div>
          <StatTile label="Peak Elo" value={team.peakRating ?? team.rating} sub={peakDiff > 0 ? "−" + peakDiff : "at peak"} />
          <StatTile label="World Rank" value={"#" + team.rank} />
        </div>
      </div>

      {/* win probability */}
      <section style={{ marginBottom: "40px" }}>
        <SectionHeading size="sm" title="Win probability vs. top opponents" style={{ marginBottom: "12px" }} />
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", borderBottom: "1px solid var(--border-default)" }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Opponent</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 500 }}>Their Elo</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 500 }}>{team.name} win</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 500 }}>Draw</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 500 }}>Opp win</th>
            </tr></thead>
            <tbody>
              {opponents.map((opp) => {
                const s = resultSplit(team.rating, opp.rating);
                return (
                  <tr key={opp.code} style={{ borderBottom: "1px solid var(--border-faint)" }}>
                    <td style={{ padding: "10px 12px" }}>
                      <button onClick={() => onOpenTeam(opp.code)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", padding: 0, fontSize: "14px", fontWeight: 500 }}>
                        <FlagThumb code={opp.code} name={opp.name} size="xs" /> {opp.name}
                      </button>
                    </td>
                    <td style={tdNum("var(--text-secondary)")}>{opp.rating}</td>
                    <td style={tdNum("var(--wce-green-text)", 700)}>{Math.round(s.win * 100)}%</td>
                    <td style={tdNum("var(--text-tertiary)")}>{Math.round(s.draw * 100)}%</td>
                    <td style={tdNum("var(--wce-red-text)")}>{Math.round(s.loss * 100)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* rivals + regional */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div>
          <SectionHeading size="sm" title="Closest rivals (by Elo)" style={{ marginBottom: "12px" }} />
          <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)" }}>
            {rivals.map((r, i) => (
              <button key={r.code} onClick={() => onOpenTeam(r.code)} style={rowBtn(i, rivals.length)}>
                <FlagThumb code={r.code} name={r.name} size="xs" />
                <span style={{ fontWeight: 500, flex: 1, textAlign: "left", fontSize: "14px" }}>{r.name}</span>
                <RatingValue value={r.rating} size="sm" />
                <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: "11px", width: "44px", textAlign: "right", color: r.rating > team.rating ? "var(--wce-green-text)" : "var(--text-tertiary)" }}>
                  {r.rating > team.rating ? "+" : "−"}{Math.abs(r.rating - team.rating)}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading size="sm" title={`${team.confederation} regional table`} style={{ marginBottom: "12px" }} />
          <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)" }}>
            {sameConf.map((r, i) => (
              <button key={r.code} onClick={() => onOpenTeam(r.code)} style={rowBtn(i, sameConf.length)}>
                <span style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "12px", width: "28px", textAlign: "left" }}>#{r.rank}</span>
                <FlagThumb code={r.code} name={r.name} size="xs" />
                <span style={{ fontWeight: 500, flex: 1, textAlign: "left", fontSize: "14px" }}>{r.name}</span>
                <RatingValue value={r.rating} size="sm" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function tdNum(color, weight) { return { padding: "10px 12px", textAlign: "right", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color, fontWeight: weight || 400, fontSize: "14px" }; }
function rowBtn(i, len) {
  return { display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", width: "100%", background: "none",
    border: "none", borderBottom: i < len - 1 ? "1px solid var(--border-faint)" : "none", cursor: "pointer", color: "var(--text-primary)" };
}

window.TeamScreen = TeamScreen;
