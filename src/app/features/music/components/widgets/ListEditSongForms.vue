<template>
	<div class="p-6">
		<FormEditSong :song="song" v-for="song in songsStore.songs" :key="song.id" @on-submit="handleFormEditSongSubmit"
					  @on-delete="handleSongDelete"/>
	</div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useSongsStore} from '@/store/songs';
import {SongService} from '@/app/features/music/services/song';
import {Emits} from '@/app/features/music/models/form-edit-song';
import {auth} from '@/includes/firebase';
import FormEditSong from '@/app/features/music/components/widgets/FormEditSong.vue';
import {EmitHandler} from '@/app/shared/types/utility';
import {useSongsActions} from '@/store/songs/actions';

const songsStore = useSongsStore();
const {set, patch, removeOne} = useSongsActions();

onMounted(async () => {
	set(await SongService.getByAuthorID(auth.currentUser!.uid) ?? []);
})

const handleFormEditSongSubmit: EmitHandler<Emits['onSubmit']> = ({song_title, id, genre}) => {
	patch({id, patchFn: () => ({modifiedName: song_title, genre})});
}

const handleSongDelete: EmitHandler<Emits['onDelete']> = async ({id}) => {
	removeOne(id);
}

</script>
