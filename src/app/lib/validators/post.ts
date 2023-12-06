import { z } from "zod"

export const postSchema = z.object({
    subject: z
        .string()
        .min(3, { message: "Title must be 3 or more characters long"})
})

export type TPostSchema = z.infer<typeof postSchema>