// App — routes between the worldcupelo surfaces.
const APP_DS = window.WorldCupEloDesignSystem_6a6b1a;

function MethodologyScreen({ onBack }) {
  const { Eyebrow } = APP_DS;
  const Tier = ({ band, label, color, note }) => (
    <li style={{ display: "flex", gap: "10px", alignItems: "baseline", padding: "3px 0", fontSize: "14px" }}>
      <span style={{ color, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{band}</span>
      <span style={{ color }}>{label}</span>
      <span style={{ color: "var(--text-tertiary)" }}>— {note}</span>
    </li>
  );
  return (
    <div style={{ maxWidth: "var(--container-prose)", margin: "0 auto", padding: "40px 24px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-tertiary)", fontSize: "12px", cursor: "pointer", marginBottom: "20px", padding: 0 }}>← Back</button>
      <h1 style={{ margin: 0, fontSize: "36px", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>Methodology</h1>
      <p style={{ color: "var(--text-tertiary)", marginTop: "8px", marginBottom: "32px" }}>How national-team Elo ratings work, and what they mean.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
        <section>
          <h2 style={h2()}>What is Elo?</h2>
          <p style={{ margin: 0 }}>Elo is a relative skill rating originally developed by physicist Arpad Elo for chess. Every team carries a single number; when two teams play, points flow from the underdog to the favorite based on the result and the gap in ratings beforehand. The system is zero-sum.</p>
        </section>
        <section>
          <h2 style={h2()}>The formula</h2>
          <pre style={pre()}><code>E_A = 1 / (1 + 10^((R_B − R_A − HA) / 400))</code></pre>
          <p style={{ margin: "12px 0 0", fontSize: "13px", color: "var(--text-tertiary)" }}>Where R_A and R_B are the two teams' ratings and HA is a home-advantage adjustment (typically +100 Elo for the home side, 0 at neutral venues).</p>
        </section>
        <section>
          <h2 style={h2()}>Reading the numbers</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            <Tier band="2100+" label="Elite" color="var(--wce-tier-elite)" note="A top-3 side in the world." />
            <Tier band="2000–2099" label="World Class" color="var(--wce-tier-world)" note="Realistic title contenders." />
            <Tier band="1900–1999" label="Top Tier" color="var(--wce-tier-top)" note="Capable of beating anyone on the day." />
            <Tier band="1800–1899" label="Strong" color="var(--wce-tier-strong)" note="Reliable knockout-round teams." />
            <Tier band="1700–1799" label="Competitive" color="var(--wce-tier-competitive)" note="World Cup qualifiers." />
            <Tier band="<1700" label="Developing / Emerging" color="var(--wce-tier-emerging)" note="Regional & emerging programs." />
          </ul>
        </section>
        <section>
          <h2 style={h2()}>A note on forecasts</h2>
          <p style={{ margin: 0 }}>Win probabilities and tournament odds shown here are derived directly from current Elo. They do not account for injuries, recent form, travel fatigue, or stylistic matchups. Treat them as a baseline — a starting point for conversation, not a forecast.</p>
        </section>
      </div>
    </div>
  );
}
function h2() { return { fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px", letterSpacing: "-0.015em" }; }
function pre() { return { background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "16px", fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--wce-gold-300)", overflowX: "auto", margin: 0 }; }

function Footer({ onNavigate }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border-default)", marginTop: "96px" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "32px 24px", fontSize: "12px", color: "var(--text-tertiary)", display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <div><span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>World Cup Elo</span> · An Elo ratings tracker for men's national football teams. Inspired by clubelo.com and playerelo.football.</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <button onClick={() => onNavigate("methodology")} style={fbtn()}>Methodology</button>
          <button onClick={() => onNavigate("worldcup")} style={fbtn()}>2026 WC</button>
        </div>
      </div>
    </footer>
  );
}
function fbtn() { return { background: "none", border: "none", color: "var(--text-tertiary)", fontSize: "12px", cursor: "pointer", padding: 0 }; }

function App() {
  const [route, setRoute] = React.useState("home");
  const [teamCode, setTeamCode] = React.useState(null);

  const navigate = (r) => { setRoute(r); window.scrollTo(0, 0); };
  const openTeam = (code) => { setTeamCode(code); setRoute("team"); window.scrollTo(0, 0); };

  let screen;
  if (route === "team") screen = <TeamScreen code={teamCode} onBack={() => navigate("home")} onOpenTeam={openTeam} />;
  else if (route === "compare") screen = <CompareScreen />;
  else if (route === "worldcup") screen = <WorldCupScreen onOpenTeam={openTeam} />;
  else if (route === "methodology") screen = <MethodologyScreen onBack={() => navigate("home")} />;
  else screen = <RankingsScreen onOpenTeam={openTeam} />;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header route={route} onNavigate={navigate} />
      <main style={{ flex: 1 }}>{screen}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

window.App = App;
