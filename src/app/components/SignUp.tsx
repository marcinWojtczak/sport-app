import Link from 'next/link'
import { SignUpForm } from '@/components/form/SignUpForm'



const SignUp = () => {
  return (
    <div className='container flex flex-col gap-2 items-center mx-auto sm:w-[400px]'>
        <div className='text-center'>
            <h2 className='text-2xl font-bold mb-5'>Sign Up</h2>
            <p className='text-sm max-w-md mx-auto'>By continuing, you are setting up a Breadit account and agree to our User Agreement and Privacy Policy.</p>
        </div>
        
        <SignUpForm />

        <p className='px-8 text-center text-sm text-muted-foreground'>
        Already on SportApp?{' '}
        <Link
          href='/sign-in'
          className='hover:text-brand text-sm underline underline-offset-4'>
          Sign In
        </Link>
      </p>
    </div>

  )
}

export default SignUp