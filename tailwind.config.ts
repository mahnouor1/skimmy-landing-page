import type { Config } from "tailwindcss";

// Brand tokens. Loaded by Tailwind v4 through `@config` in app/globals.css.
// gold.logo / ink.logo are sampled from public/logo.jpg.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF4E4",
          light: "#FFFDF8",
          glow: "#F6E3B0",
          line: "#EADFC6",
          muted: "#F3EEE3",
        },
        gold: {
          DEFAULT: "#E3A72F",
          dark: "#C98A14",
          // Text-safe gold: >= 3:1 on cream for large headings.
          deep: "#A36F0C",
          logo: "#B58E31",
        },
        ink: {
          DEFAULT: "#1B1B1F",
          body: "#3A3A40",
          muted: "#6A6A72",
          logo: "#2B2B2B",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        btn: "12px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(27,27,31,0.04), 0 12px 32px -12px rgba(27,27,31,0.12)",
        lift: "0 2px 4px rgba(27,27,31,0.04), 0 24px 60px -20px rgba(27,27,31,0.22)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
};

export default config;
