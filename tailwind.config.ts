import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12100f",
        paper: "#fbf7ef",
        frame: "#f2eadc",
        reel: "#25211f",
        ember: "#ce5a35",
        gold: "#d69e2e",
        sage: "#5f7560",
        teal: "#2f6f73",
        plum: "#6e476d",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(18, 16, 15, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
