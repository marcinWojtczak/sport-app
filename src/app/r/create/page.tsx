"use client";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TPostSchema } from "@/app/lib/validators/post";
import { useForm } from "react-hook-form"
import { postSchema } from "@/app/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod"
import { useCustomToast } from "@/app/hooks/use-custom-toast";


const Page = () => {
    
    const router = useRouter()
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
        } = useForm<TPostSchema>(
            {resolver: zodResolver(postSchema)}
        )
    const { loginToast } = useCustomToast()


    const createPostMutation = useMutation({
        mutationFn: async (input: string) => {
            const payload: TPostSchema = {
                subject: input
            }
            const { data } = await axios.post('/api/post', payload)
            console.log(data)
            return data as string
        },
        onError: (err) => {
            if(err instanceof AxiosError){
                if(err.response?.status === 401) {
                    return loginToast()
                }
            }
        }
    })

    const onSubmit = (data: TPostSchema) => {
        createPostMutation.mutate(data.subject)
    }
    

  return (
    <div className='absolute top-20 container h-full max-w-3xl mx-auto'>
        <div className='mt-20 bg-white  dark:bg-dark w-full h-fit rounded-lg space-y-6'>
            <div className='overflow-hidden h-fit rounded-lg order-first md:order-last border border-emerald-400'>
                <div className="bg-emerald-400 px-6 py-8">
                    <div className='flex justify-between items-center'>
                        <h1 className='text-xl font-semibold'>Create an Event</h1>
                    </div>
                </div>

                <div className="px-6 py-8">
                    <p className='text-lg font-medium'>Subject</p>
                    <p className='text-xs pb-2 text-slate-400'>
                        Community names including capitalization cannot be changed.
                    </p>
                    <div >
                        <form onSubmit={handleSubmit(onSubmit)} className='relative'>
                            <p className='absolute text-sm left-0 top-[-60px] w-8 inset-y-0 grid place-items-center text-slate-400'>
                                r/
                            </p>
                            <input
                                className={cn(buttonVariants({ variant: 'outline' }), 'hover:outline outline-1 outline-input text-center')}
                                {...register("subject")}
                                type="text"
                                
                            />
                            {errors.subject && (
                                <p className='text-red pt-1'>{`${errors.subject.message}`}</p>
                            )}

                            <div className='flex sm:justify-end gap-4 pb-4 pr-4'>
                                <Button 
                                    variant="outline"
                                    onClick={() => router.back()}
                                >Cancel
                                </Button>
                                <Button
                                    variant="outline"
                                >Create Event
                                </Button >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page