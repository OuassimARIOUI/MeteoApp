/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3555e3',
        gold: '#FFD700',
        'background-light': '#f6f6f8',
        'background-dark': '#0a0c14',
        'accent-purple': '#2d1b4d',
      },
      fontFamily: {
        display: ['Inter', 'Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
