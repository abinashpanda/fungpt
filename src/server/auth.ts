import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type NextAuthOptions, type DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Prisma } from '@prisma/client'
import { verify } from 'argon2'
import { prisma } from '~/server/db'
import { loginSchema } from './api/auth/auth.dto'
import { USER_SELECT_FIELDS } from './api/user/user.field'
import { env } from '~/env.mjs'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    // TODO: Add include fields
    user: Prisma.UserGetPayload<{ select: typeof USER_SELECT_FIELDS }> & DefaultSession['user']
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  callbacks: {
    session: async ({ session, token }) => {
      const user = await prisma.user.findFirst({ where: { id: token.sub }, select: USER_SELECT_FIELDS })
      return {
        ...session,
        user: {
          ...user,
          image: null,
        },
      }
    },
    jwt: async ({ token }) => {
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validCredentials = await loginSchema.parseAsync(credentials)

        const user = await prisma.user.findFirst({
          where: {
            email: validCredentials.username,
          },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await verify(user.password, validCredentials.password)
        if (!isPasswordValid) {
          return null
        }

        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: null,
          role: 'foo',
        }
        return userData
      },
    }),
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
