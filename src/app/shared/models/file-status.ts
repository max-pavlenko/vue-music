interface FileStatusAttributes {
   icon: string;
   text?: string;
}

export enum UploadingFileStatus { PENDING, SUCCESS, ERROR }

export const FILE_STATUS_MAP: Record<UploadingFileStatus, FileStatusAttributes> = {
   [UploadingFileStatus.ERROR]: {icon: 'times', text: 'text-red-500'},
   [UploadingFileStatus.PENDING]: {icon: 'spinner fa-spin'},
   [UploadingFileStatus.SUCCESS]: {icon: 'check', text: 'text-green-500'},
};
