/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Add this line
  theme: {
    extend: {
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        // Add these colors
        light: {
          background: "#ffffff",
          text: "#141414",
          card: "#f5f5f5",
        },
        dark: {
          background: "#141414",
          text: "#ffffff",
          card: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
};
