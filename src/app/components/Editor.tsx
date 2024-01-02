'use client'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { TPostSchema } from '@/lib/validators/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/lib/validators/post';
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/Form';
import { Input } from '@/ui/Input';
import PostEditor from '@/components/postEditor/PostEditor';
import EditorToggle from './EditorToggle';
import DragDrop from '@/components/postEditor/DragDrop';
import { Button } from './ui/Button';

interface EditorProps  {
  communityId: string;
}

const Editor = ({ communityId }: EditorProps) => {
  const [isButtonActive, setIsButtonActive] = useState<string | null>('post')
  
  const form = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: {
      communityId,
      title: '', 
      content: '',
    }  
  })

  function showEditor(name: any, onChange: () => void) {
    if(isButtonActive === 'post') {
      return <PostEditor content={ name } onChange={ onChange }/> 
    } else if(isButtonActive === 'image') {
      return <DragDrop/>
    }
  }

  function onSubmit(values: TPostSchema) {
    console.log('Submitted')
  }
  
  return (
    <div className='w-full'>
      <EditorToggle 
        isButtonActive={isButtonActive}
        setIsButtonActive={setIsButtonActive}
      />
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className='my-4'>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Title for your post" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className='my-4'>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  { showEditor(field.name, field.onChange) }
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          
          <Button className='w-full mt-2'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Editor