import { db } from '@/app/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'
import Editor from '@/app/components/Editor'
import EditorToggle from '@/app/components/EditorToggle'
import { Button } from '@/app/components/ui/Button'


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
                <h3 className='text-base font-semibold leading-6 text-dark'>
                    Create Post
                </h3>
                <p className='ml-2 mt-1 truncate text-sm text-slate-600'>in r/{slug}</p>
            </div>
        </div>

        <div className='relative w-full '>
           <Editor communityId={community.id} />
        </div>

        {/* <div className='w-full flex justify-end'>
            <Button type='submit' className='w-full dark:bg-slate-950' form='community-post-form'>
                Post
            </Button>
        </div> */}
    </div>
  )
}

export default Page