/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./JS/main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};