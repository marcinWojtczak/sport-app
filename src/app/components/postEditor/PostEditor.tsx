"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolBar from '@/components/ToolBar'
import Placeholder from '@tiptap/extension-placeholder'


export default function PostEditor ({ 
    content, 
    onChange,
}: {
    content: string
    onChange: (richText: string) => void
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Placeholder.configure({
                placeholder: 'Write Something...',
                emptyNodeClass:
                'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none flex justify-center items-center h-full',
                
            }),
        ],
        editorProps: {
            attributes: {
                class: "px-4 py-5 bg-white h-[452px] outline-none "

            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
      })
    
      return (
        <div className='h-[500px] flex flex-col border rounded-md bg-white hover:outline outline-2 outline-offset-2 '>
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
      )
}




