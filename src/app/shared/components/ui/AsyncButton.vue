<template>
	<button v-bind="$attrs" :disabled="state.isLoading" class="py-1.5 mt-2 px-3 rounded text-white block`"
			:class="buttonStatesClasses">
		<slot />
	</button>
</template>

<script setup lang="ts">
import type {AsyncState} from "@/app/shared/hooks/useAsync";
import {computed, toRefs} from "vue";

const props = defineProps<{ state: AsyncState }>();
const {state} = toRefs(props);

const buttonStatesClasses = computed(() => {
	return {
		'bg-[forestgreen]': state.value.isSuccess,
		'bg-[orange]': state.value.isLoading,
		'bg-red-500': !!state.value.error,
		'bg-cyan-700': !state.value.isSuccess && !state.value.isLoading,
	}
})
</script>
