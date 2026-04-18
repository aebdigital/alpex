import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#15171a",
        steel: "#303741",
        signal: "#d71920",
        sunline: "#f5c542",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(21, 23, 26, 0.12)",
        lift: "0 18px 48px rgba(21, 23, 26, 0.18)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 240ms ease-out both",
        slideUp: "slideUp 320ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
