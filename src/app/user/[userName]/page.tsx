import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { db } from '@/app/lib/db'
import { HomeIcon } from "lucide-react"
import Link from "next/link"
import Image from 'next/image'
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import User from "@/public/user.png"
import { Button } from '@/components/ui/Button'

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
      <div className='flex items-center gap-4'>
        <Image 
          src={user?.image ? user?.image : User}
          alt="Profile picture"
          width="62"
          height="62"
          className='border-4 border-emerald-400 rounded-[50%]'
        />
        <h1 className='font-bold text-2xl md:text:4xl'>{user?.name} </h1>
      </div>
      <div className='flex flex-wrap gap-4'>
        <Button className={cn(buttonVariants({ variant: "outline"}), 'w-fit hover:text-white')}>
          Create Post
        </Button>
        <Button className={cn(buttonVariants({ variant: "outline"}), 'bg-input hover:text-white')}>
          Overview  
        </Button>
        <Button className={cn(buttonVariants({ variant: "outline"}), 'bg-input hover:text-white')}>
          Posts 
        </Button>
        <Button className={cn(buttonVariants({ variant: "outline"}), 'bg-input hover:text-white')}>
          Comments  
        </Button>
      </div>
    </div>
  )
}

export default Page