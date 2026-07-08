/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1F3D2B",
          light: "#2C5140",
          dark: "#152A1D",
        },
        cream: "#FAF6EC",
        wheat: "#EFE4C4",
        gold: {
          DEFAULT: "#D9A441",
          dark: "#B8842E",
        },
        clay: "#B5651D",
        sky: "#4F86A0",
        ink: "#26301F",
        furrow: "#DCCFA6",
        "fg-green": {
          DEFAULT: "#2F6B41",
          dark: "#234F30",
        },
        "fg-cream": "#F6F7F5",
        "fg-critical": "#DC2626",
        "fg-warning": "#F59E0B",
        "fg-info": "#3B82F6",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "field-rows":
          "repeating-linear-gradient(180deg, rgba(31,61,43,0.05) 0px, rgba(31,61,43,0.05) 2px, transparent 2px, transparent 10px)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
