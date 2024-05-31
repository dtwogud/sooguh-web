import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      pd: ["var(--font-pair-display)"],
    },
    screens: {
      sm: { max: "640px" },
      lg: { min: "640px" },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "key-color": "var(--color-key-color)",
      "key-color-alpha-80": "var(--color-key-color-alpha-80)",
      "key-color-alpha-60": "var(--color-key-color-alpha-60)",
      "key-color-alpha-40": "var(--color-key-color-alpha-40)",
      "key-color-alpha-20": "var(--color-key-color-alpha-20)",
      dark: "var(--color-dark)",
      filterBlack: "var(--color-filter-black)",
      black: "var(--color-black)",
      darkGrey: "var(--color-darkGrey)",
      filterGrey: "var(--color-filterGrey)",
      grey: "var(--color-grey)",
      white: "var(--color-white)",
      textWhite: "var(--color-textWhite)",
      "system-grey": "var(--color-system-grey)",
      "system-grey-02": "var(--color-system-grey-02)",
      "system-grey-03": "var(--color-system-grey-03)",
      "system-grey-04": "var(--color-system-grey-04)",
      "system-grey-05": "var(--color-system-grey-05)",
      "system-grey-06": "var(--color-system-grey-06)",
      "system-grey-06-50-no-alpha": "var(--color-system-grey-06-50-no-alpha)",
      "system-grey-border": "var(--color-system-grey-border)",
      highlight: "var(--color-highlight)",
      error: "var(--color-error)",
      "error-70-no-alpha": "var(--color-error-70-no-alpha)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
};
export default config;
