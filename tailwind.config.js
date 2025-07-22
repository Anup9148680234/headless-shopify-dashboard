/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // required for next-themes to work
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
