"use client"
import React, { useRef } from 'react'
import { ExtendedEvent, ExtendedPost } from '../types/db'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/app/config'
import axios from 'axios'
import Event from '@/app/components/Event'
import { User } from 'next-auth';


interface EventFeedProps { 
  user: Pick<User, 'name' | 'image' | 'email' | 'id'> | undefined
  events: ExtendedEvent[]
  
}


export default function EventFeed({ user, events }: EventFeedProps) {
      
  return (
    <div className='flex flex-col space-y-12 justify-center items-center w-full max-w-[900px]'>
     <Event
      events={events}
      user={{ name: user?.name || null, image: user?.image || null }}
    />
  </div>
  )
}

