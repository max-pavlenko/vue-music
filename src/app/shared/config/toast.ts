import {PluginOptions, POSITION, useToast} from 'vue-toastification';
import {isFirebaseError} from '@/app/shared/types/guards';

export const TOAST_CONFIG: PluginOptions = {
   position: POSITION.TOP_RIGHT,
   timeout: 5000,
   closeOnClick: true,
   pauseOnFocusLoss: true,
   pauseOnHover: true,
   draggable: true,
   draggablePercent: 0.6,
   showCloseButtonOnHover: true,
   closeButton: "button",
   icon: true,
   transition: "Vue-Toastification__fade",
   maxToasts: 20,
   newestOnTop: true
}

export function toastError(e: any, defaultMessage = `Error Code: ${e.code}`) {
   const {error} = useToast();
   const errorMessage = isFirebaseError(e) ? e.message : defaultMessage;
   error(errorMessage);
}
