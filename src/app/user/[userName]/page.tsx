import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { db } from '@/app/lib/db'
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/Button'
import { UserAvatar } from '@/app/components/UserAvatar'
import Link from 'next/link'

interface PageProps {
  params: {
      userName: string,
  }
}

const Page = async ( { params: { userName }}: PageProps) => {

  const session = await getServerSession(authOptions)
  const decodeName = decodeURIComponent(userName)
  
  const user = await db.user.findUnique({
    where: {
      name: decodeName
    }
  })

  return (
    <div className='h-full flex flex-col gap-8'>
      <div className='flex items-center gap-2'>
        <UserAvatar 
          user={{
            name: session?.user.name || null,
            image: session?.user.image || null
          }}
          className='border-4 border-emerald-400 rounded-[50%] w-14 h-14'
        />
        <h1 className='font-bold text-2xl md:text:4xl'>{user?.name} </h1>
      </div>
      <div className='flex flex-wrap gap-4'>
        <Link className={cn(buttonVariants({ variant: "outline"}), 'w-fit hover:text-white')}
          href='/s/create'
        >
          Create a Community
        </Link>
        <Link className={cn(buttonVariants({ variant: "outline"}), 'w-fit hover:text-white')}
          href={''}
        >
          Create Post
        </Link>
        <Button className={cn(buttonVariants({ variant: "outline"}), 'bg-input hover:text-white')}>
          Overview  
        </Button>
        <Link
          className={cn(buttonVariants({ variant: "outline"}), 'bg-input hover:text-white')}
          href={`/user/${user?.name}/posts`}
        >
          Your Posts 
        </Link>
        <Link 
          className={cn(buttonVariants({ variant: "outline"}), 'bg-input hover:text-white')}
          href={`/${user?.name}/comments`}
        >
          Your Comments  
        </Link>
      </div>
    </div>
  )
}

export default Page

