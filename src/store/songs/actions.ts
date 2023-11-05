import {storeToRefs} from 'pinia';
import {Song} from '@/app/features/music/models/audio';
import {useSongsStore} from '@/store/songs/index';
import {StoreActions} from '@/app/shared/types/utility';

export const useSongsActions = () => {
   const store = storeToRefs(useSongsStore());
   
   function findIndex(id: Song['id']) {
      return store.songs.value.findIndex((s) => s.id === id);
   }
   
   return {
      add(...newSongs: Song[]) {
         store.songs.value.push(...newSongs);
      },
      set(songs: Song[]) {
         store.songs.value = songs;
      },
      removeOne(id: Song['id']) {
         const index = findIndex(id);
         if (index === -1) return;
         store.songs.value.splice(index, 1);
      },
      patch({id, patchFn}: { id: Song['id'], patchFn: (currentSong: Song) => Partial<Song> }) {
         const index = findIndex(id);
         if (index === -1) return;
         const currentSong = store.songs.value[index];
         store.songs.value[index] = {...currentSong, ...patchFn(currentSong)};
      },
   } satisfies StoreActions;
};
