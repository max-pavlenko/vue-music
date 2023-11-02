import {Song} from '@/app/features/music/models/audio';

export type Props = {
   song: Song;
}

export interface UpdateSongRequest {
   id: Song['id'],
   song_title: string,
   genre: string
}

export type Emits = {
   onSubmit: [UpdateSongRequest],
   onDelete: [Pick<Song, 'id'>]
}
