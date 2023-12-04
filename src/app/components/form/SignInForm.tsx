'use client'
import { useForm } from "react-hook-form"

import { signInSchema, TSignInSchema } from "@/app/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from '@/components/ui/Button'
import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'




export const SignInForm = () => {
    const [facebookIsLoading, setFacebookIsLoading] = useState<boolean>(false)
    const [googleIsLoading, setGoogleIsLoading] = useState<boolean>(false)
    const [githubIsLoading, setGithubIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()
    const {
        register,
        handleSubmit, 
        formState: { errors },
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema)
    })

    const onSubmit = async (data: TSignInSchema) => {
        try {
            await signIn('credentials', {
                email: data.email,
                password: data.password,
            })
        }catch (error) {
            toast({
                title: 'There was a problem',
                description: 'Invalid credential',
                variant: 'destructive'
                
            })
        }
    }

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
    
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder='Email'
                        className='border border-input w-full text-center h-9 rounded-md px-3 dark:bg-inherit'
                    />
                    {errors.email && (
                        <p className='dark:text-red-500'>{`${errors.email.message}`}</p>
                    )}
    
                    <input
                        {...register("password")}
                        type="password"
                        placeholder='Password'
                        className='border border-input w-full text-center h-9 rounded-md px-3 dark:bg-inherit'
                    />
                    {errors.password && (
                        <p className='text-red-500'>{`${errors.password.message}`}</p>
                    )}
    
                    <Button className="bg-mint">Sign in</Button>
                </div>
            </form>
            
            <div className='flex items-center my-3'>
                <div className='flex-1 h-[1px] bg-muted-foreground'></div>
                    <span className='mx-2 text-md text-muted-foreground'>or</span>
                <div className='flex-1 h-[1px] bg-muted-foreground'></div>
            </div>
    
            <Button 
                className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'text-dark dark:text-slate-50 font-normal hover:outline outline-1 outline-slate-100 hover:bg-slate-100 ')}
                onClick={loginWithGoogle}
                isLoading={googleIsLoading}
            >
                {googleIsLoading ? null : <Icons.Google className='mr-1 h-5 w-5'/>}
                <p className='ml-2'>Continue with Google</p>
            </Button>
    
            <Button className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'text-slate-50 bg-[#3b5998] hover:bg-[#3b5998]/80 font-normal hover:outline outline-1 outline-slate-100')}
                onClick={loginWithFacebook}
                isLoading={facebookIsLoading}
            >
                {facebookIsLoading ? null : <Icons.Facebook className='mr-1 h-5 w-5'/>}
                <p className='ml-2'>Continue with Facebook</p>
            </Button>
    
            <Button className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'text-slate-50 bg-black hover:bg-black/80 font-normal hover:outline outline-1 outline-slate-100')}
                onClick={loginWithGithub}
                isLoading={githubIsLoading}
            >
                {githubIsLoading ? null : <Icons.Github className='mr-1 h-5 w-5'/>}
                <p className='ml-2'>Continue with GitHub</p>
            </Button>
        </div>
      )
    }
