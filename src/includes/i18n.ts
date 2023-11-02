import {createI18n} from 'vue-i18n';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

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
   }
})
