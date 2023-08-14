import {RouteRecordRaw} from "vue-router";

export enum RouteName {
   HOME = 'home',
   ABOUT = 'about',
   MANAGE = 'manage',
   SONG = 'song',
   NOT_FOUND = 'not-found',
}

export const routes: RouteRecordRaw[] = [
   {
      path: '/',
      name: RouteName.HOME,
      component: () => import('../views/HomeView.vue')
   },
   {
      path: '/about',
      name: RouteName.ABOUT,
      component: () => import('../views/AboutView.vue')
   },
   {
      path: '/manage',
      alias: '/manage-music',
      name: RouteName.MANAGE,
      meta: {isProtected: true},
      component: () => import('../views/ManageView.vue')
   },
   {
      path: '/song/:id',
      name: RouteName.SONG,
      component: () => import('../views/SongView.vue'),
   },
   {
      name: RouteName.NOT_FOUND,
      path: '/:catchAll(.*)*',
      redirect: {name: 'home'},
   }
]
