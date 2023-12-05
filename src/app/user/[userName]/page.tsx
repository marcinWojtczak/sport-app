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
    <div>
      <div className='h-full flex flex-col '>
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
          <div className="w-[90%] sm:w-[60%] md:gap-x-4 sm:py-6 mx-auto">
            <div className='overflow-hidden h-fit rounded-lg order-first md:order-last border border-emerald-400 '>
              <div className="bg-emerald-400 px-6 py-4 ">
                <p className="font-semibold py-3 flex items-center gap-1.5">
                  <HomeIcon className='w-4 h-4' />
                  Home
                </p>
              </div>

              <div className='-mx-3 px-6 py-4 text-sm text-slate-400'>
                <div className='flex justify-between gap-x-4 py-3'>
                  <p className='slate-400'>
                    Your personal homepage. Create you're own event.
                  </p>
                </div>

                <Link href="/r/create" className={cn(buttonVariants({ className: "w-full mt-4 mb-8 t" }))}>Create Event</Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Page