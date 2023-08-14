<script setup lang="ts">
import TheHeader from "@/app/shared/components/layout/TheHeader.vue";
import TheAuthModal from "@/app/shared/components/layout/TheAuthModal/TheAuthModal.vue";
import {useAuthStore} from "@/stores/auth";
import {toRefs} from "vue";
import {auth} from "@/includes/firebase";
import Player from "@/app/features/player/components/Player.vue";

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
