/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/components/**/*.{vue,js,ts,jsx,tsx}',
  './src/views/*.{vue,js,ts,jsx,tsx'
];
export const theme = {
  extend: {
    colors: {
      green: '#408080',
      'black': '#0A0F14',
     
    }
  }
};
export const plugins = [];
export const darkMode = 'class';
