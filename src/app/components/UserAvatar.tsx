import { Avatar,  AvatarImage, } from "@/components/ui/Avatar"
import userImage from '@/public/user.png'
import { User } from 'next-auth';

interface UserAvatarProps  {
  user: Pick<User, 'name' | 'image'>
  className?: string
}

export const UserAvatar = ({user, ...props}: UserAvatarProps) => {
   
  return (
    <Avatar {...props}>
        {user.image ? (
            <AvatarImage src={user.image} />
        ) : (
            <AvatarImage src={userImage.src} className="w-6 h-6"/>
        )
        }
    </Avatar>
  )
}
