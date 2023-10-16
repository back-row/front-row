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
      greenBackRow: '#408080',
      blackBackRow: '#0A0F14',
      whiteBackRow: '#E5E5E5',
      grayBackRow: '#2C3540'
    }
  }
};
export const plugins = [];
export const darkMode = 'class';
