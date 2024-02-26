import { Avatar,  AvatarImage, } from "@/components/ui/Avatar"
import userImage from '@/public/user.png'
import { User } from 'next-auth';
import { User2 } from "lucide-react"

interface UserAvatarProps  {
  user: Pick<User, 'name' | 'image'>
  className?: string
}

export const UserAvatar = ({user, ...props}: UserAvatarProps) => {
   
  return (
    <Avatar {...props} >
        {user.image ? (
            <AvatarImage src={user.image} />
        ) : (
            <User2  className='dark:text-white h-7 w-7'/>
        )
        }
    </Avatar>
  )
}
