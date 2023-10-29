import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { plugin, defaultConfig } from '@formkit/vue';
import config from '../formkit.config';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';

import se from './locales/se.json';
import en from './locales/en.json';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: en,
    se: se
  }
});

const app = createApp(App);

app.use(PrimeVue);
app.use(plugin, defaultConfig(config));
app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
