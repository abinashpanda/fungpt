import { z } from 'zod'
import { hash } from 'argon2'
import { PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { createUserSchema } from './auth.dto'

export async function createUser(prisma: PrismaClient, createUserDto: z.infer<typeof createUserSchema>) {
  const user = await prisma.user.findFirst({ where: { email: createUserDto.email } })
  if (user) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'User already exists',
    })
  }

  const hashedPassword = await hash(createUserDto.password)

  return prisma.user.create({
    data: {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    },
    select: {
      name: true,
      email: true,
      emailVerified: true,
      password: false,
    },
  })
}
