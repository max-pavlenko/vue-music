import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '@/store/auth';
import {RouteName, routes} from '@/app/shared/router/constants';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: 'text-[violet]',
})

router.beforeEach(({meta: {isProtected}}, _, next) => {
    const authStore = useAuthStore();
    if (isProtected && !authStore.isAuthenticated) {
        next({name: RouteName.HOME});
    }
    next();
});

export default router
