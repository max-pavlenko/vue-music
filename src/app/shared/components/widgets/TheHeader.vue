<template>
	<header class="bg-gray-700">
		<nav class="container mx-auto flex items-center py-5 px-4 text-white">
			<RouterLink :to="{name: RouteName.HOME}" class="font-bold uppercase text-2xl mr-6">
				Music
			</RouterLink>
			<div class="flex gap-4">
				<button v-if="!isAuthenticated" @click="toggleAuthModalVisibility">
					Login / Register
				</button>
				<template v-else>
					<RouterLink :to="{name: RouteName.MANAGE}">Manage</RouterLink>
					<button @click="logOut">Log out</button>
				</template>
				<RouterLink :to="RouteName.ABOUT">About</RouterLink>
			</div>
		</nav>
	</header>
</template>

<script lang="ts" setup>
import {useAuthStore} from '@/store/auth';
import {storeToRefs} from 'pinia';
import {RouteName} from '@/app/shared/router/constants';
import {useAuthStoreActions} from '@/store/auth/actions';

const authStore = useAuthStore();
const {toggleAuthModalVisibility, logOut} = useAuthStoreActions();
const {isAuthenticated} = storeToRefs(authStore);
</script>
