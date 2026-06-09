/* World Cup Elo — living styleguide body. Renders every token + component
   state from the design-system bundle, with a rationale note per section. */
const DS = window.WorldCupEloDesignSystem_6a6b1a;
const { Logo, Emblem, Button, Chip, Eyebrow, SectionHeading, RatingValue, StatTile, FlagThumb, TeamRow, ProbabilityBar, NewsTicker } = DS;

function Section({ id, kicker, title, why, children }) {
  return (
    <section id={id} className="sg-section">
      <div className="sg-kicker">{kicker}</div>
      <h2 className="sg-title">{title}</h2>
      <p className="sg-why">{why}</p>
      {children}
    </section>
  );
}

function Swatch({ name, hex, varName, dark }) {
  return (
    <div className="sw" style={{ background: `var(${varName})` }}>
      <span className="n" style={{ color: dark ? "#000" : "#fff" }}>{name}</span>
      <span className="h" style={{ color: dark ? "#000" : "#fff" }}>{hex}</span>
    </div>
  );
}

function Card({ label, children, style }) {
  return (
    <div className="sg-card" style={style}>
      {label && <div className="sg-label">{label}</div>}
      {children}
    </div>
  );
}

const TICKER = [
  { text: "Spain", value: "2171 ▲4" },
  { text: "Argentina 1–1 Brazil" },
  { text: "France climbs to", value: "#3" },
  { text: "Morocco", value: "1806 ▲12" },
  { text: "Kickoff in", value: "184d" },
];

function App() {
  const [filter, setFilter] = React.useState("ALL");
  const FILTERS = ["ALL", "UEFA", "CONMEBOL", "CONCACAF", "AFC", "CAF", "OFC"];

  return (
    <div>
      <NewsTicker label="LIVE" speed={30} items={TICKER} />
      <div className="wrap">
        {/* hero */}
        <header style={{ paddingTop: 48 }}>
          <Logo size="lg" />
          <h1 className="sg-h1" style={{ marginTop: 22 }}>
            The <span className="gold-text">World Cup Elo</span> system
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 720, marginTop: 10, lineHeight: 1.6 }}>
            One disciplined dark base for <b style={{ color: "var(--text-primary)" }}>unity</b>; gold, tri-nation and
            neon accents for <b style={{ color: "var(--text-primary)" }}>diversity</b>. A data instrument for the
            2026 World Cup in the Americas — table-first, numbers-forward, restrained.
          </p>
          <hr className="divider" style={{ marginTop: 24 }} />
        </header>

        {/* BRAND */}
        <Section id="brand" kicker="01 · Brand" title="Logo & emblem"
          why={<>The emblem is an original mark — a <b>gold coin</b> (the trophy, our one unifying token) holding three <b>ascending bars in the host colors</b> (Canada red, Mexico green, USA blue) that read at once as a rising Elo chart and the three 2026 hosts, capped by a gold peak-spark. It is never the official FWC26 emblem. The wordmark is Archivo Expanded, lower-case, with “elo” in gold.</>}>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card label="Lockup — dark"><div className="row" style={{ minHeight: 60 }}><Logo size="lg" /></div></Card>
            <Card label="On light" style={{ background: "#f5f5f7" }}>
              <div className="row" style={{ minHeight: 60 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <Emblem size={40} />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", color: "#0a0a0b" }}>
                    worldcup<span className="gold-text">elo</span>
                  </span>
                </span>
              </div>
            </Card>
            <Card label="Sizes"><div className="row"><Logo size="md" /><Logo size="sm" /></div></Card>
            <Card label="Emblem only — favicon / avatar"><div className="row"><Emblem size={56} /><Emblem size={40} /><Emblem size={28} /></div></Card>
          </div>
        </Section>

        {/* COLOR */}
        <Section id="color" kicker="02 · Color" title="Color system"
          why={<>Near-black surfaces and a near-white text ramp do the structural work; <b>gold</b> is the single primary accent, reserved for ratings and the one primary action. The <b>tri-nation</b> families and the <b>neon</b> layer (magenta · cyan · electric-blue, pulled from the Americas-neon reference) are seasoning — confederation tints, host context, tickers, pulses and chart strokes — never flat fills behind content.</>}>
          <Card label="Neutrals — surface stack & text" style={{ marginBottom: 12 }}>
            <div className="swrow">
              <Swatch name="Page" hex="#0A0A0B" varName="--wce-bg" />
              <Swatch name="Elevated" hex="#111113" varName="--wce-bg-elevated" />
              <Swatch name="Card" hex="#16161A" varName="--wce-bg-card" />
              <Swatch name="Border" hex="#26262C" varName="--wce-border" />
              <Swatch name="Text" hex="#F5F5F7" varName="--wce-text" dark />
              <Swatch name="Muted" hex="#9CA3AF" varName="--wce-text-muted" dark />
            </div>
          </Card>
          <Card label="Gold — primary accent (unity / ratings)" style={{ marginBottom: 12 }}>
            <div className="swrow">
              <Swatch name="300" hex="#ECC85D" varName="--wce-gold-300" dark />
              <Swatch name="500" hex="#D4AF37" varName="--wce-gold-500" dark />
              <Swatch name="600" hex="#B78821" varName="--wce-gold-600" dark />
              <Swatch name="700" hex="#92651E" varName="--wce-gold-700" />
              <Swatch name="800" hex="#7A5220" varName="--wce-gold-800" />
              <Swatch name="900" hex="#684520" varName="--wce-gold-900" />
            </div>
          </Card>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 12 }}>
            <Card label="Tri-nation hosts (diversity)">
              <div className="swrow" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                <Swatch name="🇨🇦 CAN" hex="#E4002B" varName="--wce-can-500" />
                <Swatch name="🇲🇽 MEX" hex="#009639" varName="--wce-mex-500" />
                <Swatch name="🇺🇸 USA" hex="#0066B3" varName="--wce-usa-600" />
              </div>
            </Card>
            <Card label="Neon energy">
              <div className="swrow" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                <Swatch name="Magenta" hex="#FD36F5" varName="--wce-neon-magenta" dark />
                <Swatch name="Cyan" hex="#6FF7FF" varName="--wce-neon-cyan" dark />
                <Swatch name="Blue" hex="#0050FF" varName="--wce-neon-blue" />
              </div>
            </Card>
          </div>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card label="Semantic — win / draw / loss + tiers">
              <div className="row" style={{ gap: 22 }}>
                <span className="mono" style={{ color: "var(--wce-green-text)", fontWeight: 800, fontSize: 22 }}>62%</span>
                <span className="mono" style={{ color: "var(--text-secondary)", fontWeight: 800, fontSize: 22 }}>21%</span>
                <span className="mono" style={{ color: "var(--wce-red-text)", fontWeight: 800, fontSize: 22 }}>17%</span>
                <span style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "var(--wce-tier-elite)", fontWeight: 700, fontSize: 12 }}>Elite</span>
                  <span style={{ color: "var(--wce-tier-world)", fontWeight: 700, fontSize: 12 }}>World</span>
                  <span style={{ color: "var(--wce-tier-top)", fontWeight: 700, fontSize: 12 }}>Top</span>
                  <span style={{ color: "var(--wce-tier-strong)", fontWeight: 700, fontSize: 12 }}>Strong</span>
                </span>
              </div>
            </Card>
            <Card label="Gradients">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ height: 14, borderRadius: 6, background: "var(--wce-gradient-trination)" }} />
                <div style={{ height: 14, borderRadius: 6, background: "var(--wce-gradient-neon)" }} />
                <div style={{ height: 14, borderRadius: 6, background: "var(--wce-gradient-gold)" }} />
              </div>
            </Card>
          </div>
        </Section>

        {/* TYPE */}
        <Section id="type" kicker="03 · Type" title="Typography"
          why={<>Three voices: <b>Archivo Expanded</b> for sporty broadcast display, <b>Inter</b> for legible UI and labels, and <b>JetBrains Mono</b> for every number — always tabular, so ratings and ranks align in a column and never jitter as they update.</>}>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card label="Display — Archivo Expanded">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1.02 }}>
                Elo <span className="gold-text">ratings</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, textTransform: "uppercase", marginTop: 8 }}>We Are 26</div>
            </Card>
            <Card label="Body — Inter + Eyebrow">
              <Eyebrow live>Live Elo · every team</Eyebrow>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 10, marginBottom: 0, lineHeight: 1.5 }}>
                A continuous rating of every men's national team — results, opponent strength, home advantage.
              </p>
            </Card>
            <Card label="Numbers — JetBrains Mono, tabular" style={{ gridColumn: "span 2" }}>
              <div className="row" style={{ gap: 26 }}>
                <RatingValue value={2171} size="2xl" glow />
                <RatingValue value="+58" size="md" tone="green" />
                <RatingValue value="−35" size="md" tone="muted" />
                <span className="mono" style={{ color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>1879 · #16 · 62%</span>
              </div>
            </Card>
          </div>
        </Section>

        {/* SPACE */}
        <Section id="space" kicker="04 · Layout" title="Space, radius & elevation"
          why={<>An 8-pt rhythm with dense paddings keeps the <b>rankings table high on the page</b> — it is the hero artifact. Rounding is restrained (6–16px) and elevation is <b>border-driven</b>: hover lifts a hairline, not a shadow. The dark surface stack supplies depth.</>}>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card label="Radii">
              <div className="row">
                {[["6", "--radius-md"], ["8", "--radius-lg"], ["12", "--radius-xl"], ["16", "--radius-2xl"]].map(([n, v]) => (
                  <div key={v} style={{ textAlign: "center" }}>
                    <div style={{ width: 52, height: 44, background: "var(--surface-inset)", border: "1px solid var(--border-strong)", borderRadius: `var(${v})` }} />
                    <div className="mono" style={{ fontSize: 10, color: "var(--text-tertiary)", marginTop: 6 }}>{n}px</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card label="Spacing — 8pt scale">
              <div className="row" style={{ alignItems: "flex-end" }}>
                {[8, 12, 16, 24, 32].map((n) => (
                  <div key={n} style={{ textAlign: "center" }}>
                    <div style={{ width: 26, height: n, background: "var(--wce-gradient-gold)", borderRadius: 2 }} />
                    <div className="mono" style={{ fontSize: 10, color: "var(--text-tertiary)", marginTop: 6 }}>{n}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* COMPONENTS */}
        <Section id="components" kicker="05 · Components" title="Components & states"
          why={<>Primitives compose the product. Hover and press shift <b>color and border</b>, never scale; focus shows a neon-cyan ring. One gold primary button per view — gold is precious.</>}>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 12 }}>
            <Card label="Buttons — variant · size · state">
              <div className="row" style={{ marginBottom: 10 }}>
                <Button variant="primary" arrow>World Cup 2026</Button>
                <Button variant="secondary">Predict →</Button>
                <Button variant="ghost">Rankings</Button>
              </div>
              <div className="row">
                <Button variant="primary" size="sm">View team</Button>
                <Button variant="secondary" size="sm" disabled>Disabled</Button>
              </div>
            </Card>
            <Card label="Chips & badges">
              <div className="row">
                <Chip variant="confederation" confederation="UEFA" />
                <Chip variant="confederation" confederation="CONMEBOL" />
                <Chip variant="confederation" confederation="CAF" />
                <Chip variant="host">Host</Chip>
                <Chip variant="gold">Qualified</Chip>
                <span style={{ color: "var(--wce-gold-300)", fontSize: 12 }}>★★★</span>
              </div>
            </Card>
            <Card label="Input & segmented filter" style={{ gridColumn: "span 2" }}>
              <div className="row">
                <input placeholder="Search teams…" style={{ background: "var(--surface-inset)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "8px 12px", color: "var(--text-primary)", fontSize: 14, fontFamily: "var(--font-sans)", minWidth: 200 }} />
                <div style={{ display: "flex", gap: 4 }}>
                  {FILTERS.map((f) => (
                    <button key={f} onClick={() => setFilter(f)} style={{ fontSize: 11, fontWeight: 600, padding: "6px 10px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer", background: filter === f ? "var(--wce-gold)" : "var(--wce-white-05)", color: filter === f ? "#000" : "var(--text-secondary)" }}>
                      {f === "ALL" ? "All" : f}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr", marginBottom: 12 }}>
            <StatTile label="Current Elo" value="2171" accent="gold" />
            <StatTile label="Peak Elo" value="2171" sub="at peak" />
            <StatTile label="World Rank" value="#1" />
            <StatTile label="Confed" value="UEFA" />
          </div>
          <Card label="Data table — the hero artifact" style={{ marginBottom: 12, padding: 0 }}>
            <TeamRow rank={1} code="ESP" name="Spain" rating={2171} wcTitles={1} showConfederation confederation="UEFA" href="#" />
            <TeamRow rank={2} code="ARG" name="Argentina" rating={2113} wcTitles={3} showConfederation confederation="CONMEBOL" href="#" />
            <TeamRow rank={21} code="MEX" name="Mexico" rating={1834} confederation="CONCACAF" host showConfederation href="#" />
          </Card>
          <Card label="Win / draw / loss probability bar">
            <ProbabilityBar win={0.62} draw={0.21} loss={0.17} showLabels height={12} />
          </Card>
        </Section>

        {/* TICKER */}
        <Section id="ticker" kicker="06 · Motion piece" title="News ticker"
          why={<>The one overtly animated element: a black crawl under the tri-nation rule, fronted by a <b>magenta LIVE pulse</b>. It carries rating moves and fixtures. It pauses on hover and freezes entirely under reduced-motion.</>}>
          <div style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <NewsTicker label="LIVE" speed={26} items={TICKER} />
          </div>
        </Section>

        {/* MOTION */}
        <Section id="motion" kicker="07 · Motion" title="Motion principles"
          why={<>Subtle, sporty, purposeful. Color/border transitions at ~180ms; the only loops are the <b>live pulse</b> and the ticker marquee. No bounces, no parallax. Everything respects <b>prefers-reduced-motion</b>.</>}>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <Card label="Live pulse"><div className="row" style={{ minHeight: 30 }}><span className="wce-live-dot" /><span style={{ fontSize: 12, color: "var(--text-secondary)" }}>emerald · 2s</span></div></Card>
            <Card label="Magenta pulse"><div className="row" style={{ minHeight: 30 }}><span className="wce-live-dot" style={{ background: "var(--wce-neon-magenta)", boxShadow: "var(--wce-glow-magenta)" }} /><span style={{ fontSize: 12, color: "var(--text-secondary)" }}>ticker LIVE</span></div></Card>
            <Card label="Hover = color, not scale"><Button variant="secondary">Hover me</Button></Card>
          </div>
        </Section>

        {/* A11Y */}
        <Section id="a11y" kicker="08 · Accessibility" title="Accessibility"
          why={<>Dark-native with <b>AA-tuned</b> accent text (the “-text”/“-300” tokens), a visible <b>neon-cyan focus ring</b> via :focus-visible, and ≥44px touch targets. Numbers are tabular for scannability; color is never the only signal — tiers and outcomes also carry labels.</>}>
          <div className="sg-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card label="Focus-visible ring (Tab to it)">
              <div className="row">
                <button style={{ background: "var(--wce-white-05)", border: "1px solid var(--wce-white-10)", color: "var(--text-primary)", padding: "10px 16px", borderRadius: "var(--radius-md)", fontSize: 14, cursor: "pointer", minHeight: 44 }}>Focusable</button>
                <input placeholder="Focus me" style={{ background: "var(--surface-inset)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "10px 12px", color: "var(--text-primary)", fontSize: 14, minHeight: 44 }} />
              </div>
            </Card>
            <Card label="Touch targets ≥ 44px">
              <Button variant="primary" style={{ minHeight: 44 }}>44px tall</Button>
            </Card>
          </div>
        </Section>

        <footer style={{ paddingTop: 64, color: "var(--text-tertiary)", fontSize: 12 }}>
          <hr className="divider" style={{ marginBottom: 24 }} />
          World Cup Elo design system · tokens in <span className="mono">styles.css</span> · components under <span className="mono">window.WorldCupEloDesignSystem_6a6b1a</span>
        </footer>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
