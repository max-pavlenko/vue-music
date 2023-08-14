<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AreaDnD @on-upload-file="handleUploadAudioFile" :uploading-files="uploadingFiles"/>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"/>
          </div>
          <ListEditSongForms />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AreaDnD from "@/app/shared/components/ui/AreaDnd/AreaDnD.vue";
import {auth, songsCollection, storage} from "@/includes/firebase";
import {Reference, UploadTask, UploadTaskSnapshot} from "@firebase/storage-types";
import {toastError} from "@/app/shared/config/toast";
import {ref} from "vue";
import {Emits, UploadingFile} from "@/app/shared/components/ui/AreaDnd/types";
import type {EmitHandler} from "@/app/shared/types";
import {useSongsStore} from "@/stores/songs";
import ListEditSongForms from "@/app/features/music/components/ListEditSongForms.vue";

const {addSong} = useSongsStore();
const uploadingFiles = ref<UploadingFile[]>([]);

const handleUploadAudioFile: EmitHandler<Emits['onUploadFile']> = (file, idx) => {
  if (!file.type.match(/audio\/.+/)) return;
  const storageRef = storage.ref();
  const songRef = storageRef.child(`songs/${file.name}`);
  const uploadTask = songRef.put(file);
  uploadingFiles.value.push({
    name: file.name,
    progress: 0,
    task: uploadTask,
    isError: false,
    isSuccess: false,
  });

  trackTaskState({task: uploadTask, index: idx, onSuccess: handleStorageUploadSongSuccess})
}

const handleStorageUploadSongSuccess = async (ref: Reference) => {
  const song = {
    creatorID: auth.currentUser!.uid,
    creatorName: auth.currentUser!.displayName,
    originalName: ref.name,
    modifiedName: ref.name,
    commentsCount: 0,
    url: await ref.getDownloadURL()
  }
  const {id} = await songsCollection.add(song);
  addSong({...song, id});
}

function trackTaskState({task, index, onSuccess}: {
  task: UploadTask,
  index: number,
  onSuccess: (ref: Reference) => any
}) {
  task.on('state_changed', ({totalBytes, bytesTransferred}: UploadTaskSnapshot) => {
    uploadingFiles.value[index].progress = (bytesTransferred / totalBytes) * 100;
  }, (error) => {
    uploadingFiles.value[index].isError = true;
    toastError(error);
  }, async () => {
    uploadingFiles.value[index].isSuccess = true;
    const {ref: songTaskRef} = task.snapshot;
    onSuccess(songTaskRef);
  });
}
</script>
