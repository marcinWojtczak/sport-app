import { db } from '@/app/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'
import PostForm from '@/app/components/postForm/PostForm'


interface PageParams {
    params: {
        slug: string
    }
}

const Page = async ({ params: { slug } }: PageParams) => {
    const community = await db.community.findFirst({
        where: {
            title: slug
        }
    })

    if(!community) notFound()

  return (
    <div className='flex flex-col items-start justify-center gap-6'>
        <div className='border-b border-input pb-3'>
            <div className='flex flex-wrap items-center'>
                <h3 className='text-base font-semibold leading-6 text-dark dark:text-white'>
                    Create Post
                </h3>
                <p className='ml-2 mt-1 truncate text-sm text-slate-600'>in s/{slug}</p>
            </div>
        </div>

        <div className='relative w-full '>
           <PostForm communityId={community.id} />
        </div>
    </div>
  )
}

export default Page