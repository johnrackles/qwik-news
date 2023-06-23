/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Verdana", "Geneva", "sans-serif"],
      },
      /*  colors: {
         primary: '#FF6600',
         secondary: '#f6f6ef',
         grey: '#828282',
       } */
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: { themes: ["light", "dark"] },
};
