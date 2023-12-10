import { Button } from "./ui/Button"
import { useMutation } from "@tanstack/react-query"
import { TCommunitySubscriptionSchema } from "../lib/validators/community"

interface SubscribeLeaveToggleProps {
    subredditId: string
} 

const SubscribeLeaveToogle = ( {subredditId}: SubscribeLeaveToggleProps ) => {

    const isSubscribe = false 

    const {} = useMutation({
        mutationFn: async () => {
            const payload: TCommunitySubscriptionSchema = {

            }
        }
    })

  return isSubscribe ? (
    <Button className='w-full mt-1 mb-4'>Leave Community</Button>
  ) : (
    <Button className='w-full mt-1 mb-4'>Join to post</Button>
  )
}

export default SubscribeLeaveToogle