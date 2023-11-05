<template>
	<main>
		<div v-if="song">
			<SongBanner :song="song"/>
			<SongDiscussion :comments="comments as Comment[]" :song="song" @on-comment-change="handleCommentChange"/>
		</div>

		<ListComments :comments="comments"/>
	</main>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';
import {SongService} from '@/app/features/music/services/song';
import firebase from '@/includes/firebase';
import {Comment} from '@/app/features/music/models/comment';
import {Audio, Song} from '@/app/features/music/models/audio';
import {LocalStorageKeys} from '@/app/shared/models/local-storage';
import {RouteName} from '@/app/shared/router/constants';
import SongBanner from '@/app/features/music/components/ui/SongBanner.vue';
import SongDiscussion from '@/app/features/music/components/widgets/SongDiscussion.vue';
import ListComments from '@/app/features/music/components/ui/ListComments.vue';
import OrderByDirection = firebase.firestore.OrderByDirection;

const {params: {id}} = useRoute();
const {push} = useRouter();
const song = ref<Song | null>(null);
const comments = ref<Comment[]>([]);

onMounted(async () => {
	const doc = await SongService.getByID(id.toString());
	if(!doc) return await push({name: RouteName.NOT_FOUND});

	song.value = {id: doc.doc.id, ...(doc.snapshot.data() as Audio)};
	await handleCommentChange(song.value, localStorage.getItem(LocalStorageKeys.COMMENTS_DATE_SORT_DIRECTION) as OrderByDirection || 'desc');
});

async function handleCommentChange(song: Song, dateSortDirection: OrderByDirection) {
	comments.value = await SongService.getComments(song.id, dateSortDirection);
}
</script>
