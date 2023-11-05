<template>
	<Form v-if="isAuthenticated" :validationSchema="MUSIC_VALIDATION_SCHEMA.SONG_COMMENT" @submit="handleCommentSubmit">
		<Input as="textarea" placeholder="Your comment here..." title="comment"/>
		<AsyncButton class="mt-2" :state="state">Submit</AsyncButton>
	</Form>
</template>

<script setup lang="ts">
import {Form, SubmissionHandler} from 'vee-validate';
import {MUSIC_VALIDATION_SCHEMA} from '@/app/features/music/constants/schemas';
import {useAsync} from '@/app/shared/hooks/useAsync';
import Input from '@/app/shared/components/ui/atoms/Input.vue';
import {storeToRefs} from 'pinia';
import {useAuthStore} from '@/store/auth';
import {toRefs} from 'vue';
import {Song} from '@/app/features/music/models/audio';
import {SongService} from '@/app/features/music/services/song';
import AsyncButton from '@/app/shared/components/ui/molecules/AsyncButton.vue';

type Props = {song: Song, onCommentSubmit: (song: Song) => void}
const props = defineProps<Props>();
const {song, onCommentSubmit} = toRefs(props);
const {state, execute} = useAsync(SongService.postComment);
const authStore = useAuthStore();
const {isAuthenticated} = storeToRefs(authStore);

const handleCommentSubmit: SubmissionHandler = async ({comment}, {resetForm}) => {
	const songID = song.value.id;
	await execute({comment, songID});
	resetForm();
	onCommentSubmit.value(song.value);
}

</script>
