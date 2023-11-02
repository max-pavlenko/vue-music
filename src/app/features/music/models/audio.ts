export type Audio = {
   genre?: string,
   commentsCount: number
   creatorID: string
   creatorName: null | string
   modifiedName: string
   originalName: string
   url: string,
}

export type Song = {
   id: string,
} & Audio;
