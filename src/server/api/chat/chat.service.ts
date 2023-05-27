import { z } from 'zod'
import { type ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { chatInputSchema } from './chat.schema'
import { env } from '~/env.mjs'

const openaiClient = new OpenAIApi(
  new Configuration({
    apiKey: env.OPENAI_API_KEY,
  }),
)

export async function getChatMessage(chatInputDto: z.infer<typeof chatInputSchema>) {
  const { data } = await openaiClient.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `${chatInputDto.systemMessage}\n\nYou have joined a whatsapp group of name ${chatInputDto.groupName}. Please write a message in hinglish and do not add the name of the user you are replying to.`,
      },
      ...chatInputDto.prevMessages.map((message) => ({
        role: 'user' as ChatCompletionRequestMessageRoleEnum,
        content: message.senderName ? `${message.senderName}: ${message.message}` : message.message,
      })),
    ],
  })
  return data.choices[0]?.message?.content ?? ''
}
