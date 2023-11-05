<template>
	<Form :validationSchema="AUTH_VALIDATION_SCHEMA.REGISTER" :initialValues="REGISTER_FORM_INITIAL_VALUES" class="flex flex-col gap-3" @submit="handleRegisterFormSubmit">
		<Input title="displayName" placeholder="Enter Name" type="text" />
		<Input title="email" placeholder="Enter Email" type="email"/>
		<Input title="age" type="number"/>
		<Input title="password" placeholder="Password" type="password"/>
		<Input title="password_confirm" placeholder="Confirm Password" type="password"/>
		<Input title="country" as="select">
			<option v-for="country in AVAILABLE_COUNTRIES" :value="country">{{ country }}</option>
		</Input>

		<div class="flex gap-2 items-center">
			<Field id="terms_of_service" :value="true" name="terms_of_service" type="checkbox" class="w-4 h-4 rounded"/>
			<label for="terms_of_service">Agree to Terms Of Service</label>
		</div>
		<ErrorMessage name="terms_of_service" class="text-red-600 mb-2"/>

		<Button :disabled="state.isLoading" class="w-full bg-purple-600 hover:bg-purple-700">
			Submit
		</Button>
	</Form>
</template>

<script setup lang="ts">
import {ErrorMessage, Field, Form, SubmissionHandler} from 'vee-validate';
import Input from '@/app/shared/components/ui/atoms/Input.vue';
import {useAuthStore} from '@/store/auth';
import {useToast} from 'vue-toastification';
import {AUTH_VALIDATION_SCHEMA} from '@/app/features/auth/constants/schemas';
import {AVAILABLE_COUNTRIES, REGISTER_FORM_INITIAL_VALUES} from '@/app/features/auth/constants/registration';
import {useAsync} from '@/app/shared/hooks/useAsync';
import {isRegisterForm} from '@/app/features/auth/models/guards';
import Button from '@/app/shared/components/ui/atoms/Button.vue';
import {AuthValidationSchema} from '@/app/features/auth/models/validation';
import {useAuthStoreActions} from '@/store/auth/actions';

const authStore = useAuthStore();
const {success} = useToast();
const {execute: register, state} = useAsync(useAuthStoreActions().register);

const handleRegisterFormSubmit: SubmissionHandler = async (values) => {
	if (!isRegisterForm(values)) return;
	await register(values as AuthValidationSchema['REGISTER']);
	state.isSuccess && success('Successfully created an account!');
}
</script>
