<template>
	<div class="p-6">
		<FormEditSong :song="song" v-for="song in songs" :key="song.id" @on-submit="handleFormEditSongSubmit"
					  @on-delete="handleSongDelete"/>
	</div>
</template>

<script setup lang="ts">
import FormEditSong from '@/app/features/music/components/FormEditSong.vue';
import {onMounted} from 'vue';
import {auth} from '@/includes/firebase';
import {useSongsStore} from '@/store/songs';
import {storeToRefs} from 'pinia';
import {Emits} from '@/app/features/music/models/form-edit-song';
import {EmitHandler} from '@/app/shared/models/auth';
import {SongService} from '@/app/features/music/services/song';

const songsStore = useSongsStore();
const {songs} = storeToRefs(songsStore);

onMounted(async () => {
	songs.value = await SongService.getByAuthorID(auth.currentUser!.uid) ?? [];
})

const handleFormEditSongSubmit: EmitHandler<Emits['onSubmit']> = ({song_title, id, genre}) => {
	const changedSong = songs.value.findIndex((song) => song.id === id);
	songs.value[changedSong] = {...songs.value[changedSong], modifiedName: song_title, genre};
}

const handleSongDelete: EmitHandler<Emits['onDelete']> = async ({id}) => {
	const songIndex = songs.value.findIndex((song) => song.id === id);
	songs.value.splice(songIndex, 1);
}

</script>
