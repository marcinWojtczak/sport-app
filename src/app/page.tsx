
import { getServerSession } from "next-auth"
import { User } from "next-auth"
import { authOptions } from "./lib/auth"


export default async function Home() {
  const session = await getServerSession(authOptions)

  console.log("-----------Server Session----------: ", session)
  return (
    <main className='container mt-20 '>
      <h1>Home</h1>
      <p>{JSON.stringify(session)}</p>
    </main>
  )
}
