import {defineStore} from "pinia";
import {ref} from "vue";
import type {Song} from "@/app/shared/types";

export const useSongsStore = defineStore('songs', () => {
    const songs = ref<Song[]>([]);

    function addSong(song: Song) {
        songs.value.push(song);
    }

    return {songs, addSong};
})
