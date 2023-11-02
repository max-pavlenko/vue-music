import {toastError} from '@/app/shared/config/toast';
import {storage} from '@/includes/firebase';
import {Reference} from '@firebase/storage-types';
import {UploadFileConfig} from '@/app/shared/models/file';

export class FileService {
   private startUploadFilesIndex = 0;
   
   iterateFilesWithPreservedPosition(files: File[], onUploadFile: (file: File, index: number) => void) {
      if (!navigator.onLine) return toastError(null, 'Check your internet connection!');
      files.forEach((file, i) => {
         onUploadFile(file, i + this.startUploadFilesIndex)
      });
      this.startUploadFilesIndex += files.length
   }
   
   static async uploadFile({file, onProgress, onUploadTask, fileTypeRegex = /audio\/.+/, path = 'songs'}: UploadFileConfig) {
      if (!RegExp(fileTypeRegex).exec(file.type)) {
         throw new Error("Invalid file type.");
      }
      
      const storageRef = storage.ref();
      const songRef = storageRef.child(`${path}/${file.name}`);
      const uploadTask = songRef.put(file);
      onUploadTask?.(uploadTask);
      
      return new Promise<Reference>((resolve, reject) => {
         uploadTask.on("state_changed", ({ totalBytes, bytesTransferred }) => {
                const progress = (bytesTransferred / totalBytes) * 100;
                onProgress?.(progress);
             },
             (error) => {
                reject(error);
             },
             async () => {
                resolve(uploadTask.snapshot.ref);
             }
         );
      });
   }
}
