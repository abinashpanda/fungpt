import { z } from 'zod'
import { mongoId } from '~/utils/custom-validation'

export const getUserDto = z.object({
  id: mongoId(),
})
