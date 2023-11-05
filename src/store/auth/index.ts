import {ref} from 'vue';
import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth', () => {
   const isAuthModalVisible = ref(false);
   const isAuthenticated = ref(false);
   
   return {
      isAuthModalVisible, isAuthenticated
   };
});

