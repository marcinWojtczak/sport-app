import { z } from "zod"

export const communitySchema = z.object({
    title: z
        .string()
        .min(5, { message: "Title must be 5 or more charcters long"})
})

export const communitySubscriptionSchema = z.object({
    communityId: z 
        .string()
})

export type TCommunitySchema = z.infer<typeof communitySchema> 
export type TCommunitySubscriptionSchema = z.infer<typeof communitySubscriptionSchema>