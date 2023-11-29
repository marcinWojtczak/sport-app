
import { getServerSession } from "next-auth"
import { User } from "next-auth"
import { authOptions } from "@/lib/auth"
import Sidebar from "@/components/Sidebar"
import { HomeIcon } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"


export default async function Home() {
  const session = await getServerSession(authOptions)

  
  return (
    <main className='absolute top-20 p-0 h-full container max-w-[1400px]'>
      <div className='flex flex-row w-full h-full'>
        <Sidebar/>
        <div className='container w-full mx-auto h-full pt-12'>
          <h1 className='font-semibold text-xl md:text:3xl'>Your Page </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
            <div className='overflow-hidden h-fit rounded-lg order-first md:order-last border border-emerald-400'>
              <div className="bg-emerald-400 px-6 py-4">
                <p className="font-semibold py-3 flex items-center gap-1.5">
                  <HomeIcon className='w-4 h-4' />
                  Home
                </p>
              </div>

              <div className='-mx-3 px-6 py-4 text-sm text-slate-400'>
                <div className='flex justify-between gap-x-4 py-3'>
                  <p className='slate-400'>
                    Your personal homepage. Create you're own event.
                  </p>
                </div>

                <Link href="/r/create" className={cn(buttonVariants({ className: "w-full mt-4 mb-8 t" }))}>Create Event</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  )
}
