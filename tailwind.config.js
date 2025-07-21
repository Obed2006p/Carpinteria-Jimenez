/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'brand-brown': '#A0522D',
        'brand-cream': '#F5F5DC',
        'brand-dark': '#3D2B1F',
        'brand-light-gray': '#F9F9F9',
      }
    }
  },
  plugins: [],
}