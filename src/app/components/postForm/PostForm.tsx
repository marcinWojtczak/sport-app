'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/Form';
import TextEditor from '@/app/components/postForm/TextEditor';
import { TPostSchema, postSchema } from '@/lib/validators/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Button } from '@/ui/Button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Input } from '@/components/ui/Input';
import { getSignedURL } from '@/app/components/postForm/actions';
import { TFileSchema, fileSchema } from '@/app/lib/validators/file';
import { createNewPost } from '@/app/components/postForm/actions';
import { useRouter } from "next/navigation"
import { Session } from 'next-auth';


interface PostFormProps  {
    eventId: string;
    user: Session | null
  }

export default function PostForm({ eventId, user }: PostFormProps) {
  const [invalidTitle, setInvalidTitle] = useState<string | null>()
  const [credentailError, setCredentailError] = useState<string | null>()
  const [fileInput, setFileInput] = useState<TFileSchema | undefined>(undefined)
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)
  const [validationError, setValidationError] = useState<string []>()
  
  const router = useRouter()
 

  const form = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: {
      eventId,
      title: '', 
      content: '',
     }  
  })

 
  const createFileMutation = useMutation({
    mutationFn: async (fileInput: TFileSchema | undefined) => {
      let mediaId: string | undefined
      if(fileInput) {
        const fileValidationResult = fileSchema.safeParse(fileInput)
    
        if(!fileValidationResult.success) {
          const errorMessages = fileValidationResult.error.errors.map(
            (error) => error.message
          );

          setValidationError(errorMessages)
          return { failure: errorMessages.join(", ") };
        }

        const { size, type } = fileInput

        const signedURLResult = await getSignedURL(type, size )
       
        if (signedURLResult.success) {
          
          const {url, mediaId} = signedURLResult.success

          await axios.put(url, fileInput, {
            headers: {
              'Content-Type': fileInput?.type
            }
          })

          const postData: TPostSchema = {
            title: form.getValues('title'),
            content: form.getValues('content'),
            eventId,
          }
        
          await createNewPost(postData, mediaId)
        }
      } else {
        const postData: TPostSchema = {
          title: form.getValues('title'),
          content: form.getValues('content'),
          eventId,
        }

        await createNewPost(postData, mediaId)
      }
    },
    onError: (error) => {
      console.error("Error: ", error)
    }
  })

  async function onSubmit(data: TPostSchema) {
     await createFileMutation.mutateAsync(fileInput);
      router.push(`/user/${user?.user.name}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    const file = e.target.files?.[0]
    setFileInput(file)
   
    if(fileUrl) {
      URL.revokeObjectURL(fileUrl)
    }

    if (file) {
        const url = URL.createObjectURL(file)
        setFileUrl(url)
    } else {
      setFileUrl(undefined)
    }    
}

  return (
    <div className='w-full'>
      {invalidTitle && <p className='text-red font-semibold mt-1'>{invalidTitle}</p>}
      {credentailError && <p className='text-red font-semibold mt-1'>{credentailError}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem className='my-4'>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input {...field} placeholder="Title for your post" className='dark:bg-dark' />
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
                  <TextEditor  onChange={field.onChange} {...{handleChange, fileUrl, fileInput, validationError, setFileUrl, setFileInput}} />
              </FormControl>
              <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full mt-2 bg-emerald-400'>{createFileMutation.isPending ? 'Submitting...' : 'Submit'}</Button>
        </form>
        </Form>
    </div>
  )
}
