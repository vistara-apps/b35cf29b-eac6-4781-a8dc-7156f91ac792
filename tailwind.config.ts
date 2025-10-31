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
        bg: "var(--color-bg)",
        fg: "var(--color-fg)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
      },
      borderRadius: {
        lg: "16px",
        md: "10px",
        sm: "6px",
      },
      boxShadow: {
        card: "0 8px 24px hsla(221, 83%, 53%, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
