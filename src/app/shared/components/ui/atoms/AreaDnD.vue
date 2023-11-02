<template>
	<div class="bg-white rounded border border-gray-200 relative flex flex-col">
		<div class="p-6 pb-5 font-bold border-b border-gray-200">
			<span class="card-title">Upload</span>
			<i class="fa fa-upload float-right text-green-400 text-2xl"/>
		</div>
		<div class="p-6">
			<button :class="{'bg-green-400 border-green-400 text-white border-solid': isDraggedOver}"
					class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400
           text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid" @click="filesInputRef.click()"
					@dragenter.prevent="isDraggedOver = true" @drop.prevent.stop="handleFilesDrop" @dragover.prevent
					@dragleave.prevent="isDraggedOver = false" @dragend.prevent.stop="isDraggedOver = false">
				<slot>Drop your files here or click to select</slot>
			</button>
			<input ref="filesInputRef" accept="audio/*" class="hidden" multiple type="file" @change="handleFilesChange"/>
			<hr class="my-6"/>

			<div v-for="({progress, name, status}) in uploadingFiles" :key="name" class="mb-4">
				<div :class="FILE_STATUS_MAP[status]?.text ?? ''" class="font-bold text-sm">
					<i :class="`fa fa-${FILE_STATUS_MAP[status].icon}`"/>
					{{ name }}
				</div>
				<div v-if="isFilePending(status)" class="flex h-4 overflow-hidden bg-gray-200 rounded">
					<div :style="{width: `${progress}%`}" class="transition-all progress-bar bg-blue-400"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script generic="T extends UploadingFile" lang="ts" setup>
import {computed, onBeforeUnmount, ref, toRefs} from 'vue';
import {AreaDnDEmits, UploadingFile} from '@/app/shared/models/file';
import {FileService} from '@/app/shared/services/file';
import {FILE_STATUS_MAP, UploadingFileStatus} from '@/app/shared/models/file-status';

type Props<T extends UploadingFile> = { uploadingFiles: T[] };

const props = defineProps<Props<T>>();
const {uploadingFiles} = toRefs(props);
const emit = defineEmits<AreaDnDEmits>();

const isDraggedOver = ref(false);
const filesInputRef = ref<HTMLInputElement>(null!);
const fileService = new FileService();

onBeforeUnmount(() => {
	for (const {task} of uploadingFiles.value) {
		task.cancel();
	}
});

const isFilePending = computed(() => (status: UploadingFileStatus) => status === UploadingFileStatus.PENDING);

function handleFilesDrop(e: DragEvent) {
	const files = [...e.dataTransfer!.files];
	onFilesChange(files);
}

function handleFilesChange(e: Event) {
	const files = [...(e.target as HTMLInputElement).files!];
	onFilesChange(files);
}

function onFilesChange(files: File[]) {
	isDraggedOver.value = false;
	fileService.iterateFilesWithPreservedPosition(files, (file, index) => emit('onUploadFile', file, index));
}

</script>
