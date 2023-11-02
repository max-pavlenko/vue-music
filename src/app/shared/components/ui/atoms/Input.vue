<template>
	<div>
		<label :for="title" class="inline-block mb-2 capitalize">{{ formattedInputName }}</label>
		<Field :as="as || 'input'" :name="title" v-bind="$attrs"
			   class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 duration-500 rounded">
			<slot/>
		</Field>
		<ErrorMessage :name="title" class="text-red-600"/>
	</div>
</template>

<script lang="ts" setup>
import {ErrorMessage, Field} from 'vee-validate';
import {computed, toRefs} from 'vue';

type Props = {
	title: string,
	as?: string
};

const props = defineProps<Props>();
const {title, as} = toRefs(props);

const formattedInputName = computed(() => {
	return title.value.split(/[_.,;:]/g).join(' ');
});

</script>
