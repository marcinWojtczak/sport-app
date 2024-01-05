'use client'
import { useForm } from "react-hook-form"
import { signInSchema, TSignInSchema } from "@/app/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from '@/components/ui/Button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { Input } from "@/components/ui/Input"
import useProvidersAuthentication from '@/hooks/login-providers'


export const SignInForm = () => {
    const [facebookIsLoading] = useState<boolean>(false)
    const [googleIsLoading] = useState<boolean>(false)
    const [githubIsLoading] = useState<boolean>(false)
    const [credentialError, setCredentialError] = useState<string | null>('')
    

    const { toast } = useToast()
    const router = useRouter()
    const { loginWithProvider } = useProvidersAuthentication()

    const {
        register,
        handleSubmit, 
        formState: { errors },
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema)
    })

    const onSubmit = async (data: TSignInSchema) => {
        
        const signInData = await signIn('credentials' ,{
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if(signInData?.error) {
            setCredentialError('Wrong Credentials. Invalid username or password')
            console.log(credentialError)
        } else {
            router.refresh()
            router.push('/')
        }
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder='Email'
                    />

                    <Input
                        {...register("password")}
                        type="password"
                        placeholder='Password'
                    
                    />
                    {credentialError && (
                        <p className='text-red font-semibold'>{credentialError}</p>
                    )}
    
                    <Button className="bg-emerald-400">Sign in</Button>
                </div>
            </form>
            
            <div className='flex items-center my-3'>
                <div className='flex-1 h-[1px] bg-muted-foreground'></div>
                    <span className='mx-2 text-md text-muted-foreground'>or</span>
                <div className='flex-1 h-[1px] bg-muted-foreground'></div>
            </div>
    
            <Button 
                className={cn(buttonVariants({ variant: 'outline', size: 'sm'}), 'text-dark dark:text-slate-50 font-normal hover:outline outline-1 outline-slate-100 hover:bg-slate-100 ')}
                onClick={() => loginWithProvider('google')}
                isLoading={googleIsLoading}
            >
                {googleIsLoading ? null : <Icons.Google className='mr-1 h-5 w-5'/>}
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
