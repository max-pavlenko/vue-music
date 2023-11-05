<template>
	<main>
		<HeroBanner/>
		<section class="container mx-auto">
			<div class="bg-white rounded border border-gray-200 relative flex flex-col">
				<div v-icon='"headphones float-right text-green-400 text-xl"' class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
					Songs
				</div>
				<ListItemSong v-for="song in songs" :key="song.id" :song="song"/>
			</div>
		</section>
	</main>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {Song} from '@/app/features/music/models/audio';
import {SongService} from '@/app/features/music/services/song';
import HeroBanner from '@/app/shared/components/widgets/HeroBanner.vue';
import ListItemSong from '@/app/features/music/components/ui/ListItemSong.vue';

const songs = ref<Song[]>([]);

onMounted(async () => songs.value = await SongService.getAll());
</script>
