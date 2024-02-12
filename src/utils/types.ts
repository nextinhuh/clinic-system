import { z } from 'zod'
import {
  signUpUserFormSchema,
  getUserSchema,
  signInUserFormSchema,
} from './schemas'

export type SignUpUserFormData = z.infer<typeof signUpUserFormSchema>
export type SignInUserFormData = z.infer<typeof signInUserFormSchema>
export type GetUserData = z.infer<typeof getUserSchema>
