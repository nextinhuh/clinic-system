import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  photoURL: z.string().nullable(),
})

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
  user: z.object({
    uid: z.string(),
    email: z.string(),
    displayName: z.string(),
    photoURL: z.string(),
  }),
})

export const patientSchema = z.object({
  id: z.string(),
  age: z.number(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
  anamnesisId: z.string(),
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
  doctorId: z.string({
    required_error: 'Identificador do médico é obrigatório',
  }),
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  active: z.boolean(),
})

export const updatePatientFormSchema = z.object({
  patientId: z.string({
    required_error: 'Identificador do paciente é obrigatório',
  }),
  age: z.coerce
    .number({ required_error: 'Idade é obrigatório' })
    .min(1, { message: 'Idade inválida' }),
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

export const scheduleAppointmentSchema = z.object({
  id: z.string(),
  date: z.date(),
  patientName: z.string(),
  doctorName: z.string(),
  doctorId: z.string(),
  patientId: z.string(),
  consultId: z.string(),
})

export const createScheduleAppointmentFormSchema = z.object({
  patientId: z
    .string({
      required_error: 'Por favor selecione um paciente',
    })
    .refine((data) => data.trim() !== '', {
      message: 'Selecione um paciente',
    }),
  patientName: z.string(),
  doctorName: z.string(),
  doctorId: z.string(),
  date: z.coerce
    .date()
    .refine((data) => data.getDate() >= new Date().getDate(), {
      message: 'A data da consulta deve ser igual ou maio que a atual',
    }),
})

// CONSULT

export const consultStatusEnum = z.enum([
  'Remarcado',
  'Encaminhado',
  'Impedimento',
  'Em progresso',
])

export const consultSchema = z.object({
  id: z.string(),
  date: z.date(),
  resume: z.string(),
  prescription: z.string(),
  assessment: z.string(),
  guidance: z.string(),
  status: consultStatusEnum,
  doctorId: z.string(),
  patientId: z.string(),
  patientName: z.string(),
})

export const createConsultFormSchema = z.object({
  date: z.date({ required_error: 'A data da consulta é obrigatória' }),
  resume: z.string({ required_error: 'Resumo do motivo é obrigatório' }),
  prescription: z.string({ required_error: 'Prescrição é obrigatória' }),
  assessment: z.string({ required_error: 'Avaliação do caso é obrigatória' }),
  guidance: z.string({ required_error: 'Orientações é obrigatório' }),
  status: z.string().refine((value: any) => {
    return consultStatusEnum.options.includes(value)
  }, 'Status da consulta é obrigatório'),
  doctorId: z.string(),
  patientName: z.string(),
  patientId: z.string().refine((value: any) => {
    return value !== ''
  }, 'Paciente é obrigatório'),
})
