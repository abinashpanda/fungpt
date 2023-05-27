import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { USER_SELECT_FIELDS } from './user.field'
import { getUserDto } from './user.dto'

export function getUser(prisma: PrismaClient, dto: z.infer<typeof getUserDto>) {
  return prisma.user.findFirst({
    where: {
      id: dto.id,
    },
    select: USER_SELECT_FIELDS,
  })
}
