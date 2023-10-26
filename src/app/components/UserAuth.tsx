'use client'
import { Button, buttonVariants } from '@/components/ui/Button'
import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { AuthForm } from '@/components/AuthForm'



interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{}

export const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    const [facebookIsLoading, setFacebookIsLoading] = useState<boolean>(false)
    const [googleIsLoading, setGoogleIsLoading] = useState<boolean>(false)
    const [githubIsLoading, setGithubIsLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const loginWithGoogle = async () => {
        setGoogleIsLoading(true)

        try {
            await signIn('google')
        } catch(error){
            toast({
                title: 'There was a problem',
                description: 'There was an error logging in with Google',
                variant: 'destructive'
                
            })
        }finally {
            setGoogleIsLoading(false)
        }
    }

    const loginWithFacebook = async () => {
        setFacebookIsLoading(true)

        try {
            await signIn('facebook')
        } catch(error){
            toast({
                title: 'There was a problem',
                description: 'There was an error logging in with Facebook',
                variant: 'destructive'
                
            })
        }finally {
            setFacebookIsLoading(false)
        }
    }

    const loginWithGithub = async () => {
        setGithubIsLoading(true)

        try {
            await signIn('github')
        } catch(error){
            toast({
                title: 'There was a problem',
                description: 'There was an error logging in with Github',
                variant: 'destructive'
                
            })
        }finally {
            setGithubIsLoading(false)
        }
    }

    

  return (
    <div className='flex flex-col gap-2 w-full'>
        <AuthForm />

        <div className='flex items-center mt-5'>
            <div className='flex-1 h-[1px] bg-slate-400'></div>
                <span className='mx-2 text-md text-slate-400'>or</span>
            <div className='flex-1 h-[1px] bg-slate-400'></div>
        </div>

        <Button 
            className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'bg-[#DB4437] hover:outline outline-1 outline-slate-300')}
            onClick={loginWithGoogle}
            isLoading={googleIsLoading}
        >
            {googleIsLoading ? null : <Icons.Google className='mr-1'/>}
            Continue with Google
        </Button>

        <Button className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'bg-[#4267B2] hover:outline outline-1 outline-slate-300')}
            onClick={loginWithFacebook}
            isLoading={facebookIsLoading}
        >
            {facebookIsLoading ? null : <Icons.Facebook className='mr-1'/>}
            Continue with Facebook
        </Button>

        <Button className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'bg-black hover:outline outline-1 outline-slate-300')}
            onClick={loginWithGithub}
            isLoading={githubIsLoading}
        >
            {githubIsLoading ? null : <Icons.Github className='mr-1'/>}
            Continue with GitHub
        </Button>
        
    </div>
  )
}
