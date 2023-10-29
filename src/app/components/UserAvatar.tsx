import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/Avatar"
import userImage from '@/public/user.png'
import { User } from 'next-auth';

interface UserAvatarProps  {
  user: Pick<User, 'name' | 'image'>
}

export const UserAvatar = ({user}: UserAvatarProps) => {
   
  return (
    <Avatar>
        {user.image ? (
            <AvatarImage src={user.image}/>
        ) : (
            <AvatarImage src={userImage.src}/>
        )
        }
    </Avatar>
  )
}
