/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#5046e4",
          secondary: "#8784d7",
        },
        purple: {
          200: "#d9ddee",
          500: "#8784d7",
          600: "#4f44e5",
        },
      },
    },
  },
  plugins: [],
};
