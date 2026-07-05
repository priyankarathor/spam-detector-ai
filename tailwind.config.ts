import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        signal: {
          DEFAULT: "#6D5EF9",
          cyan: "#22D3EE",
          violet: "#6D5EF9",
        },
        safe: {
          DEFAULT: "#10B981",
          soft: "#34D399",
        },
        spam: {
          DEFAULT: "#F43F5E",
          soft: "#FB7185",
        },
        surface: {
          dark: "#0B0F1A",
          darkAlt: "#0F1524",
          light: "#F5F7FB",
          lightAlt: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "signal-gradient": "linear-gradient(135deg, #6D5EF9 0%, #22D3EE 100%)",
        "signal-gradient-soft": "linear-gradient(135deg, rgba(109,94,249,0.15) 0%, rgba(34,211,238,0.15) 100%)",
        "mesh-dark": "radial-gradient(at 20% 20%, rgba(109,94,249,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34,211,238,0.2) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(244,63,94,0.08) 0px, transparent 50%)",
        "mesh-light": "radial-gradient(at 20% 20%, rgba(109,94,249,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34,211,238,0.12) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(244,63,94,0.05) 0px, transparent 50%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(11, 15, 26, 0.24)",
        glow: "0 0 40px -8px rgba(109, 94, 249, 0.55)",
        "glow-cyan": "0 0 40px -8px rgba(34, 211, 238, 0.5)",
        "glow-safe": "0 0 40px -8px rgba(16, 185, 129, 0.45)",
        "glow-spam": "0 0 40px -8px rgba(244, 63, 94, 0.45)",
      },
      animation: {
        scan: "scan 2.2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0%)", opacity: "0.3" },
          "50%": { transform: "translateY(100%)", opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "80%, 100%": { transform: "scale(1.6)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      borderRadius: {
        "2.5xl": "1.375rem",
      },
    },
  },
  plugins: [],
};

export default config;
