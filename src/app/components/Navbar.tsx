import { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/ui/Button'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'


const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <nav className='fixed z-50 top-0 left-0 right-0 h-20 border-b border-dark-blue flex items-center justify-between px-4'>
      <div className='container max-w-[1400px] mx-auto flex items-center justify-between'>
        <Link href='/' className='text-dark-blue dark:text-slate-50 text-2xl font-bold'>
        Sportify
      </Link>
      <Link href='/sign-in' className={cn(buttonVariants({ variant: 'outline'}), 'bg-dark-green')}>Sign In</Link>
    </div>

    </nav>
  )
}

export default Navbar