<template>
	<section class="container mx-auto mt-6">
		<div class="bg-white rounded border border-gray-200 relative flex flex-col">
			<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
						<span class="card-title">
							{{$tc('song.commentsCount', comments.length, {count: comments.length}) }}
						</span>
				<i class="fa fa-comments float-right text-green-400 text-2xl"/>
			</div>
			<div class="p-6">
				<div class="mb-3">
					<FormSongComment :on-comment-submit="handleCommentSubmit" :song="song"/>
				</div>
				<FormInput :value="dateSortDirection" as="select"
						   title="comments_date" @change="handleDateSortDirectionChange">
					<option value="desc">Latest</option>
					<option value="asc">Oldest</option>
				</FormInput>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import FormSongComment from '@/app/features/music/components/FormSongComment.vue';
import FormInput from '@/app/shared/components/ui/atoms/Input.vue';
import {LocalStorageKeys} from '@/app/shared/models/local-storage';
import {ref, toRefs} from 'vue';
import firebase from '@/includes/firebase';
import {Song} from '@/app/features/music/models/audio';
import OrderByDirection = firebase.firestore.OrderByDirection;

type Emits = {
	onCommentChange: [Song, OrderByDirection]
}
type Props = {
	comments: Comment[];
	song: Song;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const {comments, song} = toRefs(props);
const initialDateSortDirection = localStorage.getItem(LocalStorageKeys.COMMENTS_DATE_SORT_DIRECTION) as OrderByDirection || 'desc';
const dateSortDirection = ref(initialDateSortDirection);

async function handleCommentSubmit(song: Song) {
	await getComments(song);
}

async function handleDateSortDirectionChange(e: Event) {
	const value = (e.target as HTMLSelectElement).value as OrderByDirection;
	dateSortDirection.value = value;
	localStorage.setItem(LocalStorageKeys.COMMENTS_DATE_SORT_DIRECTION, value);
	await getComments(song.value);
}

async function getComments(song: Song) {
	emit('onCommentChange', song, dateSortDirection.value);
}
</script>
