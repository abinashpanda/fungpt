import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { chatInputSchema } from './chat.schema'
import { getChatMessage } from './chat.service'

export const chatRouter = createTRPCRouter({
  getChatMessage: publicProcedure.input(chatInputSchema).mutation(({ input }) => getChatMessage(input)),
})
