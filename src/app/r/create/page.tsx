"use client";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TCommunitySchema } from "@/app/lib/validators/community";
import { useForm } from "react-hook-form"
import { communitySchema } from "@/app/lib/validators/community";
import { zodResolver } from "@hookform/resolvers/zod"
import { useCustomToast } from "@/app/hooks/use-custom-toast";



const Page =  () => {
    const router = useRouter()
    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        } = useForm<TCommunitySchema>(
            {resolver: zodResolver(communitySchema)}
        )
    const { loginToast } = useCustomToast()

    const createCommunityMutation = useMutation({
        mutationFn: async (input: string) => {
            const payload: TCommunitySchema = {
                title: input
            }
            const { data } = await axios.post('/api/community', payload)
            router.push('/')
            return data as string
        },
        onError: (error) => {
            if(error instanceof AxiosError){
                if(error.response?.status === 401) {
                    return loginToast()
                }
            }
        }
    })

    const onSubmit = (data: TCommunitySchema) => {
        createCommunityMutation.mutate(data.title)
    }
    

  return (
    <div className='mt-20 bg-white dark:bg-dark max-w-[800px] mx-auto h-fit rounded-lg space-y-6'>
        <div className='overflow-hidden h-fit rounded-lg order-first md:order-last border border-emerald-400'>
            <div className="bg-emerald-400 px-6 py-8">
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-semibold'>Create a Community</h1>
                </div>
            </div>

            <div className="px-6 py-8">
                <p className='text-lg font-medium'>Subject</p>
                <p className='text-xs pb-2 text-slate-400'>
                    Community names including capitalization cannot be changed.
                </p>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className='relative'>
                            <p className='absolute text-sm w-8 inset-y-0 grid place-items-center text-slate-400'>
                                r/
                            </p>
                            <input
                                className={cn(buttonVariants({ variant: 'outline' }), 'hover:outline outline-1 outline-input text-center')}
                                {...register("title")}
                                type="text"
                                
                            />
                        </div>
                        {errors.title && (
                            <p className='text-red pt-1'>{`${errors.title.message}`}</p>
                        )}

                        <div className='flex sm:justify-end gap-4 pb-4 pr-4 mt-2 md:mt-0'>
                            <Button 
                                variant="outline"
                                onClick={() => router.back()}
                            >Cancel
                            </Button>
                            <Button
                                variant="outline"
                            >{createCommunityMutation.isPending ? 'Creating...' : 'Create Community'}
                            </Button >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Page