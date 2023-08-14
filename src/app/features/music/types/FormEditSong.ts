import type {Song} from "@/app/shared/types";
import {EDIT_SONG_SCHEMA} from "@/app/features/music/constants/schemas";

type SongID = Pick<Song, 'id'>;
export type Props = {
    song: Song;
}
export type Emits = {
    onSubmit: [typeof EDIT_SONG_SCHEMA & SongID],
    onDelete: [SongID]
}
