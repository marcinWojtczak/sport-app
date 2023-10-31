'use client'
import SignIn from '@/components/SignIn'
import { FC } from 'react'
import { CloseModal } from '@/app/components/CloseModal'
import { useSearchParams } from "next/navigation"
import { useRef, useEffect } from 'react'


const Page = () => {
  const searchParams = useSearchParams()
  const dialogRef = useRef<null | HTMLDialogElement>(null)
  const showDialog = window.location.pathname

  useEffect(() => {
      dialogRef.current?.showModal()
      console.log('terter')
  }, [])

  return (
    <dialog ref={dialogRef} className='fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-slate-800/50'>
        <div className='container flex items-center h-full max-w-lg mx-auto'>
            <div className='relative bg-white h-fit py-14 px-2 rounded-lg'>
                <div className='absolute top-4 right-4'>
                    <CloseModal />
                </div>
                
                <SignIn />
            </div>
        </div>
    </dialog>
  ) 
}

export default Page
