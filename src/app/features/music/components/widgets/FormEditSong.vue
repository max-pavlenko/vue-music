<template>
	<div class="border border-gray-200 p-3 mb-4 rounded">
		<div class="flex justify-between" v-show="isCollapsed">
			<h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
			<div class="text-sm flex gap-2 justify-end">
				<Button class="bg-blue-600" @click="isCollapsed = !isCollapsed">
					<i class="fa fa-pencil"/>
				</Button>
				<Button class="bg-red-600" @click="handleDeleteSong">
					<i class="fa fa-times"/>
				</Button>
			</div>
		</div>
		<Form v-show="!isCollapsed" :validation-schema="MUSIC_VALIDATION_SCHEMA.EDIT_SONG" class="flex flex-col gap-3 mt-3" @submit="handleEditSongFormSubmit">
			<Input :value="song.modifiedName" placeholder="Enter Song Title" title="song_title" />
			<Input :value="song.genre || ''" placeholder="Enter Genre" title="genre"/>
			<Button :disabled="state.isLoading" class="bg-green-600">
				Submit
			</Button>
			<Button class="bg-gray-600 self-end" type="button" @click="isCollapsed = !isCollapsed">
				Go Back
			</Button>
		</Form>
	</div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {Form, SubmissionHandler} from 'vee-validate';
import {MUSIC_VALIDATION_SCHEMA} from '@/app/features/music/constants/schemas';
import Input from '@/app/shared/components/ui/atoms/Input.vue';
import {useAsync} from '@/app/shared/hooks/useAsync';
import {Emits, Props} from '@/app/features/music/models/form-edit-song';
import Button from '@/app/shared/components/ui/atoms/Button.vue';
import {SongService} from '@/app/features/music/services/song';
import {MusicValidationSchema} from '@/app/features/music/models/validation';

const emit = defineEmits<Emits>();
const {song} = defineProps<Props>();
const isCollapsed = ref(true);
const {execute, state} = useAsync(updateSong);

const handleEditSongFormSubmit: SubmissionHandler = async (values) => {
	await execute(values as MusicValidationSchema['EDIT_SONG']);
}

async function updateSong(values: MusicValidationSchema['EDIT_SONG']) {
	const editSongRequestData = {...values, id: song.id};
	await SongService.update(editSongRequestData);
	isCollapsed.value = true;
	emit('onSubmit', editSongRequestData);
}

async function handleDeleteSong() {
	emit('onDelete', {id: song.id});
	await SongService.delete(song);
}
</script>
