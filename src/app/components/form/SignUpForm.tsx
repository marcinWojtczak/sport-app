'use client'
import { useForm } from "react-hook-form"
import React from 'react'
import { signUpSchema, TSignUpSchema } from "@/app/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from '@/components/ui/Button'
import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'

export const SignUpForm = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit, 
        formState: { errors },
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })
    const [facebookIsLoading, setFacebookIsLoading] = useState<boolean>(false)
    const [googleIsLoading, setGoogleIsLoading] = useState<boolean>(false)
    const [githubIsLoading, setGithubIsLoading] = useState<boolean>(false)
    const [registerError, setRegisterError] = useState<string | null>(null);
    
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
    
    const onSubmit = async (data: TSignUpSchema) => {
        try {
            const response = await fetch('api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword
                })
            })

            const responseData = await response.json();

            if(response.ok) {
                router.push('/sign-in')
            } else  {
                setRegisterError(responseData.message);
            }
        } catch(error: any) {
            if (error instanceof Error) {
                toast({
                    title: 'There was a problem',
                    description: error.message,
                    variant: 'destructive'
                })
            } else {
                toast({
                    title: 'There was a problem',
                    description: 'Unexpected error',
                    variant: 'destructive'
                })
            }
            
        }
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
    
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                    <input
                        {...register("username")}
                        type="text"
                        placeholder='User name'
                        className='border border-input w-full text-center h-9 rounded-md px-3 bg-accent'
                    />
                    {errors.username && (
                        <p className='text-red-500'>{`${errors.username.message}`}</p>
                    )}
                    
    
                    <input
                        {...register("email")}
                        type="email"
                        placeholder='Email'
                        className='border border-input w-full text-center h-9 rounded-md px-3 bg-accent'
                    />
                    {errors.email && (
                        <p className='text-red-500'>{`${errors.email.message}`}</p>
                    )}
    
                    <input
                        {...register("password")}
                        type="password"
                        placeholder='Password'
                        className='border border-input w-full text-center h-9 rounded-md px-3 bg-accent'
                    />
                    {errors.password && (
                        <p className='text-red-500'>{`${errors.password.message}`}</p>
                    )}
    
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder='Confirm password'
                        className='border border-input w-full text-center h-9 rounded-md px-3 bg-accent'
                    />
                    {errors.confirmPassword && (
                        <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
                    )}
                    {registerError && (
                        <p className='text-red-500 font-semibold'>{`${registerError}`}</p>
                    ) }
    
                    <Button>Sign up</Button>
                </div>
            </form>
            
            <div className='flex items-center my-3'>
                <div className='flex-1 h-[1px] bg-muted-foreground'></div>
                    <span className='mx-2 text-md text-muted-foreground'>or</span>
                <div className='flex-1 h-[1px] bg-muted-foreground'></div>
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
