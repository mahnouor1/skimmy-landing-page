import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#B58E31",
          light: "#C9A84C",
          dark: "#8B6B1E",
          muted: "#B58E3120",
        },
        ink: {
          DEFAULT: "#0F0F0F",
          soft: "#2C2C2C",
          muted: "#6B6B6B",
          faint: "#9E9E9E",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F7F6F3",
          border: "#E8E4DC",
          dark: "#111111",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      animation: {
        "wave": "wave 2s ease-in-out infinite",
        "wave-delay-1": "wave 2s ease-in-out infinite 0.2s",
        "wave-delay-2": "wave 2s ease-in-out infinite 0.4s",
        "wave-delay-3": "wave 2s ease-in-out infinite 0.6s",
        "wave-delay-4": "wave 2s ease-in-out infinite 0.8s",
        "wave-delay-5": "wave 2s ease-in-out infinite 1s",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(0.3)", opacity: "0.4" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
