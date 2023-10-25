/** @type {import('tailwindcss').Config} */
const FormKitVariants = require('@formkit/themes/tailwindcss');

export const content = [
  './index.html',
  './src/components/**/*.{vue,js,ts,jsx,tsx}',
  './src/views/*.{vue,js,ts,jsx,tsx',
  './tailwind-formkit.ts'
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
    },
    width: {
      128: '32rem'
    }
  }
};
export const plugins = [FormKitVariants];
export const darkMode = 'class';
