"use client"
import { usePathname, useRouter } from "next/navigation"
import { Session } from "next-auth"
import { UserAvatar } from "./UserAvatar"
import { Input } from "@/components/ui/Input"
import { Button } from "./ui/Button"
import { ImageIcon, Link2 } from "lucide-react"


interface CreateCommunityPropos {
    session: Session | null
}

export default function CreatePost({ session }: CreateCommunityPropos) {
    const router = useRouter()
    const pathName = usePathname()

  return (
    <li className='overflow-hidden rounded-md bg-white dark:bg-slate-950 dark:border dark:border-slate-400 shadow-md'>
        <div className="h-full py-4 px-6 flex justify-between gap-4">
            <UserAvatar 
                user={{
                    name: session?.user.name || null,
                    image: session?.user.image || null
                }}
            />
            <Input 
                readOnly 
                onClick={() => router.push(pathName + '/submit')} 
                placeholder="Create Post"
            />

            <Button 
                variant="ghost"
                onClick={() => router.push(pathName + '/submit')}
            >
                <ImageIcon className='text-slate-400'/>
            </Button>
            <Button 
                variant="ghost"
                onClick={() => router.push(pathName + '/submit')}
            >
                <Link2 className='text-slate-400' />
            </Button >
        </div>
    </li>
  )
}
