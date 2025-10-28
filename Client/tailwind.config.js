/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0d9488",
          secondary: "#14b8a6",
          dark: "#0f766e",
          light: "#5eead4",
        },
        sand: {
          50: "#fdfbf7",
          100: "#f8f4ed",
          200: "#f0e8d9",
          300: "#e8dcc5",
          400: "#d4c5a3",
          500: "#c0ae81",
        },
        slate: {
          850: "#1a2332",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
