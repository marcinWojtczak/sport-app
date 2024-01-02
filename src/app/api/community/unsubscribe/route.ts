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

        //check if user has alredy subscribed or not
        const subscriptionExists = await db.subscription.findFirst({
            where: {
                communityId,
                userId: session.user.id
            }
        })

        if(!subscriptionExists) {
            return new NextResponse("You are not subscribed to this community", { status: 400 })
        }

        // check if user is the creator of the community
        const community = await db.community.findFirst({
            where: {
                id: communityId,
                creatorId: session.user.id
            }
        })

        if(community) {
            return new NextResponse("You cant unsubscribed your own community", { status: 400 })
        }
        
        await db.subscription.delete({
            where: {
                userId_communityId: {
                    communityId,
                    userId: session.user.id,
                }
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