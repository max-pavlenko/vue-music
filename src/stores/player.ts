import {defineStore} from "pinia";
import type {Song} from "@/app/shared/types";
import {computed, ref} from "vue";
import {Howl} from "howler";

type SoundInfo = { duration: number, playedTime: number, progressPercent: number };

export const usePlayerStore = defineStore('player', () => {
   const song = ref<Song | null>(null);
   const sound = ref<Howl>(null!);
   const soundInfo = ref<SoundInfo>({duration: 0, playedTime: 0, progressPercent: 0});

   const isPlaying = computed(() => {
      return sound.value?.playing() ?? false;
   });

   const currentSongPlayingIcon = computed(() => (currentPlayingSong: Song) => {
      return isPlaying.value && currentPlayingSong.id === song.value?.id ? 'fa-pause' : 'fa-play';
   });

   const playingIcon = computed(() => {
      return isPlaying.value ? "fa-pause" : "fa-play";
   });

   function setHowlSong(newSong: Song) {
      if (sound.value instanceof Howl && song.value.id === newSong.id) return toggleSongAudio();
      sound.value?.stop();
      song.value = newSong;

      sound.value = new Howl({
         src: [newSong.url],
         html5: true,
         format: ['mp3', 'aac'],
      });
      sound.value.play();

      sound.value.on('play', () => {
         soundInfo.value.duration = sound.value.duration();
         requestAnimationFrame(handleAudioProgress);
      })
   }

   function handleAudioProgress() {
      soundInfo.value.playedTime = sound.value.seek();
      soundInfo.value.progressPercent = soundInfo.value.playedTime / soundInfo.value.duration * 100;
      if (sound.value.playing()) requestAnimationFrame(handleAudioProgress);
   }

   function toggleSongAudio() {
      sound.value.playing() ? sound.value.pause() : sound.value.play();
   }

   function seekAudioTo(percent: number) {
      sound.value.seek(sound.value.duration() * percent);
      !sound.value.playing() && sound.value.play();

      sound.value.once('seek', () => {
         handleAudioProgress();
      })
   }

   return {song, setHowlSong, toggleSongAudio, isPlaying, soundInfo, seekAudioTo, playingIcon, currentSongPlayingIcon};
})
