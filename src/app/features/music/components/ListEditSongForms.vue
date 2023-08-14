<template>
	<div class="p-6">
		<FormEditSong :song="song" v-for="song in songs" :key="song.id" @on-submit="handleFormEditSongSubmit"
					  @on-delete="handleSongDelete"/>
	</div>
</template>

<script setup lang="ts">
import FormEditSong from "@/app/features/music/components/FormEditSong.vue";
import {Audio, EmitHandler} from "@/app/shared/types";
import {Emits as EditSongFormEmits} from "@/app/features/music/types/FormEditSong";
import {onMounted} from "vue";
import {auth, songsCollection} from "@/includes/firebase";
import {useSongsStore} from "@/stores/songs";
import {storeToRefs} from "pinia";

const songsStore = useSongsStore();
const {songs} = storeToRefs(songsStore);

onMounted(async () => {
	const songsSnapshot = await songsCollection.where('creatorID', '==', auth.currentUser?.uid).get();
	songs.value = [];
	songsSnapshot.forEach((doc) => {
		songsStore.addSong({
				...(doc.data() as Audio),
				id: doc.id,
			}
		);
	})
})

const handleFormEditSongSubmit: EmitHandler<EditSongFormEmits['onSubmit']> = ({song_title, id, genre}) => {
	const changedSong = songs.value.findIndex((song) => song.id === id);
	songs.value[changedSong] = {...songs.value[changedSong], modifiedName: song_title, genre};
}

const handleSongDelete: EmitHandler<EditSongFormEmits['onDelete']> = async ({id}) => {
	const songIndex = songs.value.findIndex((song) => song.id === id);
	songs.value.splice(songIndex, 1);
}

</script>
