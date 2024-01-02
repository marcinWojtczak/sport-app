"use client"
import { type Editor } from "@tiptap/react"
import  { Bold, Heading2, List, Image, Link, Smile } from "lucide-react"
import { Toggle } from "@/components/ui/Toggle"

type ToolbarProps = {
    editor: Editor | null
}

export default function ToolBar({ editor }: ToolbarProps) {

    if(!editor) {
        return null
    }

  return (
    <div className='p-1 flex gap-1 bg-slate-100'>
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
        <Toggle 
            size='sm'
            // onClick={addImage}
        >
        <Image className="h-5 w-5" />
        </Toggle>
        <Toggle 
            size='sm'
            pressed={editor.isActive("link")}
            // onPressedChange={() => editor.chain().focus()..run()}
        >
        <Link className="h-5 w-5" />
        </Toggle>
    </div>
  )
}
