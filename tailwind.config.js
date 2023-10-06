/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/components/**/*.{vue,js,ts,jsx,tsx}',
  './src/views/*.{vue,js,ts,jsx,tsx'
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Fredoka', 'sans-serif']
    },
    colors: {
      greenBackrow: '#408080',
      blackBackrow: '#0A0F14',
      whiteBackRow: '#E5E5E5'
    }
  }
};
export const plugins = [];
export const darkMode = 'class';
