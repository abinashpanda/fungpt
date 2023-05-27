import { Prisma } from '@prisma/client'

export const USER_SELECT_FIELDS: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  password: false,
}
