// World Cup Elo emblem: a gold coin holding three ascending host-color bars
// (rising Elo + the three 2026 hosts: Canada red, Mexico green, USA blue),
// crowned by a gold spark. Original mark, trademark-safe.
export default function Emblem({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="World Cup Elo emblem"
      className={className}
    >
      <defs>
        <linearGradient
          id="wceGold"
          x1="8"
          y1="6"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4D04A" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#B78821" />
        </linearGradient>
        <radialGradient id="wceSpark" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#FFF2C2" />
          <stop offset="1" stopColor="#D4AF37" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#0A0A0B" />
      <circle cx="32" cy="32" r="30" stroke="url(#wceGold)" strokeWidth="3" />
      <circle
        cx="32"
        cy="32"
        r="25.5"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeOpacity="0.25"
      />
      <rect x="17.5" y="32" width="7" height="13" rx="3" fill="#E4002B" />
      <rect x="28.5" y="24" width="7" height="21" rx="3" fill="#2ECC71" />
      <rect x="39.5" y="17" width="7" height="28" rx="3" fill="#3B82F6" />
      <circle cx="43" cy="15" r="4.5" fill="url(#wceSpark)" />
      <circle
        cx="43"
        cy="15"
        r="4.5"
        stroke="#FFF2C2"
        strokeOpacity="0.6"
        strokeWidth="0.75"
      />
      <rect
        x="16.5"
        y="46.5"
        width="31"
        height="1.6"
        rx="0.8"
        fill="#D4AF37"
        fillOpacity="0.4"
      />
    </svg>
  );
}
