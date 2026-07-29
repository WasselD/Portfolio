/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#050816",
          light: "#F8FAFC",
        },
        card: {
          DEFAULT: "#0F172A",
          light: "#FFFFFF",
        },
        primary: "#3B82F6",
        accent: "#06B6D4",
        success: "#22C55E",
        ink: {
          DEFAULT: "#FFFFFF",
          light: "#0F172A",
        },
        muted: {
          DEFAULT: "#94A3B8",
          light: "#475569",
        },
        hairline: "rgba(255,255,255,.08)",
        "hairline-light": "rgba(15,23,42,.08)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        lg2: "24px",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(59,130,246,0.5)",
        "glow-cyan": "0 0 60px -15px rgba(6,182,212,0.45)",
        card: "0 8px 30px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #050816), linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
      },
      animation: {
        "gradient-shift": "gradient-shift 12s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
