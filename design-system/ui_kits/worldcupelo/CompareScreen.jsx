// CompareScreen — head-to-head: two pickers, venue toggle, outcome split + bar.
const CMP_DS = window.WorldCupEloDesignSystem_6a6b1a;

function CompareScreen() {
  const { TEAMS, resultSplit } = window.WCE;
  const { FlagThumb, RatingValue, ProbabilityBar, Eyebrow, SectionHeading, Button } = CMP_DS;
  const [codeA, setCodeA] = React.useState("ESP");
  const [codeB, setCodeB] = React.useState("BRA");
  const [neutral, setNeutral] = React.useState(true);

  const teamA = TEAMS.find((t) => t.code === codeA);
  const teamB = TEAMS.find((t) => t.code === codeB);
  const split = resultSplit(teamA.rating, teamB.rating, neutral ? 0 : 100);

  const Picker = ({ value, onChange }) => {
    const team = TEAMS.find((t) => t.code === value);
    return (
      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", padding: "20px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
          <FlagThumb code={team.code} name={team.name} size="lg" lift />
        </div>
        <select value={value} onChange={(e) => onChange(e.target.value)}
          style={{ background: "var(--surface-inset)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "6px 12px",
            fontSize: "15px", fontWeight: 600, width: "100%", color: "var(--text-primary)", fontFamily: "var(--font-sans)", cursor: "pointer" }}>
          {TEAMS.map((t) => <option key={t.code} value={t.code}>{t.name}</option>)}
        </select>
        <div style={{ marginTop: "12px" }}><RatingValue value={team.rating} size="lg" /></div>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-tertiary)", fontWeight: 600, marginTop: "4px" }}>Rank #{team.rank} · {team.confederation}</div>
      </div>
    );
  };

  const Outcome = ({ label, value, color, glyph }) => (
    <div>
      <div style={{ fontSize: "24px", marginBottom: "4px" }}>{glyph}</div>
      <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-tertiary)", fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontWeight: 800, fontSize: "40px", marginTop: "4px", color }}>{Math.round(value * 100)}%</div>
    </div>
  );

  return (
    <div style={{ maxWidth: "var(--container-prose)", margin: "0 auto", padding: "40px 24px" }}>
      <Eyebrow tone="gold">Head-to-head</Eyebrow>
      <h1 style={{ margin: "8px 0 28px", fontSize: "36px", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>Predict any matchup</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "center", marginBottom: "24px" }}>
        <Picker value={codeA} onChange={setCodeA} />
        <div style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>vs</div>
        <Picker value={codeB} onChange={setCodeB} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
        <button onClick={() => setNeutral(true)} style={toggle(neutral)}>Neutral venue</button>
        <button onClick={() => setNeutral(false)} style={toggle(!neutral)}>{teamA.name} at home (+100 Elo)</button>
      </div>

      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", padding: "28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", textAlign: "center" }}>
          <Outcome label={`${teamA.name} win`} value={split.win} color="var(--wce-green-text)" glyph="🟢" />
          <Outcome label="Draw" value={split.draw} color="var(--text-secondary)" glyph="🤝" />
          <Outcome label={`${teamB.name} win`} value={split.loss} color="var(--wce-red-text)" glyph="🔴" />
        </div>
        <div style={{ marginTop: "24px" }}>
          <ProbabilityBar win={split.win} draw={split.draw} loss={split.loss} height={12} />
        </div>
        <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", textAlign: "center" }}>
          <Stat label="Elo" value={teamA.rating} />
          <Stat label="Difference" value={Math.abs(teamA.rating - teamB.rating)} sub={teamA.rating === teamB.rating ? "even" : (teamA.rating > teamB.rating ? `${teamA.name} favored` : `${teamB.name} favored`)} />
          <Stat label="Elo" value={teamB.rating} />
        </div>
      </div>
      <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "12px", textAlign: "center" }}>
        Naïve probabilities derived from Elo only — a starting point for conversation, not a forecast.
      </p>
    </div>
  );
}

function toggle(active) {
  return { fontSize: "12px", fontWeight: 600, padding: "6px 12px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
    transition: "all var(--duration-base)", background: active ? "var(--wce-gold)" : "var(--wce-white-05)", color: active ? "#000" : "var(--text-secondary)" };
}
function Stat({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-tertiary)", fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontWeight: 700, fontSize: "20px", marginTop: "4px", color: "var(--text-primary)" }}>{value}</div>
      {sub && <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "4px" }}>{sub}</div>}
    </div>
  );
}

window.CompareScreen = CompareScreen;
