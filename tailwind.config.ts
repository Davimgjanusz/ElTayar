import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "el-red": {
          50: "#FEF2F2",
          600: "#E11D2A",
          700: "#B91C1C",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          600: "#475569",
          900: "#0F172A",
          950: "#020617",
        },
        stone: {
          200: "#E7E5E4",
        },
        sand: {
          100: "#F5EFE6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "82rem",
      },
    },
  },
};

export default config;
