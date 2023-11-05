<template>
	<Form :validationSchema="AUTH_VALIDATION_SCHEMA['LOGIN']" @submit="handleLoginFormSubmit">
		<Input title="email" placeholder="Enter Name" type="text"/>
		<Input title="password" placeholder="Password" type="password"/>
		<Button :disabled="state.isLoading"
				class="w-full disabled:bg-purple-900 bg-purple-600 mt-3 hover:bg-purple-700">
			Submit
		</Button>
	</Form>
</template>

<script setup lang="ts">
import {Form} from 'vee-validate';
import Input from '@/app/shared/components/ui/atoms/Input.vue';
import {isLoginForm} from '@/app/features/auth/models/guards';
import {useToast} from 'vue-toastification';
import {AUTH_VALIDATION_SCHEMA} from '@/app/features/auth/constants/schemas';
import {useAsync} from '@/app/shared/hooks/useAsync';
import Button from '@/app/shared/components/ui/atoms/Button.vue';
import {useAuthStoreActions} from '@/store/auth/actions';

const {success} = useToast();
const {execute: login, state} = useAsync(useAuthStoreActions().login);

async function handleLoginFormSubmit(values: unknown) {
	if (!isLoginForm(values)) return;
	await login(values);
	state.isSuccess && success('Successfully logged in!');
}
</script>
