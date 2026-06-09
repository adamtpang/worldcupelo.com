// Header — sticky blurred nav with the worldcupelo lockup.
const { Logo: WCELogo } = window.WorldCupEloDesignSystem_6a6b1a;

function Header({ route, onNavigate, kickoffDays }) {
  const NavLink = ({ id, children }) => {
    const active = route === id || (id === "rankings" && route === "home");
    const [hover, setHover] = React.useState(false);
    return (
      <button
        onClick={() => onNavigate(id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? "var(--wce-white-05)" : "transparent",
          border: "none",
          color: active ? "var(--text-primary)" : hover ? "var(--text-primary)" : "var(--text-secondary)",
          fontSize: "13px",
          fontWeight: 500,
          padding: "6px 12px",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          transition: "all var(--duration-base) var(--ease-standard)",
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border-default)",
        background: "rgba(10,10,11,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 24px",
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <WCELogo size="md" />
        </button>
        <nav style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <NavLink id="rankings">Rankings</NavLink>
          <NavLink id="worldcup">World Cup 2026</NavLink>
          <NavLink id="compare">Predict</NavLink>
          <NavLink id="methodology">Method</NavLink>
        </nav>
      </div>
    </header>
  );
}

window.Header = Header;
