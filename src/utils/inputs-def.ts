import { InputListProps } from '@/components/form-controller'
import { PatientData } from './types'
import { consultStatusEnum } from './schemas'

export const createPatientInputDefList: InputListProps[] = [
  {
    name: 'name',
    label: 'Nome',
    placeholder: 'Digite o nome do paciente',
  },
  {
    name: 'email',
    label: 'E-mail',
    placeholder: 'Digite o e-mail do paciente',
    type: 'email',
  },
  {
    name: 'age',
    label: 'Idade',
    placeholder: 'Digite a idade do paciente',
    type: 'number',
  },
]

export function handleMountCreateScheduleInputDefList(
  patientList: PatientData[],
): InputListProps[] {
  return [
    {
      name: 'date',
      label: 'Data',
      placeholder: 'Selecione uma data',
      type: 'calendar',
    },
    {
      name: 'patientId',
      label: 'Paciente',
      placeholder: 'Selecione um paciente',
      type: 'select',
      options: patientList?.map((patient) => {
        return {
          label: patient.name,
          value: patient.id,
        }
      }),
    },
  ]
}

export const createConsultInputDefList: InputListProps[] = [
  {
    name: 'date',
    label: 'Data da consulta',
    placeholder: 'Data de realização da consulta',
    type: 'calendar',
    disabled: true,
  },
  {
    name: 'status',
    label: 'Status da consulta',
    placeholder: 'Selecione um status',
    type: 'select',
    options: Object.entries(consultStatusEnum._def.values)
    .filter(([key]) => !isNaN(Number(key)))
    .map(([key, value]) => {
      return {
        label: value,
        value: key,
      }
    }),
  },
  {
    name: 'resume',
    label: 'Resumo do motivo da consulta',
    placeholder: 'Resumo do motivo...',
    type: 'textarea',
  },
  {
    name: 'prescription',
    label: 'Prescição',
    placeholder: 'Prescrição de medicamentos...',
    type: 'textarea',
  },
  {
    name: 'assessment',
    label: 'Avaliação do caso',
    placeholder: 'Avaliação médica do caso...',
    type: 'textarea',
  },
  {
    name: 'guidance',
    label: 'Orientações médicas',
    placeholder: 'Orientações médica...',
    type: 'textarea',
  },
]
