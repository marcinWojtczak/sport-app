
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions: NextAuthOptions = {
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_ID!,
        clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    CredentialsProvider({
        name: "Credeniatls",
        credentials: {
            username: {
                label: "Username",
                type: "text",
                placeholder: "user name"
            },
            password: {
                label: "Password",
                type: "password",
                placeholder: "password"
            }
        },

        async authorize(credentials) {
            const user = { id: "39", name: "Marcin", password:"1234"}

            if (credentials?.username === user.name && credentials.password === user.password) {
                return user
            }
              
            return null
        }
    }),
  ],
  
}

export default NextAuth(authOptions)