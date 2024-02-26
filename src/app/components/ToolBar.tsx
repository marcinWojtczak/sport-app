"use client"
import { useState } from "react"
import { type Editor } from "@tiptap/react"
import  { Bold, Heading2, List, Image as ImageIcon, Link } from "lucide-react"
import { Toggle } from "@/components/ui/Toggle"
import { Paperclip } from 'lucide-react';

type ToolbarProps = {
    editor: Editor | null
    handleChange:  (e: React.ChangeEvent<HTMLInputElement>) => void

}

export default function ToolBar({ editor,  handleChange }: ToolbarProps) {
    
    if(!editor) {
        return null
    }


  return (
    <div className='p-1 flex gap-1 bg-slate-100 dark:bg-dark cursor-default'>
        <Toggle 
            size='sm'
            pressed={editor.isActive("heading")}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
        <Heading2 className='h-5 w-5' />
        </Toggle>
        <Toggle 
            size='sm'
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
        <Bold className="h-5 w-5" />
        </Toggle>
        <Toggle 
            size='sm'
            pressed={editor.isActive("bulletList")}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        >
        <List className="h-5 w-5" />
        </Toggle>
        <Toggle>
                <label className='flex'>
                    <Paperclip className='w-5 h-5'/>
                <input 
                    className='hidden'
                    type='file'
                    accept="image/jpeg, image/jpg, image/png, image/webp, image/gif, video/mp4, video/webm"
                    id='file-input'
                    onChange={handleChange}
                />
                </label>
        </Toggle>

    </div>
  )
}
