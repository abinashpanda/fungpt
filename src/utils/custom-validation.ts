import { z } from 'zod'

export const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
export const MONGO_ID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

export function mongoId(errorMessage: string = 'Invalid Mongo ID') {
  return z.custom<string>((value) => typeof value === 'string' && MONGO_ID_REGEX.test(value), errorMessage)
}

export function password(errorMessage: string = 'Password is too weak') {
  return z.custom<string>((value) => typeof value === 'string' && PASSWORD_REGEX.test(value), errorMessage)
}

type Literal = z.infer<typeof literalSchema>
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Json = Literal | { [key: string]: Json } | Json[]

/**
 * Validate
 * @see https://github.com/colinhacks/zod#json-type
 */
export function json(errorMessage: string = 'Invalid JSON') {
  const jsonSchema: z.ZodType<Json> = z.lazy(() =>
    z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)], { invalid_type_error: errorMessage }),
  )
  return jsonSchema
}
