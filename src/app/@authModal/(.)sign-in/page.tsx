// import CloseModal from '@/components/CloseModal'
import SignIn from '@/components/SignIn'
import { FC } from 'react'
import { CloseModal } from '@/app/components/CloseModal'

const page: FC = () => {
  return (
    <div className='fixed inset-0 bg-slate-200 z-10'>
        <div className='container flex items-center h-full max-w-lg mx-auto'>
            <div className='relative bg-white h-fit py-14 px-2 rounded-lg'>
                <div className='absolute top-4 right-4'>
                    <CloseModal />
                </div>
                <SignIn />
            </div>
        </div>
    </div>
  )
}

export default page