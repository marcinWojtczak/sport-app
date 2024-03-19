'use server'
import { authOptions } from "@/app/lib/auth"
import { getServerSession } from "next-auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"
import { db } from '@/app/lib/db';
import { TPostSchema } from '@/lib/validators/post';


const generateFileKey = (bytes: number) => {
    const randomBytes = crypto.randomBytes(bytes)
    const fileKey = randomBytes.toString("hex")
    return fileKey
}

const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
})


export async function getSignedURL(type: string, size: number) {  
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return {failure: "Not authenticated"}
        }

        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: generateFileKey(32),
            ContentType: type,
            ContentLength: size,
            Metadata: {
                userId: session.user.id,
            }
        })

        const signedURL = await getSignedUrl(s3Client, putObjectCommand)

        const media = await db.media.create({
            data: {
                url: signedURL.split("?")[0],
                size,
                type,
                userId: session.user.id
            }
        })

        return { success: { url: signedURL, mediaId: media.id, }, message: "File has been upload"}
    }catch (error: unknown) {
        console.error("Failed to upload file:", error)

        return { status: "error" , message: "Fielad to upload file"}
    }
}

export async function createNewPost(postData: TPostSchema, mediaId: string | undefined){

    try{
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return {failure: "Not authenticated"}
        }

        if (typeof mediaId ) {
            
            const post = await db.post.create({
                data: {
                title: postData.title,
                content: postData.content,
                eventId: postData.eventId,
                authorId: session.user.id,
                mediaId
                }
            })
        } else {
            const post = await db.post.create({
                data: {
                title: postData.title,
                content: postData.content,
                eventId: postData.eventId,
                authorId: session.user.id,
                }
            })
        }
        
        const user = await db.user.findFirst({
            where: {
                id: session.user.id
            }
        })

        return { message: "Post has been creted"}
    } catch (error: unknown) {
        console.error("Failed to create file:", error)

        return { status: "error" , message: "Failed to create file"}
    }
}