import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { db } from '@/app/lib/db'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/app/config'
import { notFound } from 'next/navigation'
import CreatePost from '@/app/components/CreatePost'

interface PageProps {
    params: {
        slug: string
    }
}

const Page = async ({ params }: PageProps) => {
    const { slug } = params

    const decodedSlug = decodeURIComponent(slug)
    
    const session = await getServerSession(authOptions)

    const event = await db.event.findFirst({
      where: { name: decodedSlug },
      include: {
        posts: {
          include: {
            author: true,
            comments: true,
            event: true
          }
        }
      },
      
      take: INFINITE_SCROLLING_PAGINATION_RESULTS
    })

    if(!event) return notFound()

    return (
    <div>
      <h1 className='font-bold mb-4'>s/{event.name}</h1>
      <CreatePost session={session}/>
    </div>
  )
}

export default Page