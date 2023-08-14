import Router from "@/router";
import NProgress from "nprogress";
import {NavigationGuard, NavigationHookAfter} from "vue-router";

export default (router: typeof Router) => {
   NProgress.configure({showSpinner: false, trickle: true})

   const beforeEach: NavigationGuard = (to, from, next) => {
      if (to.name) {
         NProgress.start()
      }
      next()
   }
   const afterEach: NavigationHookAfter = (to, from) => {
      NProgress.done()
   }

   router.beforeEach(beforeEach)
   router.afterEach(afterEach)
}
