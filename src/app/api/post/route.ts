import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth"
import { postSchema } from '@/app/lib/validators/post';
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
        const { subject } = postSchema.parse(body)
        
        
        const post = await db.post.create({
           data: {
            title: subject,
            authorId: session.user.id,
           },
        })
        
        return new NextResponse("Post created")
    } catch(error: unknown) {
        if(error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 })
        }
        return new NextResponse(String(error) , { status: 500 })
    }

}