import { db } from '@/lib/db'
import { loginSchema } from '@/lib/validations/auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-authjs.session-token' 
        : 'authjs.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const validation = loginSchema.safeParse(credentials)

          if (!validation.success) {
            console.log('Validation failed:', validation.error)
            return null
          }

          const { email, password } = validation.data

          const user = await db.user.findUnique({
            where: { email },
          })

          if (!user) {
            console.log('User not found:', email)
            return null
          }

          if (!user.password) {
            console.log('User has no password (OAuth user):', email)
            return null
          }

          const isPasswordValid = await compare(password, user.password)

          if (!isPasswordValid) {
            console.log('Invalid password for:', email)
            return null
          }

          console.log('Login successful for:', email)
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
      }

      if (trigger === 'update' && session) {
        token.name = session.name
        token.email = session.email
        token.picture = session.image
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Si l'URL est relative, ajouter le baseUrl
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // Si l'URL est du même domaine, l'utiliser
      if (url.startsWith(baseUrl)) {
        return url
      }
      // Sinon, retourner au baseUrl
      return baseUrl
    },
  },
  debug: process.env.NODE_ENV === 'development',
  trustHost: true,
})