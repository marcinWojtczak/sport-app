import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/ui/Button'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import { authOptions } from '../lib/auth'
import { ThemeToggle } from './ThemeToggle'
import SidebarToggle from './SidebarToggle'
import { PenSquare } from 'lucide-react';

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    <nav className='fixed z-50 top-0 left-0 right-0 h-20 border-b border-input flex items-center justify-between bg-slate-50 dark:bg-dark'>
      <div className='container max-w-[1400px] mx-auto flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <SidebarToggle />

          <Link href='/' className='text-slate-900 dark:text-white text-2xl font-semibold tracking-wider'>
            Sportify
          </Link>
      </div>

        <div className='md:hidden'>
          <ThemeToggle />
        </div>

      
        <div className='hidden md:flex gap-4 items-center justify-center'>
          <ThemeToggle />
          {session?.user ? (
            <>
              <Link href='/r/create'>
                <PenSquare size={24} className='text-slate-600 dark:text-slate-50'/>
              </Link>
              <UserAccountNav user={session.user}/>
            </>
          ) : (
            <Link
              href='/sign-up' 
              className={cn(buttonVariants({ variant: 'outline'}))}
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