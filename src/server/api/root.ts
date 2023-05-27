import { createTRPCRouter } from '~/server/api/trpc'
import { authRouter } from './auth/auth.router'
import { chatRouter } from './chat/chat.router'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  chat: chatRouter,
})

export type AppRouter = typeof appRouter
