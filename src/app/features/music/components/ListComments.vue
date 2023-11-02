<template>
	<ul class="container mx-auto">
		<li class="p-6 bg-gray-50 border border-gray-200" :key="id" v-for="({authorName, content, id, date}) in props.comments">
			<div class="mb-5">
				<div class="flex gap-3">
					<span class="font-bold">{{ authorName }}</span>
					<time>{{ Time.dateIntl.format(new Date(date)) }}</time>
				</div>
			</div>
			<p>{{ content }}</p>
		</li>
	</ul>
</template>

<script setup lang="ts" generic="T extends Comment">
import {Time} from '@/app/shared/services/time';

const props = defineProps<{
	comments: T[];
}>();
</script>
