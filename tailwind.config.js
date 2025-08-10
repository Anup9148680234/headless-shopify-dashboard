/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // required for next-themes to work
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
         wine: "#722F37",
        beige: "#F5EBDD",
        'accent-gold': "#FFD700"
      },
      boxShadow: {
  glass: '0 4px 24px rgba(114,47,55,0.18)',
}
    },
   
  },
  plugins: [ require('tailwind-scrollbar'),],
};

