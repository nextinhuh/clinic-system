import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import {
  createAnamnesisPatient,
  getAnamnesisByPatientId,
  updateAnamnesisPatient,
} from '@/service/patient.service'
import { updatePatientAnamnesisFormSchema } from '@/utils/schemas'
import {
  PatientAnamnesisData,
  UpdatePatientAnamnesisFormData,
} from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

interface AnamnesisCardProps {
  patientId?: string
}

export function AnamnesisCard({ patientId }: AnamnesisCardProps) {
  const form = useForm<UpdatePatientAnamnesisFormData>({
    resolver: zodResolver(updatePatientAnamnesisFormSchema),
    defaultValues: {
      allergy: '',
      consumeDrug: '',
      dailyRoutine: '',
      diseaseHistory: '',
      emotionalState: '',
      medicalHistory: '',
      reason: '',
      symptoms: '',
      takingMedication: '',
      patientId,
    },
  })
  const inputList = [
    {
      name: 'allergy',
      label: 'Alergias ?',
      placeholder: 'Digite a de alergias do paciente',
      type: 'textarea',
    },
    {
      name: 'emotionalState',
      label: 'Estado emocional',
      placeholder: 'Digite o estado emocional do paciente',
      type: 'textarea',
    },
    {
      name: 'consumeDrug',
      label: 'Consome drogas ?',
      placeholder: 'Digite caso sim, forneça mais informações',
      type: 'textarea',
    },
    {
      name: 'dailyRoutine',
      label: 'Rotina diária',
      placeholder: 'Digite a rotina diária do paciente',
      type: 'textarea',
    },
    {
      name: 'diseaseHistory',
      label: 'Histórico de doenças',
      placeholder: 'Digite a histórico de doenças do paciente',
      type: 'textarea',
    },
    {
      name: 'medicalHistory',
      label: 'Histórico médico',
      placeholder: 'Digite o histórico médico do paciente',
      type: 'textarea',
    },
    {
      name: 'reason',
      label: 'Razões',
      placeholder: 'Digite as razões da visita do paciente',
      type: 'textarea',
    },
    {
      name: 'symptoms',
      label: 'Sintomas',
      placeholder: 'Digite os sintomas do paciente',
      type: 'textarea',
    },
    {
      name: 'takingMedication',
      label: 'Tomando medicações',
      placeholder: 'Digite os medicamentos que o paciente esta tomando',
      type: 'textarea',
    },
  ]

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [anamnesisId, setAnamnesisId] = useState<string>()

  useMemo(async () => {
    try {
      if (!patientId) return
      setIsLoading(true)
      const anamnesisData = await getAnamnesisByPatientId(patientId)
      handleSetValueForm(anamnesisData)
      setAnamnesisId(anamnesisData.id)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if ((error as Error).message) {
        toast({
          variant: 'destructive',
          title: `${(error as Error).message}`,
          duration: 5000, /// 5 SECONDS
        })
      }
    }
  }, [])

  function handleSetValueForm(anamnesisData: PatientAnamnesisData) {
    form.setValue(
      'allergy',
      anamnesisData?.allergy ? anamnesisData.allergy : '',
    )
    form.setValue(
      'consumeDrug',
      anamnesisData?.consumeDrug ? anamnesisData.consumeDrug : '',
    )
    form.setValue(
      'dailyRoutine',
      anamnesisData?.dailyRoutine ? anamnesisData.dailyRoutine : '',
    )
    form.setValue(
      'diseaseHistory',
      anamnesisData?.diseaseHistory ? anamnesisData.diseaseHistory : '',
    )
    form.setValue(
      'emotionalState',
      anamnesisData?.emotionalState ? anamnesisData.emotionalState : '',
    )
    form.setValue(
      'medicalHistory',
      anamnesisData?.medicalHistory ? anamnesisData.medicalHistory : '',
    )
    form.setValue(
      'takingMedication',
      anamnesisData?.takingMedication ? anamnesisData.takingMedication : '',
    )
    form.setValue('reason', anamnesisData?.reason ? anamnesisData.reason : '')
    form.setValue(
      'symptoms',
      anamnesisData?.symptoms ? anamnesisData.symptoms : '',
    )
  }

  async function handlePatientAnamnesis(
    patientAnamnesisData: UpdatePatientAnamnesisFormData,
  ) {
    if (anamnesisId !== undefined) {
      await updateAnamnesisPatient(anamnesisId, patientAnamnesisData)
    } else {
      await createAnamnesisPatient(patientAnamnesisData)
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="w-10/12 flex flex-col gap-6 mt-8">
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[50px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[50px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[50px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[50px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[50px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[50px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[50px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[50px]" />
          <div className="flex gap-6">
            <Skeleton className="w-[100%] h-[30px]" />
            <Skeleton className="w-[100%] h-[30px]" />
          </div>
        </div>
      ) : (
        <div>
          <FormController
            form={form}
            inputList={inputList}
            className="w-[100%] flex flex-col gap-6"
            onSubmit={form.handleSubmit(handlePatientAnamnesis)}
          >
            <div className="flex gap-6 mt-6 w-[100%]">
              <Button
                className="w-[100%]"
                variant="outline"
                type="button"
                onClick={() => {}}
              >
                Voltar
              </Button>

              <Button
                className="w-[100%]"
                variant="default"
                type="submit"
                isLoading={form.formState.isSubmitting}
              >
                {anamnesisId ? 'Atualizar' : 'Criar'} dados
              </Button>
            </div>
          </FormController>
        </div>
      )}
    </>
  )
}
