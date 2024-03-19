import EventFeed from "@/app/components/EventFeed"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { db } from '@/app/lib/db'


export default async function Home() {
  
  const session = await getServerSession(authOptions)

  const events = await db.event.findMany({
    include: {
      posts: {
        include: {
          media: true
        }
      }
    }
  })
  
  return (
      <div className='flex flex-col items-center sm:container max-w-7xl mx-auto h-full pt-12'>
        <h2 className='font-medium'>Today's events</h2>
        <EventFeed 
          user={session?.user}
          events={events}
        />
      </div>
  )
}


