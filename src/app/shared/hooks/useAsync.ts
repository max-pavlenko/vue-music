import {reactive} from 'vue';

export const useAsync = <T extends Array<any>>(cb: (...args: T) => Promise<any>) => {
   const state = reactive<AsyncState>({
      isLoading: false,
      error: null,
      isSuccess: false,
   });
   
   async function execute(...args: T) {
      state.isLoading = true;
      return cb(...args)
          .then(() => (state.isSuccess = true))
          .catch((e) => {
             state.error = e;
             throw e;
          })
          .finally(() => {
             state.isLoading = false;
          });
   }
   
   return {
      state,
      execute,
   };
};

export type AsyncState = {
   isLoading: boolean,
   error: null | Error
   isSuccess: boolean,
};
