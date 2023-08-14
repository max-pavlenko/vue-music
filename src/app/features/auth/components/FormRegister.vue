<template>
	<Form :validationSchema="REGISTER_SCHEMA" :initialValues="registerFormInitialValues" class="flex flex-col gap-3" @submit="handleRegisterFormSubmit">
		<Input name="displayName" placeholder="Enter Name" type="text" as="input"/>
		<Input name="email" placeholder="Enter Email" type="email"/>
		<Input name="age" type="number"/>
		<Input name="password" placeholder="Password" type="password"/>
		<Input name="password_confirm" placeholder="Confirm Password" type="password"/>
		<Input name="country" as="select">
			<option value="USA">USA</option>
			<option value="Mexico">Mexico</option>
			<option value="Germany">Germany</option>
			<option value="russia">russia</option>
		</Input>

		<div class="pl-6">
			<Field id="terms_of_service" :value="true" @change="e => console.log(e.target.value, '')" name="terms_of_service" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded"/>
			<label for="terms_of_service">Agree to Terms Of Service</label>
		</div>
		<ErrorMessage name="terms_of_service" class="text-red-600 mb-2"/>

		<button :disabled="state.isLoading" class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
			Submit
		</button>
	</Form>
</template>

<script setup lang="ts">
import {ErrorMessage, Field, Form, SubmissionHandler} from 'vee-validate';
import Input from "@/app/shared/components/ui/FormInput.vue";
import {useAuthStore} from "@/stores/auth";
import {useToast} from "vue-toastification";
import {REGISTER_SCHEMA} from "@/app/features/auth/constants/schemas";
import {registerFormInitialValues} from "@/app/features/auth/constants/registration";
import {useAsync} from "@/app/shared/hooks/useAsync";

const {register} = useAuthStore();
const {success} = useToast();
const {execute, state} = useAsync(register);

const handleRegisterFormSubmit: SubmissionHandler = async (values) => {
	await execute(values as typeof REGISTER_SCHEMA);
	success('Successfully created an account!');
}
</script>
