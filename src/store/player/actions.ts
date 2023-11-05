import {toRefs} from 'vue';
import {Song} from '@/app/features/music/models/audio';
import {Howl} from 'howler';
import {usePlayerStore} from '@/store/player/index';
import {StoreActions} from '@/app/shared/types/utility';

export const usePlayerStoreActions = () => {
   const {song, sound, soundInfo} = toRefs(usePlayerStore());
   
   function toggleSongAudio() {
      if (!sound.value) return;
      sound.value.playing() ? sound.value.pause() : sound.value.play();
   }
   
   function updateAudioProgress() {
      soundInfo.value.playedTime = sound.value!.seek();
      soundInfo.value.progressPercent = soundInfo.value.playedTime / soundInfo.value.duration * 100;
      if (sound.value?.playing()) requestAnimationFrame(updateAudioProgress);
   }
   
   return {
      toggleSongAudio,
      setHowlSong(newSong: Song) {
         if (sound.value instanceof Howl && song.value?.id === newSong.id) return toggleSongAudio();
         sound.value?.stop();
         song.value = newSong;
         
         sound.value = new Howl({
            src: [newSong.url],
            html5: true,
            format: ['mp3', 'aac'],
            volume: 0.22,
         });
         sound.value.play();
         
         sound.value.on('play', () => {
            soundInfo.value.duration = sound.value!.duration();
            requestAnimationFrame(updateAudioProgress);
         });
      },
      seekAudioTo(percent: number) {
         if (!sound.value) return;
         const seekTo = sound.value.duration() * percent;
         sound.value.seek(seekTo);
         !sound.value.playing() && sound.value.play();
         
         sound.value.once('seek', () => {
            updateAudioProgress();
         });
      }
   } satisfies StoreActions;
};
