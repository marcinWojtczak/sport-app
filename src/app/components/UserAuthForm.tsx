'use client'
import { Button, buttonVariants } from './ui/Button'
import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import { Icons } from './Icons'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'



interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{}

export const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const loginWithGoogle = async () => {
        setIsLoading(true)

        try {
            throw new Error('Error')
            await signIn('google')
        } catch(error){
            toast({
                title: 'There was a problem',
                description: 'There was an error logging in with Google',
                variant: 'destructive'
                
            })
        }finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='flex flex-col gap-2 w-full'>
        <Button 
            className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'bg-[#DB4437] hover:outline outline-1 outline-slate-300')}
            onClick={loginWithGoogle}
            isLoading={isLoading}
        >
            {isLoading ? null : <Icons.Google className='mr-1'/>}
            Continue with Google
        </Button>

        <Button className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'bg-[#4267B2] hover:outline outline-1 outline-slate-300')}
            onClick={loginWithGoogle}
            isLoading={isLoading}
        >
            {isLoading ? null : <Icons.Facebook className='mr-1'/>}
            Continue with Facebook
        </Button>

        <Button className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'bg-black hover:outline outline-1 outline-slate-300')}
            onClick={loginWithGoogle}
            isLoading={isLoading}
        >
            {isLoading ? null : <Icons.Github className='mr-1'/>}
            Continue with GitHub
        </Button> 
    </div>
  )
}
