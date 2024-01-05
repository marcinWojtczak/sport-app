import { z } from "zod"

export const communitySchema = z.object({
    title: z
        .string()
        .min(4)
})

export const communitySubscriptionSchema = z.object({
    communityId: z 
        .string()
})

export type TCommunitySchema = z.infer<typeof communitySchema> 
export type TCommunitySubscriptionSchema = z.infer<typeof communitySubscriptionSchema>