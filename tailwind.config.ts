import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "430px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        platinum: "#EAEAEA",
        "platinum-10": "rgba(234, 234, 234, 0.10)",
        gold: "#B49B56",
        silver: "#ABABAB",
        white: "#fff",
        whiteSmoke: "#f5f5f5",
        dark: "#1c1c1b",
        "dark-10": "rgba(28, 28, 27, 0.10)",
      },
    },
  },
  // plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
