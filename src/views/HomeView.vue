<template>
	<main>
		<section class="mb-8 py-20 text-white text-center relative">
			<div class="absolute inset-0 w-full h-full bg-cover introduction-bg bg-[url('/img/header.png')]"/>
			<div class="container mx-auto">
				<div class="text-white main-header-content">
					<h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}!</h1>
					<p class="w-full md:w-8/12 mx-auto">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
						et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
						suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
						pulvinar, fringilla lorem eget, ullamcorper urna.
					</p>
				</div>
			</div>

			<img alt="emojis" class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
				 src="/img/introduction-music.png"/>
		</section>

		<section class="container mx-auto">
			<div class="bg-white rounded border border-gray-200 relative flex flex-col">
				<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200" v-icon='"headphones-alt float-right text-green-400 text-xl"'>
					<span class="card-title">Songs</span>
				</div>
				<ol id="playlist">
					<ListItemSong :song="song" v-for="song in songs" :key="song.id"/>
				</ol>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {songsCollection} from "@/includes/firebase";
import ListItemSong from "@/app/features/music/components/ListItemSong.vue";
import type {Audio, Song} from "@/app/shared/types";

const songs = ref<Song[]>([]);

onMounted(async () => {
	const snapshot = await songsCollection.get();
	snapshot.forEach((doc) => {
		console.log(doc.data(), 'doc.data()')
		songs.value.push({id: doc.id, ...(doc.data() as Audio)});
	});
});
</script>
