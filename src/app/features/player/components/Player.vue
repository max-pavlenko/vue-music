<template>
	<Transition name="fade">
		<div v-if="song" class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
			<div class="text-center">
				<span class="font-bold">{{ song.modifiedName }}&nbsp;</span>
				<span>by {{ song.creatorName }}</span>
			</div>
			<div class="flex flex-nowrap gap-4 items-center">
				<button type="button" @click="toggleSongAudio">
					<i class="fa text-gray-500 text-xl" :class="`fa-${playingIcon}`"/>
				</button>
				<div>{{ Time.format(soundInfo.playedTime) }}</div>
				<div @click="handleSeekAudioTo" class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
               		<span :style="`left: ${soundInfo.progressPercent}%`" class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg">
            			<i class="fa fa-circle"/>
          			</span>
					<span :style="`width: ${soundInfo.progressPercent}%`" class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"/>
				</div>
				<div>{{ Time.format(soundInfo.duration) }}</div>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import {usePlayerStore} from '@/store/player';
import {storeToRefs} from 'pinia';
import {Time} from '@/app/shared/services/time';
import {usePlayerStoreActions} from '@/store/player/actions';

const playerStore = usePlayerStore();
const {soundInfo, song, playingIcon} = storeToRefs(playerStore);
const {toggleSongAudio, seekAudioTo} = usePlayerStoreActions();

function handleSeekAudioTo(event: MouseEvent) {
	const {x, width} = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
	const {clientX} = event;
	const percent = (clientX - x) / width;
	seekAudioTo(percent);
}
</script>
