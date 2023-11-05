import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import {ComposerOptions, createI18n} from 'vue-i18n';

export default createI18n({
   locale: 'fr',
   fallbackLocale: 'en',
   messages: {
      en,
      fr,
   },
   numberFormats: {
      en: {
         style: 'currency',
         currency: 'USD',
      },
      fr: {
         style: 'currency',
         currency: 'EUR',
      },
   } as ComposerOptions['numberFormats']
})
