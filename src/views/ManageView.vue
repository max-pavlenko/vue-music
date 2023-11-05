<template>
	<main>
		<section class="container mx-auto mt-6">
			<div class="md:grid md:grid-cols-3 md:gap-4">
				<div class="col-span-1">
					<AreaDnD @on-upload-file="handleUploadAudioFile" :uploading-files="uploadingFiles"/>
				</div>
				<div class="col-span-2">
					<div class="bg-white rounded border border-gray-200 relative flex flex-col">
						<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
							<span v-icon="'compact-disc float-left text-green-400 text-2xl'" class="card-title">
								My Songs
							</span>
						</div>
						<ListEditSongForms/>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import {auth, songsCollection} from '@/includes/firebase';
import {Reference} from '@firebase/storage-types';
import {ref} from 'vue';
import {AreaDnDEmits, UploadingFile} from '@/app/shared/models/file';
import {FileService} from '@/app/shared/services/file';
import {UploadingFileStatus} from '@/app/shared/models/file-status';
import AreaDnD from '@/app/shared/components/ui/atoms/AreaDnD.vue';
import ListEditSongForms from '@/app/features/music/components/widgets/ListEditSongForms.vue';
import {EmitHandler} from '@/app/shared/types/utility';
import {useSongsActions} from '@/store/songs/actions';

const {add} = useSongsActions();
const uploadingFiles = ref<UploadingFile[]>([]);

const handleUploadAudioFile: EmitHandler<AreaDnDEmits['onUploadFile']> = async (file, idx) => {
	try {
		const ref = await FileService.uploadFile({
			file, onProgress: (progress) => uploadingFiles.value[idx].progress = progress,
			onUploadTask: uploadTask => uploadingFiles.value.push({
				name: file.name,
				progress: 0,
				task: uploadTask,
				status: UploadingFileStatus.PENDING,
			})
		});
		uploadingFiles.value[idx].status = UploadingFileStatus.SUCCESS;
		await handleUploadAudioSuccess(ref);
	} catch (error) {
		uploadingFiles.value[idx].status = UploadingFileStatus.ERROR;
	}
};

const handleUploadAudioSuccess = async (ref: Reference) => {
	const {uid, displayName} = auth.currentUser!;
	const song = {
		creatorID: uid,
		creatorName: displayName,
		originalName: ref.name,
		modifiedName: ref.name,
		commentsCount: 0,
		url: await ref.getDownloadURL(),
	};
	const {id} = await songsCollection.add(song);
	add({...song, id});
};
</script>
