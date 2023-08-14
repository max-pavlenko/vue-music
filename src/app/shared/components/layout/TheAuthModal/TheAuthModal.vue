<template>
	<div class="fixed z-10 inset-0 overflow-y-auto" :class="modalClass" id="modal">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 transition-opacity" @click.stop="toggleIsAuthModalVisible">
				<div class="absolute inset-0 bg-gray-800 opacity-75"></div>
			</div>

			<span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

			<div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl
          transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div class="py-4 text-left px-6">
					<div class="flex justify-between items-center pb-4">
						<p class="text-2xl font-bold">Your Account</p>
						<div class="modal-close cursor-pointer z-50" @click="toggleIsAuthModalVisible">
							<i class="fas fa-times" />
						</div>
					</div>

					<ul class="flex flex-wrap mb-4">
						<li class="flex-auto text-center">
							<button class="block w-full rounded py-3 px-4 transition " :class="authLinksClass(AuthMode.LOGIN)"
									@click="currentAuthTab = AuthMode.LOGIN">
								Login
							</button>
						</li>
						<li class="flex-auto text-center">
							<button class="block w-full rounded py-3 px-4 transition" :class="authLinksClass(AuthMode.REGISTER)"
									@click="currentAuthTab = AuthMode.REGISTER">
								Register
							</button>
						</li>
					</ul>

					<Transition name="fade" mode="out-in">
						<FormLogin v-if="isCurrentAuthMode(AuthMode.LOGIN)"/>
						<FormRegister v-else-if="isCurrentAuthMode(AuthMode.REGISTER)"/>
					</Transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth";
import {computed, ref} from "vue";
import {AuthMode} from "@/app/shared/components/layout/TheAuthModal/types";
import FormLogin from "@/app/features/auth/components/FormLogin.vue";
import FormRegister from "@/app/features/auth/components/FormRegister.vue";

const currentAuthTab = ref(AuthMode.LOGIN);

const isCurrentAuthMode = computed(() => (mode: AuthMode) => {
	return mode === currentAuthTab.value;
});
const authLinksClass = computed(() => (mode: AuthMode) => {
	const isCurrentMode = isCurrentAuthMode.value(mode);
	return {
		'hover:text-white text-white bg-blue-600': isCurrentMode,
		'hover:text-blue-600': !isCurrentMode,
	};
});

const authStore = useAuthStore();
const {toggleIsAuthModalVisible} = authStore;
const {isAuthModalVisible} = storeToRefs(authStore);

const modalClass = computed(() => {
	return isAuthModalVisible.value ? '' : 'hidden';
})
</script>
