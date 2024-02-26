import React from 'react'
import { SignInForm } from '@/app/components/authenticationForms/SignInForm'
import Link from 'next/link'


const SignIn = () => {
  return (
    <div className='container flex flex-col gap-2 items-center mx-auto sm:w-[400px]'>
        <div className='text-center'>
            <h2 className='text-2xl font-bold mb-5'>Welcome Back</h2>
            <p className='text-sm max-w-md mx-auto'>By continuing, you are setting up a Sportify account and agree to our User Agreement and Privacy Policy.</p>
        </div>
        
        <SignInForm />

        <p className='px-8 text-center text-sm text-muted-foreground'>
        New to SportApp?{' '}
        <Link
          href='/sign-up'
          className='hover:text-brand text-sm underline underline-offset-4'>
          Sign Up
        </Link>
      </p>
    </div>

  )
}

export default SignIn

 