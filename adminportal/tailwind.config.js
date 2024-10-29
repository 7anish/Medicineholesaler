/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        'card-hover': 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
      },
    },
  },
  plugins: [],
}

