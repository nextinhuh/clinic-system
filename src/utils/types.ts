import { z } from 'zod'
import { createUserFormSchema, getUserSchema } from './schemas'

export type CreateUserFormData = z.infer<typeof createUserFormSchema>
export type GetUserData = z.infer<typeof getUserSchema>
