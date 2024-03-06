import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/db"
import { compare } from "bcrypt";
import { nanoid } from 'nanoid'


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/sign-in'
    },
    session: {
      strategy: "jwt"
    },
    
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID!,
        clientSecret: process.env.FACEBOOK_SECRET!,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          username: { label: "Username", type: "text", placeholder: "User mama" },
          email: { label: "Email", type: "email", placeholder: "Email"  },
          password: { label: "Password", type: "password", placeholder: "Password" },
        },
        async authorize(credentials) {
          //chack to see if email and password exists in the db
          if(!credentials?.email || !credentials.password ) {
            return null
          }

          ///check to see if the provided email matches to email in the db
          const existingUser = await db.user.findUnique({
            where: { email: credentials?.email }
          });

          // If the user does not exist or the user's password is null, return null
          if(!existingUser || existingUser.password === null) {
            return null
          }

          //check to see if the provided password matches to password in the db
          const passwordMatch = await compare(credentials.password, existingUser.password);

          if(!passwordMatch) {
            return null
          }

          return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email
          }
        }
      })
    ],
    
    callbacks: {
      async session({ token, session }) {
        if (token) {
          session.user.id = token.id
          session.user.name = token.name
          session.user.email = token.email
          session.user.image = token.picture
          session.user.username = token.username
        }
  
        return session
        
      },
  
      async jwt({ token, user }) {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email,
          },
        })
  
        if (!dbUser) {
          token.id = user!.id
          return token
        }
  
        if (!dbUser.name) {
          await db.user.update({
            where: {
              id: dbUser.id,
            },
            data: {
              name: nanoid(10),
            },
          })
        }
  
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          username: dbUser.name,
        }
      },
      async redirect({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`
        return baseUrl
      }
    }
  }
  
  export default NextAuth(authOptions)