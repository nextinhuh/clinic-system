import { z } from 'zod'

// USER

export const userSchema = z
  .object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    photoURL: z.string().nullable(),
  })
  .nullable()

export const signUpUserFormSchema = z
  .object({
    email: z
      .string({ required_error: 'E-mail é obrigatório' })
      .email('E-mail inválido'),
    password: z
      .string({ required_error: 'Senha é obrigatório' })
      .min(6, 'A senha deve conter no mínimo 6 dígitos'),
    confirmPassword: z.string({
      required_error: 'Confirmação de senha é obrigatório',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não conhecidem',
    path: ['confirmPassword'],
  })

export const signInUserFormSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('E-mail inválido'),
  password: z.string({ required_error: 'Senha é obrigatório' }),
})

export const updateUserFormSchema = z.object({
  email: z.string(),
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo nome não pode ser vazio',
    })
    .refine((data) => data.length >= 3, {
      message: 'O campo nome deve conter mais de 3 caracteres',
    }),
  photoURL: z
    .string()
    .url({ message: 'Porfavor coloque uma URL válida' })
    .optional()
    .or(z.literal('')),
})

export const getFirebaseUserSchema = z.object({
  user: z
    .object({
      uid: z.string().nullable(),
      email: z.string().nullable(),
      displayName: z.string().nullable(),
      photoURL: z.string().nullable(),
    })
    .nullable(),
})

// PACIENT

export const patientSchema = z.object({
  pacient: z
    .object({
      id: z.string().nullable(),
      age: z.string().nullable(),
      name: z.string().nullable(),
      email: z.string().nullable(),
      anamnesisId: z.string().nullable(),
    })
    .nullable(),
})

export const createpatientSchema = z.object({
  pacient: z
    .object({
      age: z.string().nullable(),
      name: z.string().nullable(),
      email: z.string().nullable(),
    })
    .nullable(),
})
