<template>
	<main>
		<div v-if="song">
			<section class="w-full mb-8 py-14 text-center text-white relative">
				<div class="absolute inset-0 bg-[url('/img/song-header.png')] w-full h-full box-border bg-contain music-bg"/>
				<div class="container mx-auto flex items-center">
					<button @click="setHowlSong(song)" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none">
						<i class="fas" :class="playingButtonIcon"/>
					</button>
					<div class="z-50 text-left ml-8">
						<div class="text-3xl font-bold">{{ song.modifiedName }}</div>
						<div v-if="song.genre">{{ song.genre }}</div>
						<div>{{ $n(1.02) }}</div>
					</div>
				</div>
			</section>

			<section class="container mx-auto mt-6" id="comments">
				<div class="bg-white rounded border border-gray-200 relative flex flex-col">
					<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">

						<span class="card-title">{{$tc('song.commentsCount', comments.length, {count: comments.length})}}</span>
						<i class="fa fa-comments float-right text-green-400 text-2xl"/>
					</div>
					<div class="p-6">
						<div class="mb-3">
							<FormSongComment :on-comment-submit="handleCommentSubmit" :song="song"/>
						</div>
						<FormInput :value="dateSortDirection" @change="handleDateSortDirectionChange"
								   as="select" name="comments_date">
							<option value="asc">Latest</option>
							<option value="desc">Oldest</option>
						</FormInput>
					</div>
				</div>
			</section>
		</div>

		<ul class="container mx-auto">
			<li class="p-6 bg-gray-50 border border-gray-200" :key="id" v-for="({authorName, content, id, date}) in comments">
				<div class="mb-5">
					<div class="flex gap-3">
						<span class="font-bold">{{ authorName }}</span>
						<time>{{ new Intl.DateTimeFormat().format(new Date(date)) }}</time>
					</div>
				</div>
				<p>{{ content }}</p>
			</li>
		</ul>
	</main>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import firebase from "@/includes/firebase";
import type {Audio, Comment, Song} from "@/app/shared/types";
import {LocalStorageKeys} from "@/app/shared/types";
import FormSongComment from "@/app/features/music/components/FormSongComment.vue";
import {getSongComments} from "@/app/features/music/services/comment";
import FormInput from "@/app/shared/components/ui/FormInput.vue";
import {getSongByID} from "@/app/features/music/services/song";
import {usePlayerStore} from "@/stores/player";
import {storeToRefs} from "pinia";
import OrderByDirection = firebase.firestore.OrderByDirection;

const {setHowlSong} = usePlayerStore();
const {params: {id}} = useRoute();
const {push} = useRouter();
const song = ref<Song>(null!);
const comments = ref<Comment[]>([]);
const initialDateSortDirection = localStorage.getItem(LocalStorageKeys.COMMENTS_DATE_SORT_DIRECTION) as OrderByDirection || 'asc';
const dateSortDirection = ref(initialDateSortDirection);
const playerStore = usePlayerStore();
const {playingButtonIcon} = storeToRefs(playerStore);

onMounted(async () => {
	const {snapshot, doc} = await getSongByID(id.toString());
	if (!snapshot.exists) return await push({name: "not-found"});
	song.value = {id: doc.id, ...(snapshot.data() as Audio)};

	await getComments(song.value);
});

async function getComments(song: Song) {
	comments.value = await getSongComments(song.id, dateSortDirection.value);
}

async function handleCommentSubmit(song: Song) {
	await getComments(song);
}

async function handleDateSortDirectionChange(e: Event) {
	const {value} = e.target as HTMLSelectElement;
	localStorage.setItem(LocalStorageKeys.COMMENTS_DATE_SORT_DIRECTION, value);
	dateSortDirection.value = value as OrderByDirection;
	await getComments(song.value);
}

</script>
