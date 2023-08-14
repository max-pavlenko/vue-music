import type {Schema} from "@/app/shared/types";

export const EDIT_SONG_SCHEMA: Schema = {
    song_title: 'required|min:3|max:100',
    genre: 'alphaSpaces',
}

export const SONG_COMMENT_SCHEMA: Schema = {
    comment: 'required|min:3|max:1000',
}
