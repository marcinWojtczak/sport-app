'use client'
import React, { useState } from 'react'
import { Image, Link,  BookText } from 'lucide-react'

interface EditorToggleProps {
    isButtonActive: string | null
    setIsButtonActive: React.Dispatch<React.SetStateAction<string | null>>
}

export default function EditorToggle({ isButtonActive, setIsButtonActive }: EditorToggleProps) {
    
    const handleButtonClick = ( buttonName: string) => {
        setIsButtonActive(prevIsbuttonActive => prevIsbuttonActive === buttonName ? null : buttonName)
    }   

return (
    <div className='relative w-full border border-slate-400 rounded-md'>
        <div className='flex items-center justify-start w-full'>
            <button 
                className={ 
                    isButtonActive === 'post'
                    ?  'flex gap-1 flex-auto bg-emerald-400 text-slate-600 border-r border-slate-400  rounded-none rounded-l-sm p-3'
                    :  'flex gap-1 flex-auto bg-white text-slate-600 border-r border-slate-400  rounded-none rounded-l-sm p-3 '
                }
                onClick={() => handleButtonClick('post')}

            >
                <BookText className='w-5 h-5'/>
                Post
            </button>
            <button 
                className={ 
                    isButtonActive === 'image'
                    ?  'flex gap-1 flex-auto bg-emerald-400 text-slate-600 border-r border-slate-400 p-3'
                    :  'flex gap-1 flex-auto bg-white text-slate-600 border-r border-slate-400 p-3'
                }
                onClick={() => handleButtonClick('image')}
                
            >
                <Image className='w-5 h-5'/> 
                Image 
            </button>
            <button 
                className={ 
                    isButtonActive === 'link'
                    ?  'flex gap-1 flex-auto bg-emerald-400 text-slate-600 border-slate-400  rounded-none rounded-r-sm p-3'
                    :  'flex gap-1 flex-auto bg-white text-slate-600 border-slate-400  rounded-none rounded-r-sm p-3'
                }
                onClick={() => handleButtonClick('link')}
                
            >
                <Link className='w-5 h-5'/>
                Link
            </button>
        </div>
    </div>
  )
}
