import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth"
import { communitySubscriptionSchema } from '@/app/lib/validators/community';
import { db } from '@/app/lib/db';
import z from "zod" 

export async function POST(request: Request) {
    try {

        const session = await getServerSession(authOptions)

        if(!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        
        const body: unknown = await request.json()

        const { communityId } = communitySubscriptionSchema.parse(body)

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                communityId,
                userId: session.user.id
            }
        })

        if(subscriptionExists) {
            return new NextResponse("You alredy sybscribed to this community", { status: 400 })
        }

        await db.subscription.create({
            data: {
                communityId,
                userId: session.user.id
            }
        })

        return new Response(communityId)
    } catch(error: unknown) {
        if(error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 })
        }
        return new NextResponse(String(error) , { status: 500 })
    }
}