import './styles/main.css';
import 'nprogress/nprogress.css';
import 'vue-toastification/dist/index.css';
import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import router from './app/shared/router';
import {setupValidation} from '@/app/shared/config/validation';
import Toast from 'vue-toastification';
import {TOAST_CONFIG} from '@/app/shared/config/toast';
import {auth} from '@/includes/firebase';
import {Icon} from '@/directives/Icon';
import i18n from '@/includes/i18n';
import {registerSW} from 'virtual:pwa-register';
import createNProgress from '@/includes/NProgress';

registerSW({immediate: true});
createNProgress(router);

let app: App<Element> | undefined;
auth.onAuthStateChanged(() => {
   if (app) return;
   setupValidation();
   app = createApp(App)
       .use(router)
       .use(Toast, TOAST_CONFIG)
       .use(createPinia())
       .use(i18n)
       .directive('icon', Icon)
       .mount('#app');
})
