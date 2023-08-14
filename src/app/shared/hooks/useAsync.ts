import {ref} from "vue";

export const useAsync = <T extends Array<any>>(cb: (...args: T) => Promise<any>) => {
   const state = ref<AsyncState>({
      isLoading: false,
      error: null,
      isSuccess: false,
   });

   async function execute(...args: T) {
      state.value.isLoading = true;
      cb(...args)
          .then(() => (state.value.isSuccess = true))
          .catch((e) => {
             state.value.error = e;
             throw e;
          })
          .finally(() => {
             state.value.isLoading = false;
          });
   }

   return {
      state,
      execute,
   };
}

export type AsyncState = {
   isLoading: boolean,
   error: null | Error
   isSuccess: boolean,
};
