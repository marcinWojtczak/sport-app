
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/ui/Button'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import { authOptions } from '../lib/auth'
import { ThemeToggle } from './ThemeToggle'



const Navbar = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    <nav className='fixed z-50 top-0 left-0 right-0 h-20 border-b border-input flex items-center justify-between px-4'>
      <div className='container max-w-[1400px] mx-auto flex items-center justify-between'>
        <Link href='/' className='text-slate-900 dark:text-white text-3xl font-bold'>
        Sportify
      </Link>

      <div className='md:hidden'>
        <ThemeToggle />
      </div>

      
      <div className='hidden md:flex gap-4'>
        <ThemeToggle />
        {session?.user ? (
          <UserAccountNav user={session.user}/>
        ) : (
          <Link
            href='/sign-up' 
            className={cn(buttonVariants({ variant: 'outline'}), 'hover:outline outline-1 outline-slate-100')}
          >
            Sign Up
          </Link>
        )}
      </div>
      </div>
    </nav>
  )
}

export default Navbar