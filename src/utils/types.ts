import { z } from 'zod'
import {
  userSchema,
  signUpUserFormSchema,
  signInUserFormSchema,
  updateUserFormSchema,
  getFirebaseUserSchema,
  patientSchema,
  createpatientFormSchema,
} from './schemas'

export type UserData = z.infer<typeof userSchema>
export type SignUpUserFormData = z.infer<typeof signUpUserFormSchema>
export type SignInUserFormData = z.infer<typeof signInUserFormSchema>
export type UpdateUserFormData = z.infer<typeof updateUserFormSchema>
export type GetFirebaseUserData = z.infer<typeof getFirebaseUserSchema>
export type PatientData = z.infer<typeof patientSchema>
export type CreatePatientFormData = z.infer<typeof createpatientFormSchema>
