import { en } from '@formkit/i18n';
import { type DefaultConfigOptions } from '@formkit/vue';
import { generateClasses } from '@formkit/themes';
import { genesisIcons } from '@formkit/icons';
import { myTailwindTheme } from './tailwind-formkit.js';

const config: DefaultConfigOptions = {
  icons: {
    ...genesisIcons
  },
  config: {
    classes: generateClasses(myTailwindTheme),
    locales: { en },
    locale: 'en'
  }
};

export default config;
