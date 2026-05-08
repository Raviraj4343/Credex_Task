import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10212b",
        cloud: "#f6f4ef",
        coral: "#ff6b4a",
        mint: "#c7f2d2",
        ocean: "#0d5c63",
        sand: "#f0dcc4"
      },
      fontFamily: {
        sans: ["'Avenir Next'", "'Segoe UI'", "sans-serif"],
        display: ["'Trebuchet MS'", "'Avenir Next'", "'Segoe UI'", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 32px rgba(16, 33, 43, 0.08)"
      },
      backgroundImage: {
        radialHero:
          "linear-gradient(180deg, #fcfaf6 0%, #f4efe8 100%)"
      }
    }
  },
  plugins: []
};

export default config;
