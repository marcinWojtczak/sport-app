import { authOptions } from '@/app/lib/auth'
import { db } from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { formatDistanceToNow } from 'date-fns'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '@/app/components/ui/Button'


interface LayoutProps {
    children: React.ReactNode
    params: { slug: string}
}

const Layout = async ( {children, params: { slug }}: LayoutProps ) => {
    
    const decodedSlug = decodeURIComponent(slug)
    
    const session = await getServerSession(authOptions)

    const event = await db.event.findFirst({
        where : { 
            name: decodedSlug
        },
        include: {
            posts: {
                include: {
                    author: true
                }
            }
        }
    })

    if(!event) return notFound()


    return (
        <div className="sm:container max-w-7xl mx-auto h-full pt-12">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
                <div className='flex flex-col col-span-2 space-y-6'>{children}</div>
                <div className='hidden md:block overflow-hidden h-fit rounded-lg border border-slate-400 order-first md:order-last bg-white dark:bg-dark'>
                    <div className='px-6 py-'>
                        <p className='font-smibold py-3'>About s/{event.name}</p>
                    </div>

                    <div className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
                        <div className='flex justify-between gap-x-4 py-3'>
                            <dt className='text-slate-400'>Created at</dt>
                            <dd className='text-slate-400'>
                                <time dateTime={event?.createdAt.toDateString()}>
                                    {formatDistanceToNow(new Date(event?.createdAt), { addSuffix: true })}
                                </time>
                            </dd>
                        </div>

                        {event.creatorId === session?.user.id ? (
                            <div className='flex justify-between gap4 py-3'>
                                <dt className='text-slate-400'>You created this community</dt>
                            </div>
                        ) : null }

                        <Link 
                            href={`/s/${slug}/submit`}
                            className={buttonVariants({
                                variant: 'default',
                                className: 'w-full mb-6 bg-emerald-400 text-white border-none hover:outline outline-1 outline-slate-800'
                            })}
                        >Create Post</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout