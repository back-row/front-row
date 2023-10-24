/** @type {import('tailwindcss').Config} */
const FormKitVariants = require('@formkit/themes/tailwindcss');

export const content = [
  './index.html',
  './src/components/**/*.{vue,js,ts,jsx,tsx}',
  './src/views/*.{vue,js,ts,jsx,tsx',
  './tailwind-formkit.js'
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
      grayDarkBackRow: '#18222B',
      grayLightBackRow: '#2C3540'
    },
    width: {
      128: '32rem'
    }
  }
};
export const plugins = [FormKitVariants];
export const darkMode = 'class';
