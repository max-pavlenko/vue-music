<template>
	<section class="w-full mb-8 py-14 text-center text-white relative">
		<div class="absolute inset-0 bg-[url('/img/song-header.png')] w-full h-full box-border bg-contain music-bg"/>
		<div class="container mx-auto flex items-center">
			<button class="z-10 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none" @click="setHowlSong(song)">
				<i :class="`fa fa-${currentSongPlayingIcon(song)}`"/>
			</button>
			<div class="z-[1] text-left ml-8">
				<div class="text-3xl font-bold">{{ song.modifiedName }}</div>
				<div v-if="song.genre">{{ song.genre }}</div>
				<div>{{ $n(1.02) }}</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import {Song} from '@/app/features/music/models/audio';
import {toRefs} from 'vue';
import {usePlayerStore} from '@/store/player';
import {storeToRefs} from 'pinia';
import {usePlayerStoreActions} from '@/store/player/actions';

type Props = {
	song: Song;
}
const props = defineProps<Props>();
const {song} = toRefs(props);
const {currentSongPlayingIcon} = storeToRefs(usePlayerStore());
const {setHowlSong} = usePlayerStoreActions();
</script>
