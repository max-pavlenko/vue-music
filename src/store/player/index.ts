import {defineStore} from 'pinia';
import {computed, reactive, ref} from 'vue';
import {Howl} from 'howler';
import {Song} from '@/app/features/music/models/audio';

type SoundInfo = { duration: number, playedTime: number, progressPercent: number };

export const usePlayerStore = defineStore('player', () => {
   const song = ref<Song | null>(null);
   const sound = ref<Howl | null>(null);
   const soundInfo = reactive<SoundInfo>({duration: 0, playedTime: 0, progressPercent: 0});

   const isPlaying = computed(() => {
      return sound.value?.playing() ?? false;
   });

   const currentSongPlayingIcon = computed(() => (currentPlayingSong: Song) => {
      return currentPlayingSong.id === song.value?.id ? playingIcon.value : "play";
   });

   const playingIcon = computed(() => {
      return isPlaying.value ? "pause" : "play";
   });

   return {song, sound, isPlaying, soundInfo, playingIcon, currentSongPlayingIcon};
})

