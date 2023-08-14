import {ref} from 'vue'
import {defineStore} from 'pinia'
import {auth, usersCollection} from "@/includes/firebase";
import {useRoute, useRouter} from "vue-router";
import {LOGIN_SCHEMA, REGISTER_SCHEMA} from "@/app/features/auth/constants/schemas";
import {toastError} from "@/app/shared/config/toast";

export const useAuthStore = defineStore('auth', () => {
    const isAuthModalVisible = ref(false);
    const isAuthenticated = ref(false);
    const route = useRoute();
    const {push} = useRouter();

    function toggleIsAuthModalVisible() {
        isAuthModalVisible.value = !isAuthModalVisible.value;
        console.log(isAuthModalVisible.value, 'isAuthModalVisible.value')
    }

    async function register(values: typeof REGISTER_SCHEMA) {
        try {
            const {user} = await auth.createUserWithEmailAndPassword(values.email, values.password);
            auth.currentUser?.updateProfile({
                displayName: values.displayName,
            });
            await usersCollection.doc(user?.uid).set({...values,});
            isAuthenticated.value = true;
            toggleIsAuthModalVisible();
        } catch (e) {
            toastError(e);
        }
    }


    async function login({password, email}: typeof LOGIN_SCHEMA) {
        try {
            const {user} = await auth.signInWithEmailAndPassword(email, password);
            user && await usersCollection.doc(user.uid).get();
            isAuthenticated.value = true;
            toggleIsAuthModalVisible();
        } catch (e) {
            toastError(e);
        }
    }

    async function logOut() {
        await auth.signOut();
        if (route.meta?.isProtected) await push({name: 'home'});
        isAuthenticated.value = false;
    }

    return {
        isAuthModalVisible, isAuthenticated, toggleIsAuthModalVisible,
        register, login, logOut,
    };
})
