import { z } from "zod"

export const eventSchema = z.object({
    name: z
        .string()
        .min(4)
})

export const eventSubscriptionSchema = z.object({
    eventId: z 
        .string()
})

export type TEventSchema = z.infer<typeof eventSchema> 
export type TEventSubscriptionSchema = z.infer<typeof eventSubscriptionSchema>