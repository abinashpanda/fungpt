import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { createUser } from './auth.service'
import { createUserSchema } from './auth.dto'

export const authRouter = createTRPCRouter({
  createUser: publicProcedure.input(createUserSchema).mutation(({ input, ctx }) => createUser(ctx.prisma, input)),
})
