import { z } from "zod"

export const postSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be 3 or more characters long."})
        .max(150, { message: "Title can't be longer then 130 characters."}),
    eventId: z 
        .string(),
    content: z
        .any(),

        
})

export type TPostSchema = z.infer<typeof postSchema>