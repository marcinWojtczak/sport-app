import { authOptions } from '@/app/lib/auth'
import { db } from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { formatDistanceToNow } from 'date-fns'
import { notFound } from 'next/navigation'
import SubscribeLeaveToogle from '@/app/components/SubscribeLeaveToogle'
import Link from 'next/link'
import { buttonVariants } from '@/app/components/ui/Button'

interface LayoutProps {
    children: React.ReactNode
    params: { slug: string}
}

const Layout = async ( {children, params: { slug }}: LayoutProps ) => {

    const session = await getServerSession(authOptions)

    const community = await db.community.findFirst({
        where : { 
            title: slug 
        },
        include: {
            posts: {
                include: {
                    author: true
                }
            }
        }
    })

    if(!community) return notFound()

    const subscription = !session?.user
        ? undefined
        : await db.subscription.findFirst({
            where: {
                community: {
                    title: slug,
                },
                user: {
                    id: session.user.id
                }
            }
        })
    
        const isSubscribed = !!subscription

    if (!community) return notFound()
    
    const communityMembers = db.subscription.count({
        where: {
            community: {
                title: slug
            }
        }
    })

    return (
        <div className="sm:container max-w-7xl mx-auto h-full pt-12">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
                <div className='flex flex-col col-span-2 space-y-6'>{children}</div>
                <div className='hidden md:block overflow-hidden h-fit rounded-lg border border-slate-400 order-first md:order-last'>
                    <div className='px-6 py-'>
                        <p className='font-smibold py-3'>About r/{community.title}</p>
                    </div>

                    <dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
                        <div className='flex justify-between gap-x-4 py-3'>
                            <dt className='text-slate-400'>Created at</dt>
                            <dd className='text-slate-600'>
                                <time dateTime={community?.createdAt.toDateString()}>
                                    {formatDistanceToNow(new Date(community?.createdAt), { addSuffix: true })}
                                </time>
                            </dd>
                        </div>

                        <div className='flex justify-between gap4 py-3'>
                            <dt className='text-slate-400'>Community members</dt>
                            <dd className='flex items-start gap-x-2'>
                                <div className='text-slate-600'>{communityMembers}</div>
                            </dd>

                        </div>

                        {community.creatorId === session?.user.id ? (
                            <div className='flex justify-between gap4 py-3'>
                                <dt className='text-slate-600'>You created this community</dt>
                            </div>
                        ) : null }


                        {community.creatorId !== session?.user.id ? (
                            <SubscribeLeaveToogle communityId={community.id} communityName={community.title} isSubscribed={isSubscribed}/>
                        ) : null }

                        <Link 
                            href={`/r/${slug}/submit`}
                            className={buttonVariants({
                                variant: 'outline',
                                className: 'w-full mb-6 bg-emerald-300 text-white'
                            })}
                        >Crete Post</Link>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Layout