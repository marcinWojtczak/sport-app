import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth"
import { communitySchema } from '@/app/lib/validators/community';
import { db } from '@/app/lib/db';
import { NextResponse } from "next/server";
import z from "zod" 


export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        

        if(!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        
        const body: unknown = await request.json()
        const { title } = communitySchema.parse(body)
        
        const communityExists = await db.community.findFirst({
            where: {
                title,
            }
        })

        if(communityExists) {
            return new NextResponse('Community already exists', { status: 409})
        }
        
        const community = await db.community.create({
           data: {
            title,
            creatorId: session.user.id,
           },
        })
        
        await db.subscription.create({
            data: {
                userId: session.user.id,
                communityId: community.id
            }
        })
        return new NextResponse("Community created")
    } catch(error: unknown) {
        if(error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 })
        }
        return new NextResponse(String(error) , { status: 500 })
    }

}