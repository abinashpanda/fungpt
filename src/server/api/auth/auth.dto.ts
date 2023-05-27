import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
})

export const createUserSchema = z.object({
  name: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(8),
})
