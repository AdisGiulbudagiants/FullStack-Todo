/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins-light": ["Poppins", "sans-serif"],
        "poppins-medium": ["Poppins", "sans-serif"],
        "poppins-semiBold": ["Poppins", "sans-serif"],
      },
      fontWeight: {
        "poppins-light": 300,
        "poppins-medium": 500,
        "poppins-semiBold": 600,
      },
    },
  },
  plugins: [],
}
