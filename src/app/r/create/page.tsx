"use client";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TSpostSchema } from "@/app/lib/validators/post";

const Page = () => {
const [input, setInput] = useState<string>("")
const router = useRouter()

const { mutate: CreatePost, isPending } = useMutation({
    mutationFn: async () => {
        const payload: TSpostSchema = {
            subject: input
        }
        const { data } = await axios.post('/api/post', payload)
        return data as string
    }
})

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
                    <div className='relative'>
                        <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-input dark:text-slate-400'>
                            r/
                        </p>
                        <input
                            className={cn(buttonVariants({ variant: 'outline' }), 'hover:outline outline-1 outline-input text-center')}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex justify-end gap-4 pb-4 pr-4'>
                    <Button 
                        variant="subtle"
                        onClick={() => router.back()}
                    >Cancel
                    </Button>
                    <Button
                        variant="subtle"
                        isLoading={isPending}
                        disabled={input.length === 0}
                        onClick={() => CreatePost()}
                    >Create Event
                    </Button >
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page