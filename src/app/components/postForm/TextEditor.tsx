"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolBar from '@/components/ToolBar'
import Placeholder from '@tiptap/extension-placeholder'
import { TFileSchema } from '@/app/lib/validators/file'
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Toggle } from '../ui/Toggle'


interface TextEditorProps {
    onChange: (richText: string) => void
    handleChange:  (e: React.ChangeEvent<HTMLInputElement>) => void
    fileUrl: string | undefined,
    fileInput: TFileSchema | undefined,
    validationError: string[] | undefined
    setFileInput: (fileInput: TFileSchema | undefined) => void,
    setFileUrl: (fileUrl: string | undefined) => void
}

export default function TextEditor ({ onChange, handleChange, fileUrl, fileInput, validationError, setFileUrl, setFileInput }: TextEditorProps ) {
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Placeholder.configure({
                placeholder: 'Write Something...',
                emptyNodeClass:
                'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none flex h-full',
            }),
        ],
        editorProps: {
            attributes: {
                class: "px-4 py-5 bg-white min-h-[300px] outline-none dark:bg-dark-light"

            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
      })
    
      return (
        <div className='flex flex-col border rounded-md bg-white dark:bg-dark-light focus:outline-none custom-outline'>
            <ToolBar editor={editor} handleChange={handleChange}/>
            {fileUrl && fileInput && (
            <div className='relative'>
              {validationError && (
                 <p className='text-red font-semibold pl-4 pt-2'>{`${validationError}`}</p>
              )}
              <Image 
                src={fileUrl}
                alt={fileInput?.name || ""}
                width={400}
                height={400}
                className='p-4'
              />
              <Toggle className='absolute z-10 left-[390px] bottom-[17px] bg-slate-100 hover:text-red '>
                <Trash2
                  onClick={() => {
                    setFileInput(undefined)
                    setFileUrl(undefined)
                  }}
                />
              </Toggle>
            </div>
          )}
            <EditorContent editor={editor} />
        </div>
      )
}




