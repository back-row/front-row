/** @type {import('tailwindcss').Config} */ module.exports = {
  content: [
    './index.html',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './src/views/*.{vue,js,ts,jsx,tsx',
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  darkMode: 'class'
};
