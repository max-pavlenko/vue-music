<template>
	<Form v-if="isAuthenticated" :validationSchema="SONG_COMMENT_SCHEMA" @submit="handleCommentSubmit">
		<FormInput as="textarea" placeholder="Your comment here..." name="comment"/>
		<AsyncButton :state="state">Submit</AsyncButton>
	</Form>
</template>

<script setup lang="ts">
import {Form, SubmissionHandler} from "vee-validate";
import {SONG_COMMENT_SCHEMA} from "@/app/features/music/constants/schemas";
import {useAsync} from "@/app/shared/hooks/useAsync";
import FormInput from "@/app/shared/components/ui/FormInput.vue";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth";
import {toRefs} from "vue";
import {saveCommentToFirebase} from "@/app/features/music/services/comment";
import type {Props} from "@/app/features/music/types/FormSongComment";
import AsyncButton from "@/app/shared/components/ui/AsyncButton.vue";

const props = defineProps<Props>();
const {song, onCommentSubmit} = toRefs(props);
const {state, execute} = useAsync(saveCommentToFirebase);
const authStore = useAuthStore();
const {isAuthenticated} = storeToRefs(authStore);

const handleCommentSubmit: SubmissionHandler<typeof SONG_COMMENT_SCHEMA> = async ({comment}, {resetForm}) => {
	const songID = song.value.id;
	await execute({comment, songID});
	resetForm();
	onCommentSubmit.value(song.value);
}

</script>
