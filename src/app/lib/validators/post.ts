import { z } from "zod"

export const postSchema = z.object({
    subject: z
        .string()
        .min(3)
        .max(21)
})

export type TSpostSchema = z.infer<typeof postSchema>