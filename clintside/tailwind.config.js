/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins:['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        'card-hover': 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
      },
      borderRadius: {
        "home" : "64% 36% 65% 35% / 30% 62% 38% 70%",
      },
      backgroundImage: {
        'login': "url('/src/assets/LogIn.jpg')",
      },
    },
  },
  plugins: [],
}

