import 'vue-router';

declare module 'vue-router' {
   interface RouteMeta {
      isProtected?: boolean
   }
}
