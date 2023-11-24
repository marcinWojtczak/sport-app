
import { getServerSession } from "next-auth"
import { User } from "next-auth"
import { authOptions } from "./lib/auth"
import Sidebar from "./components/Sidebar"



export default async function Home() {
  const session = await getServerSession(authOptions)

  
  return (
    <main className='absolute top-20 p-0 h-full container max-w-[1400px]'>
      <div className='flex flex-row w-full h-full'>
        <Sidebar/>
        <div className="p-8 w-full">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates numquam repellat dicta laboriosam accusamus aliquam omnis doloremque amet necessitatibus. Sint maxime aspernatur vel autem eius commodi porro hic fugiat.</p>
        </div>
      </div>
      
    </main>
  )
}
