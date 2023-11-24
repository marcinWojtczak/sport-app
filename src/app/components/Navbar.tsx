import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/ui/Button'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import { authOptions } from '../lib/auth'
import { ThemeToggle } from './ThemeToggle'
import SidebarToggle from './SidebarToggle'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    <nav className='fixed z-50 top-0 left-0 right-0 h-20 border-b border-input flex items-center justify-between dark:bg-dark'>
      <div className='container max-w-[1400px] mx-auto flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <SidebarToggle />

          <Link href='/' className='text-slate-900 dark:text-white text-xl font-semibold tracking-wider'>
            Sportify
          </Link>
      </div>

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