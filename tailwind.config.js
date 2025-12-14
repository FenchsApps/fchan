/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chan-bg': '#FFFFEE',
        'chan-header': '#800000',
        'chan-link': '#0000EE',
        'chan-post-bg': '#F0E0D6',
        'chan-post-border': '#D9BFB7',
        'chan-name': '#117743',
        'chan-subject': '#CC1105',
      },
      fontFamily: {
        'chan': ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

