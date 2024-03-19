import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth"
import { eventSchema } from '@/app/lib/validators/event';
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
        const { name } = eventSchema.parse(body)
        
        const eventExists = await db.event.findFirst({
            where: {
                name,
            }
        })

        if(eventExists) {
            return new NextResponse('Event already exists', { status: 409})
        }
        
        const event = await db.event.create({
           data: {
            name,
            creatorId: session.user.id,
           },
        })
        
       
        return new NextResponse("Event created")
    } catch(error: unknown) {
        if(error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 })
        }
        return new NextResponse(String(error) , { status: 500 })
    }

}