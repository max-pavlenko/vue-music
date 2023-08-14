<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="isCollapsed">
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button @click="handleDeleteSongClick" class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times"/>
      </button>
      <button @click="isCollapsed = !isCollapsed" class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
        <i class="fa fa-pencil-alt"/>
      </button>
    </div>
    <Form :validation-schema="EDIT_SONG_SCHEMA" v-show="!isCollapsed" @submit="handleEditSongFormSubmit">
      <div class="mb-3">
        <label class="inline-block mb-2">{{ song.modifiedName }}</label>
        <FormInput :value="song.modifiedName" name="song_title" type="text" placeholder="Enter Song Title"
                   class="block w-full py-1.5 px-3 text-gray-800 transition duration-500 focus:outline-none focus:border-black rounded"
        />
      </div>
      <div class="mb-3">
        <FormInput :value="song.genre || ''" name="genre" placeholder="Enter Genre"
                   class="block w-full py-1.5 px-3 text-gray-800 transition duration-500 focus:outline-none focus:border-black rounded"
        />
      </div>
      <button :disabled="state.isLoading" type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
        Submit
      </button>
      <button @click="isCollapsed = !isCollapsed" type="button" class="py-1.5 px-3 rounded text-white bg-gray-600">
        Go Back
      </button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import type {Emits, Props} from "@/app/features/music/types/FormEditSong";
import {ref, watchEffect} from "vue";
import {Form} from 'vee-validate';
import {EDIT_SONG_SCHEMA} from "@/app/features/music/constants/schemas";
import FormInput from "@/app/shared/components/ui/FormInput.vue";
import {songsCollection, storage} from "@/includes/firebase";
import {toastError} from "@/app/shared/config/toast";
import {useAsync} from "@/app/shared/hooks/useAsync";

const emit = defineEmits<Emits>();
const {song} = defineProps<Props>();
const isCollapsed = ref(true);
const {execute, state} = useAsync(updateSong);

async function handleEditSongFormSubmit(values: typeof EDIT_SONG_SCHEMA) {
	await execute(values);
}

async function updateSong(values: typeof EDIT_SONG_SCHEMA) {
	await songsCollection.doc(song.id).update({
		modifiedName: values.song_title,
		genre: values.genre,
	});
	isCollapsed.value = true;
	emit('onSubmit', {...values, id: song.id});
}

async function handleDeleteSongClick() {
  try {
    emit('onDelete', {id: song.id});
    const storageRef = storage.ref();
    const songRef = storageRef.child(`/songs/${song.originalName}`);
    await Promise.all([
      songRef.delete(),
      songsCollection.doc(song.id).delete()
    ])
  } catch (e) {
    toastError(e);
  }
}
</script>
