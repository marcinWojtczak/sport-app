import React from 'react'
import { Button } from './ui/Button'

export const AuthForm = () => {
  return (
    <form>
        <div className='flex flex-col items-center gap-1'>
            <div className='w-full'>
                <label htmlFor='name' className='text-xs font-semibold text-slate-600'>User Name</label>
                <input
                    id='name'
                    type='text'
                    placeholder='username'
                    autoFocus
                    className='border border-input w-full text-center h-9 rounded-md px-3 bg-accent '
                />
            </div>
            
            <div className='w-full mb-1'>
                <label htmlFor='email' className='text-xs font-semibold text-slate-600'>Email</label>
                <input
                    id='email'
                    type='emial'
                    placeholder='email'
                    autoFocus
                    className='border border-input w-full text-center h-9 rounded-md px-3 bg-accent'
                />
            </div>
            
            <Button variant='outline' className='w-full bg-dark-green'>Log in</Button>
        </div>
    </form>
  )
}
