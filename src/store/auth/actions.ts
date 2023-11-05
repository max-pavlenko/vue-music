import {toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {AuthValidationSchema} from '@/app/features/auth/models/validation';
import {auth, usersCollection} from '@/includes/firebase';
import {toastError} from '@/app/shared/config/toast';
import {RouteName} from '@/app/shared/router/constants';
import {useAuthStore} from '@/store/auth/index';
import {StoreActions} from '@/app/shared/types/utility';

export const useAuthStoreActions = () => {
   const authStore = toRefs(useAuthStore());
   const route = useRoute();
   const {push} = useRouter();
   
   function toggleAuthModalVisibility() {
      authStore.isAuthModalVisible.value = !authStore.isAuthModalVisible.value;
   }
   
   return {
      toggleAuthModalVisibility,
      login: async ({password, email}: AuthValidationSchema['LOGIN']) => {
         try {
            const {user} = await auth.signInWithEmailAndPassword(email, password);
            user && await usersCollection.doc(user.uid).get();
            authStore.isAuthenticated.value = true;
            toggleAuthModalVisibility();
         } catch (e) {
            toastError(e);
         }
      },
      register: async (values: AuthValidationSchema['REGISTER']) => {
         try {
            const {user} = await auth.createUserWithEmailAndPassword(values.email, values.password);
            toggleAuthModalVisibility();
            auth.currentUser?.updateProfile({
               displayName: values.displayName,
            });
            authStore.isAuthenticated.value = true;
            await usersCollection.doc(user?.uid).set({...values,});
         } catch (e) {
            toastError(e);
         }
      },
      logOut: async () => {
         await auth.signOut();
         if (route.meta?.isProtected) await push({name: RouteName.HOME});
         authStore.isAuthenticated.value = false;
      },
   } satisfies StoreActions;
};
