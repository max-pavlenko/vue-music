<template>
	<li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50">
		<div>
			<RouterLink :to="`/song/${song.id}`" class="font-bold block text-gray-600">{{ song.modifiedName }}</RouterLink>
			<span class="text-gray-500 text-sm">{{ song.creatorName }}</span>
		</div>

		<div class="text-gray-600 text-lg">
			<RouterLink custom :to="{name: RouteName.SONG, params: {id: song.id}, hash: '#comments'}" v-slot="{navigate}">
				<span @click="navigate">
					<i class="fa fa-comments text-gray-600"/>
					{{ song.commentsCount }}
				</span>
			</RouterLink>
		</div>
	</li>
</template>

<script setup lang="ts">
import type {Song} from "@/app/shared/types";
import {RouteName} from "@/router/constants";

const props = defineProps<{ song: Song }>();
const {song} = props;

</script>
