<template>
	<Button v-bind="$attrs" :disabled="props.state.isLoading" :class="statesClasses">
		<slot />
	</Button>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import Button from '@/app/shared/components/ui/atoms/Button.vue';
import {AsyncState} from '@/app/shared/hooks/useAsync';

const props = defineProps<{ state: AsyncState }>();

const statesClasses = computed(() => {
	const {isSuccess, error, isLoading} = props.state;
	const isIdle = !isSuccess && !error && !isLoading

	return {
		'bg-[forestgreen]': isSuccess,
		'bg-[orange]': isLoading,
		'bg-red-500': !!error,
		'bg-blue-700': isIdle,
	}
})
</script>
