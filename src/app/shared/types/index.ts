export type Song = {
    id: string,
} & Audio;

export type Audio = {
    genre?: string,
    commentsCount: number
    creatorID: string
    creatorName: null | string
    modifiedName: string
    originalName: string
    url: string,
}

export type Comment = {
    id: string,
    authorName: string,
    authorID: string,
    content: string,
    date: string,
    songID: string,
}

export type EmitHandler<T extends any[]> = (...args: T) => void;
export type Schema = Record<string, string>

export enum LocalStorageKeys {
    COMMENTS_DATE_SORT_DIRECTION = 'COMMENTS_DATE_SORT_DIRECTION',
}
