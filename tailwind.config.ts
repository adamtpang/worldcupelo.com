import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        gold: {
          DEFAULT: "#d4af37",
          50: "#fdf9ed",
          100: "#faf0cd",
          200: "#f3df96",
          300: "#ecc85d",
          400: "#e6b337",
          500: "#d4af37",
          600: "#b78821",
          700: "#92651e",
          800: "#7a5220",
          900: "#684520",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
