/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Every section declares data-tone="ink" | "paper"; these resolve per section.
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      transitionTimingFunction: {
        swift: "cubic-bezier(.7,0,.2,1)",
      },
    },
  },
  plugins: [],
};
