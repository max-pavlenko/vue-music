import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from "@/stores/auth";
import {routes} from "@/router/constants";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: 'text-[violet]',
})

router.beforeEach(({meta: {isProtected}}, from, next) => {
    const authStore = useAuthStore();
    if (isProtected && !authStore.isAuthenticated) {
        next({name: 'home'});
    }
    next();
});

export default router
