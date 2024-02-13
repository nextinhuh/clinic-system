import { z } from 'zod'
import {
  signUpUserFormSchema,
  getUserSchema,
  signInUserFormSchema,
  updateUserFormSchema,
  userSchema,
} from './schemas'

export type UserData = z.infer<typeof userSchema>
export type SignUpUserFormData = z.infer<typeof signUpUserFormSchema>
export type SignInUserFormData = z.infer<typeof signInUserFormSchema>
export type UpdateInUserFormData = z.infer<typeof updateUserFormSchema>
export type GetUserData = z.infer<typeof getUserSchema>
