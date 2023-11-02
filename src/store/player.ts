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
         soundInfo.duration = sound.value.duration();
         requestAnimationFrame(handleAudioProgress);
      })
   }

   function handleAudioProgress() {
      soundInfo.playedTime = sound.value.seek();
      soundInfo.progressPercent = soundInfo.playedTime / soundInfo.duration * 100;
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
