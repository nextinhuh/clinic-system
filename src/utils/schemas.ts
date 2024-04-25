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
  id: z.string().nullable(),
  age: z.number().nullable(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  anamnesisId: z.string().nullable(),
})

export const createPatientFormSchema = z.object({
  age: z.coerce
    .number({ required_error: 'Idade é obrigatório' })
    .max(100, 'Idade inválida')
    .gte(-1, { message: 'Idade é obrigatório' }),
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo nome não pode ser vazio',
    })
    .refine((data) => data.length >= 3, {
      message: 'O campo nome deve conter mais de 3 caracteres',
    }),
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
})

export const updatePatientFormSchema = z.object({
  age: z.coerce
    .number({ required_error: 'Idade é obrigatório' })
    .max(100, 'Idade inválida')
    .gte(-1, { message: 'Idade é obrigatório' }),
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo nome não pode ser vazio',
    })
    .refine((data) => data.length >= 3, {
      message: 'O campo nome deve conter mais de 3 caracteres',
    }),
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
})

export const patientAnamnesisSchema = z.object({
  id: z.string(),
  reason: z.string(),
  symptoms: z.string(),
  medicalHistory: z.string(),
  takingMedication: z.string(),
  allergy: z.string(),
  diseaseHistory: z.string(),
  consumeDrug: z.string(),
  dailyRoutine: z.string(),
  emotionalState: z.string(),
  patientId: z.string(),
})

export const updatePatientAnamnesisFormSchema = z.object({
  reason: z
    .string({ required_error: 'Razão é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo razão não pode ser vazio',
    }),
  symptoms: z
    .string({ required_error: 'Sintomas é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo sintomas não pode ser vazio',
    }),
  medicalHistory: z
    .string({ required_error: 'Histórico médico é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo histórico médico não pode ser vazio',
    }),
  takingMedication: z
    .string({ required_error: 'Tomando medicação é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo tomando medicação não pode ser vazio',
    }),
  allergy: z
    .string({ required_error: 'Arlegias é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo arlegias não pode ser vazio',
    }),
  diseaseHistory: z
    .string({ required_error: 'Histórico de doenças é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo histórico de doenças não pode ser vazio',
    }),
  consumeDrug: z
    .string({ required_error: 'Consome droga é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo consome drogas não pode ser vazio',
    }),
  dailyRoutine: z
    .string({ required_error: 'Rotina diária é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo rotina diária não pode ser vazio',
    }),
  emotionalState: z
    .string({ required_error: 'Estado emocional é obrigatório' })
    .refine((data) => data.trim() !== '', {
      message: 'O campo estado emocional não pode ser vazio',
    }),
  patientId: z.string({ required_error: 'Estado emocional é obrigatório' }),
})
