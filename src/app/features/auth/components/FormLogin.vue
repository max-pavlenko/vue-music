<template>
	<Form :validationSchema="LOGIN_SCHEMA" @submit="handleLoginFormSubmit">
		<Input name="email" placeholder="Enter Name" type="text"/>
		<Input name="password" placeholder="Password" type="password"/>
		<button type="submit" :disabled="state.isLoading"
				class="block w-full bg-purple-600 text-white py-1.5 px-3 mt-3 rounded transition hover:bg-purple-700">
			Submit
		</button>
	</Form>
</template>

<script setup lang="ts">
import {Form} from 'vee-validate';
import Input from "@/app/shared/components/ui/FormInput.vue";
import {useAuthStore} from "@/stores/auth";
import {isLoginForm} from "@/app/features/auth/types/guards";
import {useToast} from "vue-toastification";
import {LOGIN_SCHEMA} from "@/app/features/auth/constants/schemas";
import {useAsync} from "@/app/shared/hooks/useAsync";

const {login} = useAuthStore();
const {success} = useToast();
const {execute, state} = useAsync(login);

async function handleLoginFormSubmit(values: unknown) {
	if (!isLoginForm(values)) return;
	await execute(values);
	state.isSuccess && success('Successfully logged in!');
}
</script>
