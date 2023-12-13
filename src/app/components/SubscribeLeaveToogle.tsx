"use client"
import { Button } from "@/ui/Button"
import { useMutation } from "@tanstack/react-query"
import { TCommunitySubscriptionSchema } from "@/lib/validators/community"
import axios, { AxiosError } from "axios"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { useToast } from "@/hooks/use-toast"
import { startTransition } from "react"
import { useRouter } from "next/navigation"


interface SubscribeLeaveToggleProps {
    communityId: string
    communityName: string
    isSubscribed: boolean
} 

const SubscribeLeaveToogle = ( {communityId, communityName, isSubscribed }: SubscribeLeaveToggleProps ) => {
 
    const { toast } = useToast()
    const { loginToast } = useCustomToast()
    const router = useRouter()

    const { mutate: subscribe, isPending: isSubPending } = useMutation({
        mutationFn: async () => {
            const payload: TCommunitySubscriptionSchema = {
              communityId
            }

            const { data } = await axios.post('/api/community/subscribe', payload)
            return data as string
        },
        onError: (error) => {
          if(error instanceof AxiosError) {
            if(error.request.status === 401) {
              return loginToast()
            }
          }

          return toast({
            title: "There was a problem",
            description: "Something went wrong, pleas try again.",
            variant: "destructive"
          })
        },
        onSuccess: () => {
          startTransition(() => {
            router.refresh()
          })

          return toast({
            title: 'Subscribed',
            description: `You are now subscribed to r/${communityName}`
          })
        }
    })

    const { mutate: unsubscribe, isPending: isUnsubPending } = useMutation({
      mutationFn: async () => {
          const payload: TCommunitySubscriptionSchema = {
            communityId
          }

          const { data } = await axios.post('/api/community/unsubscribe', payload)
          return data as string
      },
      onError: (error) => {
        if(error instanceof AxiosError) {
          if(error.request.status === 401) {
            return loginToast()
          }
        }

        return toast({
          title: "There was a problem",
          description: "Something went wrong, pleas try again.",
          variant: "destructive"
        })
      },
      onSuccess: () => {
        startTransition(() => {
          router.refresh()
        })

        return toast({
          title: 'Unubscribed',
          description: `You are now unsubscribed from r/${communityName}`
        })
      }
  })

  return isSubscribed ? (
    <Button className='w-full mt-1 mb-4'
      onClick={() => unsubscribe()}
      isLoading={isUnsubPending}
    >Leave Community</Button>
  ) : (
    <Button 
      onClick={() => subscribe()} 
      isLoading={isSubPending}
      className='w-full mt-1 mb-4'
    >Join to Comunity</Button>
  )
}

export default SubscribeLeaveToogle