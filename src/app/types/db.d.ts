import { Post, Event, User, Comment, Media } from "@prisma/client"

export type ExtendedMedia = Pick<Media, 'url'>;


export type ExtendedPost = Post & {
    media: Media[]
}

export type ExtendedEvent = Event & {
    posts: ExtendedPosts[],
}