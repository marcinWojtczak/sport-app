'use client'
import { useForm } from "react-hook-form"
import React from 'react'
import { signUpSchema, TSignUpSchema } from "@/app/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from '@/components/ui/Button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Icons } from "../Icons"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/Input"
import useProvidersAuthentication from "@/app/hooks/login-providers"

export const SignUpForm = () => {
    const [facebookIsLoading, setFacebookIsLoading] = useState<boolean>(false)
    const [googleIsLoading, setGoogleIsLoading] = useState<boolean>(false)
    const [githubIsLoading, setGithubIsLoading] = useState<boolean>(false)
    const [registerError, setRegisterError] = useState<string | null>(null);
    const router = useRouter()
    const {
        register,
        handleSubmit, 
        formState: { errors },
    } = useForm<TSignUpSchema>({resolver: zodResolver(signUpSchema)})
    
    const { loginWithProvider } = useProvidersAuthentication()

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
                    <Input
                        {...register("username")}
                        type="text"
                        placeholder='User name'
                        autoComplete="off"
                    />
                    {errors.username && (
                        <p className='text-red font-semibold'>{`${errors.username.message}`}</p>
                    )}
                    
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder='Email'
                        autoComplete="off"
                    />
                    {errors.email && (
                        <p className='text-red font-semibold'>{`${errors.email.message}`}</p>
                    )}
    
                    <Input
                        {...register("password")}
                        type="password"
                        placeholder='Password'
                        autoComplete="off"
                    />
                    {errors.password && (
                        <p className='text-red font-semibold'>{`${errors.password.message}`}</p>
                    )}
    
                    <Input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder='Confirm password'
                        autoComplete="off"
                    />
                    {errors.confirmPassword && (
                        <p className='text-red font-semibold'>{`${errors.confirmPassword.message}`}</p>
                    )}
                    {registerError && (
                        <p className='text-red font-semibold'>{`${registerError}`}</p>
                    ) }
    
                    <Button className='bg-emerald-400'>Sign up</Button>
                </div>
            </form>
            
            <div className='flex items-center my-3'>
                <div className='flex-1 h-[1px] bg-muted-foreground'></div>
                    <span className='mx-2 text-md text-muted-foreground'>or</span>
                <div className='flex-1 h-[1px] bg-muted-foreground'></div>
            </div>
    
            <Button 
                className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'text-dark dark:text-slate-50 font-normal hover:outline hover:text-black outline-1 outline-slate-100 hover:bg-slate-100')}
                onClick={() => loginWithProvider('google')}
                isLoading={googleIsLoading}
            >
                {googleIsLoading ? null : <Icons.Google />}
                <p className='ml-2'>Continue with Google</p>
            </Button>
    
            <Button className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'text-slate-50 bg-[#3b5998] hover:bg-[#3b5998]/80 font-normal hover:outline outline-1 outline-slate-100')}
                onClick={() => loginWithProvider('facebook')}
                isLoading={facebookIsLoading}
            >
                {facebookIsLoading ? null : <Icons.Facebook className='mr-1 h-5 w-5'/>}
                <p className='ml-2'>Continue with Facebook</p>
            </Button>
    
            <Button className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'text-slate-50 bg-black hover:bg-black/80 font-normal hover:outline outline-1 outline-slate-100')}
                onClick={() => loginWithProvider('github')}
                isLoading={githubIsLoading}
            >
                {githubIsLoading ? null : <Icons.Github className='mr-1 h-5 w-5'/>}
                <p className='ml-2'>Continue with GitHub</p>
            </Button>
        </div>
      )
    }
