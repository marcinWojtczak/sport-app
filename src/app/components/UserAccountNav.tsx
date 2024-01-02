'use client'
import React  from 'react'
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,  DropdownMenuSeparator,DropdownMenuItem} from '@/components/ui/DropdownMenu';
import { UserAvatar } from '@/components/UserAvatar';
import { User } from 'next-auth';
import Link from 'next/link';
import { Cog, Home, MessageSquarePlus, LogOut, Mail, User2 } from 'lucide-react';
import { signOut } from "next-auth/react"
import Image from 'next/image'

interface UserAccounNavProps  {
  user: Pick<User, 'name' | 'image' | 'email' | 'id'>
}

export const UserAccountNav = ({user}: UserAccounNavProps) => {
  
  return (
    <DropdownMenu >
      <DropdownMenuTrigger >
        <UserAvatar 
          user={{ name: user.name || null, image: user.image || null }}
          className='rounded-[50%] w-6 h-6'
        />
      </DropdownMenuTrigger >
      <DropdownMenuContent className='border bprder-1 border-slate-400 p-4 bg-white dark:bg-dark rounded-sm' align='end'>
        <div className='my-2 px-2'>
          {user.name &&
          <Link href={`/user/${user.name}`}>
              <div className='flex items-center my-2'>
                  {user.image ? (
                    <Image alt='user image' className='w-4 h-4 mr-2 rounded-[50%]' src={user.image} width='24' height='24'/>
                  ) : (
                    <User2 className='w-4 h-4 mr-2'/>
                  )
              }
                <p className='font-bold text-sm text-black dark:text-slate-50'>{user.name}</p>
              </div>
            </Link>
          }
          {user.email && 
            <div className='flex items-center text-slate-500 dark:text-slate-50'>
              <Mail className='w-4 h-4 mr-2'/>
              <p className='font-semibold text-xs'>{user.email}</p>
            </div>
          } 
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem className='my-2 text-slate-500 dark:text-slate-50'>
          <Home className='w-4 h-4 mr-2'/>
          <Link href='/' >Feed</Link>
        </DropdownMenuItem>
          
        <DropdownMenuItem className='my-2 text-slate-500 dark:text-slate-50'>
          <MessageSquarePlus className='w-4 h-4 mr-2'/>
          <Link href='/r/create' >Create community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='my-2 text-slate-500 dark:text-slate-50'>
          <Cog className='w-4 h-4 mr-2'/> 
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator/>

        <DropdownMenuItem 
          className='my-2 text-slate-500 dark:text-slate-50' 
          onSelect={(e) => {
            e.preventDefault()
            signOut({callbackUrl: `${window.location.origin}/sign-in`
        })}}>
          <LogOut className='w-4 h-4 mr-2'/>          
          Sign out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

