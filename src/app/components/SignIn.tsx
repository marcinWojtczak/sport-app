import React from 'react'
import { UserAuthForm } from './UserAuth'

const SignIn = () => {
  return (
    <div className='container flex flex-col gap-10 items-center'>
        <div className='text-center'>
            <h2 className='text-2xl font-bold mb-5'>Welcome Back</h2>
            <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste repellat atque quo neque non modi, dolorem fugiat earum incidunt adipisci, temporibus vero voluptates facere. Ipsum dolore alias exercitationem eos suscipit.</p>
        </div>
        
        <UserAuthForm />
    </div>

  )
}

export default SignIn

 