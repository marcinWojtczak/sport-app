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
   
  console.log(slug)
    const session = await getServerSession(authOptions)

    const community = await db.community.findFirst({
      where: { title: slug },
      include: {
        posts: {
          include: {
            author: true,
            comments: true,
            community: true
          }
        }
      },
      
      take: INFINITE_SCROLLING_PAGINATION_RESULTS
    })

    if(!community) return notFound()

    return (
    <>
      <h1 className='font-bold mb-4'>r/{community.title}</h1>
      <CreatePost session={session}/>
    </>
  )
}

export default Page