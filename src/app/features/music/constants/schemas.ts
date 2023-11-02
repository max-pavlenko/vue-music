import {Schema} from '@/app/shared/models/auth';

export const EDIT_SONG_SCHEMA = {
    song_title: 'required|min:3|max:100',
    genre: 'alphaSpaces',
} satisfies Schema;

export const SONG_COMMENT_SCHEMA = {
    comment: 'required|min:3|max:1000',
} satisfies Schema;
