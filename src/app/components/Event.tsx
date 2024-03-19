'use client'
import React from 'react';
import { MessageSquare } from 'lucide-react'
import Link from 'next/link';
import { UserAvatar } from './UserAvatar'
import { User } from 'next-auth';
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { ExtendedEvent, ExtendedPost } from '../types/db';


interface PostProps {
  user: Pick<User, 'name' | 'image'>
  events: ExtendedEvent[]
}

export default  function Events({ events, user }: PostProps) {
  const latestPosts: { [eventId: string]: ExtendedPost | null } = {}

  //Checks if the current post is the latest post
  events.map((event) => 
    event.posts.map(post => {
      if(!latestPosts[event.id] || new Date(post.createdAt) > new Date(latestPosts[event.id]?.createdAt || 0 )) {
        latestPosts[event.id] = post
      }
  }))
  

return (
    <div className='w-full'>
      <ul className='p-4 list-none w-full'>
      {events.map((event) => (
        <li className='border-y-[1px] border-slate-300 px-2 py-3 flex flex-col gap-3' key={event.id}>
          <div  className='flex flex-col gap-3'>
            <div className='flex gap-2 items-center'>
              <UserAvatar user={user} className='w-5 h-5' />
              <Link href={`/s/${event.name}`}>
                <p className='text-slate-500 font-medium'>s/{event.name}</p>
              </Link>
              <time className='text-[12px] text-slate-500'>
                {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
              </time>
            </div>
            <div 
              key={ event.id }
              className='flex flex-col gap-3'
            >
              <h2>{ latestPosts[event.id]?.title}</h2>
              <div dangerouslySetInnerHTML={{ __html:  latestPosts[event.id]?.content || ''}} />
              {!latestPosts[event.id]?.media || latestPosts[event.id]?.media?.length ? (
                  ''
                ) : (
                  <div className='bg-slate-300 w-full flex items-center justify-center rounded-md px-2'>
                    <Image
                      alt='Post Image' 
                      // @ts-ignore
                      src={latestPosts[event.id]?.media?.url}
                      width={200}
                      height={200}
                      priority
                      quality={100} 
                      sizes="(min-width: 420px) 200px, calc(12vw + 152px)"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='bg-slate-200 p-2 rounded-md flex items-center gap-1 text-[11px]'>
              <MessageSquare className='w-4 h-4 text-slate-800'/> 
              Comments
            </div>          
          </li>
        ))}
      </ul>
    </div>
  )
}

