'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,  DropdownMenuSeparator,DropdownMenuItem} from '@/components/ui/DropdownMenu';
import { UserAvatar } from '@/components/UserAvatar';
import { User } from 'next-auth';
import Link from 'next/link';
import { Cog, Home, MessageSquarePlus, LogOut, Mail, User2 } from 'lucide-react';
import { signOut } from "next-auth/react"

interface UserAccounNavProps  {
  user: Pick<User, 'name' | 'image' | 'email'>
}

export const UserAccountNav = ({user}: UserAccounNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <UserAvatar user={user}/>
      </DropdownMenuTrigger >
      <DropdownMenuContent className='border bprder-1 border-dark-green p-4 bg-white rounded-sm' align='end'>
        <div className='my-2 px-2'>
          {user.name &&
            <div className='flex items-center my-2'>
              <User2 className='w-4 h-4 mr-2'/>
              <p className='font-semibold text-sm'>{user.name}</p>
            </div> 
          }
          {user.email && 
            <div className='flex items-center'>
              <Mail className='w-4 h-4 mr-2'/>
              <p className='font-semibold text-xs'>{user.email}</p>
            </div>
          } 
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem className='my-2'>
          <Home className='w-4 h-4 mr-2'/>
          <Link href='/'>Feed</Link>
        </DropdownMenuItem>
          
        <DropdownMenuItem className='my-2'>
          <MessageSquarePlus className='w-4 h-4 mr-2'/>
          <Link href='/r/create'>Create community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='my-2'>
          <Cog className='w-4 h-4 mr-2'/> 
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator/>

        <DropdownMenuItem 
          className='my-2' 
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

