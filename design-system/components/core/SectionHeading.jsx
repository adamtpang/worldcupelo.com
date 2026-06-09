import React from "react";

/**
 * SectionHeading — the standard section header: bold tracked title + a
 * muted one-line subtitle. Optionally a right-aligned slot (e.g. "Updated · Jun 2026").
 */
export function SectionHeading({ title, subtitle, size = "md", right, style, ...rest }) {
  const sizes = {
    sm: "18px",
    md: "24px",
    lg: "30px",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "16px",
        ...style,
      }}
      {...rest}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: sizes[size] || sizes.md,
            letterSpacing: "-0.015em",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              margin: "4px 0 0",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              color: "var(--text-tertiary)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {right && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--text-tertiary)",
            whiteSpace: "nowrap",
          }}
        >
          {right}
        </div>
      )}
    </div>
  );
}
