import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1320px" }
    },
    extend: {
      colors: {
        navy: { DEFAULT: "#04092F", 950: "#04092F" },
        royal: { DEFAULT: "#000B65", 900: "#000B65" },
        electric: { DEFAULT: "#0000FD", 600: "#0000FD" },
        sky: { DEFAULT: "#7DC7E2", 300: "#7DC7E2" },
        soft: { DEFAULT: "#EFEFEF" }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6.4vw, 5.75rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(1.85rem, 4vw, 3.4rem)", { lineHeight: "1.05" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.1" }]
      },
      boxShadow: {
        card: "0 12px 40px -16px rgba(4,9,47,0.18)",
        glow: "0 0 0 1px rgba(0,0,253,0.15), 0 18px 60px -20px rgba(0,0,253,0.45)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(4,9,47,0) 0%, rgba(4,9,47,0.85) 100%)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "hero-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.18)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "marquee": "marquee 40s linear infinite",
        "hero-zoom": "hero-zoom 14s ease-in-out infinite alternate"
      }
    }
  },
  plugins: []
};

export default config;
