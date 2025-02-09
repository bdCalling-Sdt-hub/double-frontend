/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      fontOne: ["Sora", "sans-serif"],
      fontTwo: ["Poppins", "sans-serif"],
      fontThree: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#173616",
      },
    },

    extend: {},
  },
  plugins: [],
};
