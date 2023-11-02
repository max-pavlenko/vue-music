import firebase from '@/includes/firebase';
import {UploadTask} from '@firebase/storage-types';
import {UploadingFileStatus} from '@/app/shared/models/file-status';

export interface UploadFileConfig {
   file: File,
   path?: string,
   onProgress?: (progress: number) => void,
   onUploadTask?: (uploadTask: firebase.storage.UploadTask) => void,
   fileTypeRegex?: RegExp
}

export interface UploadingFile {
   name: string,
   progress: number,
   task: UploadTask,
   status: UploadingFileStatus
}

export type AreaDnDEmits = {
   onUploadFile: [File, number];
}
