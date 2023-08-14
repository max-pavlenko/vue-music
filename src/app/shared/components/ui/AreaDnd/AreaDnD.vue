<template>
	<div class="bg-white rounded border border-gray-200 relative flex flex-col">
		<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
			<span class="card-title">Upload</span>
			<i class="fas fa-upload float-right text-green-400 text-2xl"/>
		</div>
		<div class="p-6">
			<button class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400
           text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
					:class="{'bg-green-400 border-green-400 text-white border-solid': isDraggedOver}" @click="filesInputRef.click()"
					@dragenter.prevent="isDraggedOver = true" @drop.prevent.stop="handleDrop" @dragover.prevent
					@dragleave.prevent="isDraggedOver = false" @dragend.prevent.stop="isDraggedOver = false"
			>
				Drop your files here
			</button>
			<input class="hidden" @change="handleAudioFilesChange" ref="filesInputRef" type="file" accept="audio/*" multiple/>
			<hr class="my-6"/>

			<div class="mb-4" v-for="({progress, name, isSuccess, isError}) in uploadingFiles" :key="name">
				<div class="font-bold text-sm" :class="{'text-green-500': isSuccess, 'text-red-500': isError}">
					<i v-if="isSuccess" class="fas fa-check"/>
					<i v-else-if="isError" class="fas fa-times"/>
					<i v-else class="fas fa-spinner fa-spin"/> {{ name }}
				</div>
				<div class="flex h-4 overflow-hidden bg-gray-200 rounded" v-if="!isSuccess && !isError">
					<div :style="{width: `${progress}%`}" class="transition-all progress-bar bg-blue-400"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" generic="T extends UploadingFile">
import {onBeforeUnmount, ref, toRefs} from "vue";
import type {Emits, Props, UploadingFile} from "@/app/shared/components/ui/AreaDnd/types";
import {toastError} from "@/app/shared/config/toast";

const props = defineProps<Props<T>>();
const {uploadingFiles} = toRefs(props);
const emit = defineEmits<Emits>();

const isDraggedOver = ref(false);
const startUploadFilesIndex = ref(0);
const filesInputRef = ref<HTMLInputElement>(null!);

onBeforeUnmount(() => {
	for (const {task} of uploadingFiles.value) {
		task.cancel();
	}
});

function handleDrop(e: DragEvent) {
	isDraggedOver.value = false;
	const files = [...e.dataTransfer!.files];
	uploadFiles(files);
}

function handleAudioFilesChange(e: Event) {
	isDraggedOver.value = false;
	const files = [...(e.target as HTMLInputElement).files!];
	uploadFiles(files);
}

function uploadFiles(files: File[]) {
	if (!navigator.onLine) return toastError(null, 'Check your internet connection!');
	files.forEach((file, i) => {
		emit('onUploadFile', file, i + startUploadFilesIndex.value);
	});
	startUploadFilesIndex.value += files.length
}
</script>
