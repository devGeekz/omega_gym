/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-satoshi)"],
      },
      animation: {
        "slide-left": "slide-left 40s linear infinite",
        "slide-left-mobile": "slide-left-mobile 30s linear infinite",
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-100%)" },
        },
        "slide-left-mobile": {
          "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
