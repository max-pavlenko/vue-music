import {ValidationSchema} from '@/app/shared/types/validation';

export const MUSIC_VALIDATION_SCHEMA = {
    EDIT_SONG: {
        song_title: 'required|min:3|max:100',
        genre: 'alphaSpaces',
    },
    SONG_COMMENT: {
        comment: 'required|min:3|max:1000',
    },
} satisfies ValidationSchema;
