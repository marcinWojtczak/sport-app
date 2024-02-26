'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/Form';
import TextEditor from '@/app/components/postForm/TextEditor';
import { TPostSchema, postSchema } from '@/lib/validators/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Button } from '@/ui/Button';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Input } from '@/components/ui/Input';
import { getSignedURL } from '@/app/components/postForm/actions';
import { TFileSchema, fileSchema } from '@/app/lib/validators/file';



interface PostFormProps  {
    communityId: string;
}

export default function PostForm({ communityId }: PostFormProps) {
  const [invalidTitle, setInvalidTitle] = useState<string | null>()
  const [credentailError, setCredentailError] = useState<string | null>()
  const [fileError, setFileError] = useState<string | null>()
  const [fileInput, setFileInput] = useState<TFileSchema | undefined>(undefined)
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)
  const [validationError, setValidationError] = useState<string []>()

  
  const form = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: {
      communityId,
      title: '', 
      content: '',
     }  
  })

  const {
    formState: { errors },
  } = useForm<TFileSchema>({resolver: zodResolver(fileSchema),
    mode: 'onChange',
    defaultValues: {
      size: 0,
      type: '',
      name: ''
    }
  })
  
  

  const createPostMutation = useMutation({
    mutationFn: async (form: TPostSchema) => {
      const payload: TPostSchema = {
        title: form.title,
        content: form.content,
        communityId: form.communityId 
      }

      const data = await axios.post('/api/community/posts/create' , payload)
      return data

    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        if(error.response?.status === 422) {
          setInvalidTitle("Invalid post name. Title must be 3 or more charcters long and can't be longer then 130 characters.")
        }
        if (error.response?.status === 401) {
            setCredentailError('You need to be logged in to create community.')
          }
        }
    }
  })

  
  const createFileMutation = useMutation({
    mutationFn: async (file: TFileSchema | undefined) => {
      console.log(file)
      if(!file) {
        return { failure: "File is undefined"}
      }

      const fileValidationResult = fileSchema.safeParse(file)
      console.log(fileValidationResult)
    
      if(!fileValidationResult.success) {
        const errorMessages = fileValidationResult.error.errors.map(
          (error) => error.message
        );
        setValidationError(errorMessages)
        return { failure: errorMessages.join(", ") };
      } 

      const { size, type } = file
      const signedURLResult = await getSignedURL(type, size)
      
      if (signedURLResult.success) {
        const url = signedURLResult.success.url
        const data = await axios.put(url, file, {
          headers: {
            'Content-Type': file?.type
          }
        })
        return data
      }
    },
    onError: (error) => {
      console.error("Error: ", error)
    }
  })

  async function onSubmit(data: TPostSchema) {
    await createPostMutation.mutateAsync(data);
    await createFileMutation.mutateAsync(fileInput);
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
      <Form {...form} >
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
