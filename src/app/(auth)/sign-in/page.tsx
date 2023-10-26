import { buttonVariants } from '@/app/components/ui/Button'
import Link from 'next/link'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { ChevronsLeft } from 'lucide-react';
import SignIn from '@/app/components/SignIn';

const Page: FC = () => {
  return (
    <div className='absolute inset-0'>
      <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-2'>
        <Link 
          href='/' 
          className={cn(buttonVariants({ variant: 'ghost'}), 'self-start -mt-20')}
        >
          <ChevronsLeft className='h-4 w-4 mr-1'/>
          Home
        </Link>
        <SignIn/>
      </div>
    </div>
  )
}

export default Page