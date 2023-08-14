import {UploadTask} from "@firebase/storage-types";

export type Props<T extends UploadingFile> = { uploadingFiles: T[] };
export type Emits = { onUploadFile: [file: File, i: number] };
export type UploadingFile = { name: string, progress: number, task: UploadTask, isError: boolean, isSuccess: boolean }
