/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mcolor: "#183059",
        pcolor: "#276FBF",
        fontFamily: {
          pretendard: ["var(--font-pretendard)", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
};
