'use client'
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export const CloseModal = () => {

  const router = useRouter()

  return (
    <Button 
      variant= 'subtle' 
      className='w-6 h-6 rounded-md p-0' 
      aria-label='close-modal'
      onClick={() => router.back()}
    >
      <X  className='w-4 h-4' style={{ cursor: 'pointer'}} />
    </Button>
  )
}
