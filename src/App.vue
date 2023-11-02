<script setup lang="ts">
import TheHeader from '@/app/shared/components/widgets/TheHeader.vue';
import TheAuthModal from '@/app/shared/components/widgets/AuthModal.vue';
import {useAuthStore} from '@/store/auth';
import {toRefs} from 'vue';
import {auth} from '@/includes/firebase';
import Player from '@/app/features/player/components/Player.vue';

const {isAuthenticated} = toRefs(useAuthStore());
isAuthenticated.value = !!auth.currentUser;

</script>

<template>
	<TheHeader/>
	<RouterView v-slot="{Component}">
		<Transition name="fade" mode="out-in">
			<component :is="Component"/>
		</Transition>
	</RouterView>
	<Player/>

	<TheAuthModal/>
</template>
