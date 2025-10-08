/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7b2cbf', // warm purple
          400: '#9b4de0',
          500: '#7b2cbf',
          600: '#ff7a18', // orange accent for gradient
          700: '#e85d04'
        },
        accent: {
          DEFAULT: '#ff7a18'
        }
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #7b2cbf 0%, #ff7a18 100%)'
      }
    },
  },
  plugins: [],
}
