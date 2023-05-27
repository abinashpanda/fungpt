import { z } from 'zod'

export const chatInputSchema = z.object({
  prevMessages: z.array(
    z.object({
      senderName: z.string(),
      message: z.string(),
    }),
  ),
  systemMessage: z.string(),
  senderName: z.string(),
  groupName: z.string(),
})
