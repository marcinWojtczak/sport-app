import PostFeed from "@/components/PostFeed"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { db } from '@/app/lib/db'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/app/config'



export default async function Home() {
  
  const session = await getServerSession(authOptions)
  
  const posts = await db.post.findMany({
    include: {
      comments: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  })
  
  
  

  return (
      <div className='flex flex-col items-center sm:container max-w-7xl mx-auto h-full pt-12'>
        <PostFeed 
          initialPosts={posts}
          user={session?.user}
          />
      </div>
  )
}


