import { InputListProps } from '@/components/form-controller'
import { PatientData } from './types'
import { consultStatusEnum } from './schemas'

export const consultCardInputList: InputListProps[] = [
  {
    name: 'date',
    label: 'Data da consulta',
    type: 'calendar',
    disabled: true,
  },
  {
    name: 'patientName',
    label: 'Nome do paciente',
    type: 'text',
    disabled: true,
  },
  {
    name: 'status',
    label: 'Status da consulta',
    placeholder: 'Selecione um status',
    type: 'select',
    options: consultStatusEnum.options.map((value) => {
      return {
        label: value,
        value,
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
    formItemClassName: 'col-span-3',
  },
]

export const patientCardInputList: InputListProps[] = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
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

export const createPatientInputDefList: InputListProps[] = [
  {
    name: 'name',
    label: 'Nome',
    placeholder: 'Digite o nome do paciente',
    type: 'text',
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

export function createConsultInputDefList(
  patientsList: PatientData[],
): InputListProps[] {
  return [
    {
      name: 'date',
      label: 'Data da consulta',
      placeholder: 'Data de realização da consulta',
      type: 'calendar',
      disabled: true,
    },
    {
      name: 'patientId',
      label: 'Paciente',
      placeholder: 'Selecione um paciente',
      type: 'select',
      options: patientsList.length
        ? patientsList.map((patient) => {
            return {
              label: patient.name,
              value: patient.id,
            }
          })
        : [],
    },
    {
      name: 'status',
      label: 'Status da consulta',
      placeholder: 'Selecione um status',
      type: 'select',
      options: consultStatusEnum.options.map((value) => {
        return {
          label: value,
          value,
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
      formItemClassName: 'col-span-3',
    },
  ]
}
