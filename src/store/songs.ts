import {defineStore} from 'pinia';
import {ref} from 'vue';

import {Song} from '@/app/features/music/models/audio';

export const useSongsStore = defineStore('songs', () => {
    const songs = ref<Song[]>([]);

    function addSong(song: Song) {
        songs.value.push(song);
    }

    return {songs, addSong};
})
