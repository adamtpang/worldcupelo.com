import React from "react";

/**
 * Button — worldcupelo.com's button.
 * Variants: primary (trophy-gold gradient, black text), secondary (glass),
 * ghost (transparent → faint white on hover). Sizes: sm, md.
 * Color-only hover/press, no scale. Pass `arrow` to append a → glyph.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  disabled = false,
  href,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: "6px 12px", fontSize: "12px", radius: "var(--radius-md)" },
    md: { padding: "8px 16px", fontSize: "14px", radius: "var(--radius-md)" },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-sans)",
    fontWeight: variant === "primary" ? 700 : variant === "secondary" ? 500 : 500,
    fontSize: s.fontSize,
    lineHeight: 1,
    padding: s.padding,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  const variants = {
    primary: {
      background: "linear-gradient(180deg, var(--wce-gold-bright), var(--wce-gold))",
      color: "#000",
    },
    secondary: {
      background: "var(--wce-white-05)",
      borderColor: "var(--wce-white-10)",
      color: "var(--text-primary)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
    },
  };

  const [hover, setHover] = React.useState(false);
  const hoverStyles = {
    primary: { background: "linear-gradient(180deg, #f6da6a, var(--wce-gold-bright))" },
    secondary: { background: "var(--wce-white-10)" },
    ghost: { background: "var(--wce-white-05)", color: "var(--text-primary)" },
  };

  const composed = {
    ...base,
    ...variants[variant],
    ...(hover && !disabled ? hoverStyles[variant] : null),
    ...style,
  };

  const content = (
    <>
      {children}
      {arrow && <span aria-hidden style={{ opacity: 0.8 }}>→</span>}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  if (href && !disabled) {
    return (
      <a href={href} style={composed} onClick={onClick} {...handlers} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} style={composed} onClick={onClick} {...handlers} {...rest}>
      {content}
    </button>
  );
}
