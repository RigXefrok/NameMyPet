/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        header: {
          dark: '#8e44ad',
          light: '#9b59b6',
        },
        section: {
          dark: '#4b4b4b',
        },
        suggestion: {
          c: '#ED4C67',
          r: '#1289A7',
          s: '#EE5A24',
        },
      },
    },
  },
  plugins: [],
}
