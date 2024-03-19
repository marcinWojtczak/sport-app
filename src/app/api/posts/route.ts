import { db } from '@/app/lib/db';

export async function GET(request: Request) {
    const url = new URL(request.url)

    try {
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc',
          },
    })
    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
