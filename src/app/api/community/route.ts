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
        
        
        const post = await db.community.create({
           data: {
            title,
            creatorId: session.user.id,
           },
        })
        
        return new NextResponse("Community created")
    } catch(error: unknown) {
        if(error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 })
        }
        return new NextResponse(String(error) , { status: 500 })
    }

}