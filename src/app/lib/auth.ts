import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { compare } from "bcrypt"


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
          password: { label: "Password", type: "passrod", placeholder: "Password" },
        },
        async authorize(credentials) {
          //chack to see if email and pasword exists in db
          if(!credentials?.email || !credentials.password ) {
            return null
          }

          //chack to see if user exists
          const existingUser = await db.user.findUnique({
            where: { email: credentials?.email }
          });

          if(!existingUser || existingUser.password === null) {
            return null
          }

          //check if password match
          
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
      async redirect({ baseUrl }) {
        return baseUrl
      },

      async jwt({ token, user }) {
        console.log("----------Token--------------: ", token)
        
        return token
      },

      async session({ session, token }) {
        console.log("----------Session--------------: ", session)
        return session
      },
    }
  }
  
  export default NextAuth(authOptions)