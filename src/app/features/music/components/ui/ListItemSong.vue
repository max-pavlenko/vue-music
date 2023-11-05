<template>
	<figure class="flex justify-between items-center p-3 pl-6 hover:bg-gray-50">
		<figcaption>
			<RouterLink :to="`/song/${song.id}`" class="font-bold block text-gray-600">{{
					song.modifiedName
				}}
			</RouterLink>
			<span class="text-gray-500 text-sm">{{ song.creatorName }}</span>
		</figcaption>

		<RouterLink v-slot="{navigate}" :to="{name: RouteName.SONG, params: {id: song.id}, hash: '#comments'}"
					custom>
				<span class="cursor-pointer text-gray-600 text-lg" @click="navigate">
					<i class="fa fa-comments"/>
					{{ song.commentsCount }}
				</span>
		</RouterLink>
	</figure>
</template>

<script lang="ts" setup>
import {RouteName} from '@/app/shared/router/constants';
import {Song} from '@/app/features/music/models/audio';
import {toRefs} from 'vue';

const props = defineProps<{ song: Song }>();
const {song} = toRefs(props);

</script>
