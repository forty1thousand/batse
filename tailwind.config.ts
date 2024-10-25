import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: "ui-monospace, SF Mono, SFMono-Regular, Roboto Mono, Menlo, monospace",
        sans: "-apple-system, ui-sans-serif, system-ui, BlinkMacSystemFont, helvetica, sans-serif",
        display: "var(--display)",
      },
      boxShadow: {
        "inner-left": "inset 10px 0 10px -10px rgba(0 0 0 / 0.1)",
        "inner-right": "inset -10px 0 10px -10px rgba(0 0 0 / 0.1 )",
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
        outline: "rgb(0 125 255 / <alpha-value>)",
        destructive: "rgb(250 60 41 / <alpha-value>)",
        warn: "rgb(255 194 26 / <alpha-value>)",
      },
      animation: {
        step: "spin 750ms steps(8) infinite",
      },
      keyframes: {
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};

export default config;
