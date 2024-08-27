import { FormController, InputListProps } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import {
  createAnamnesisPatient,
  getAnamnesisByAnamneseId,
  updateAnamnesisPatient,
} from '@/service/patient.service'
import { updatePatientAnamnesisFormSchema } from '@/utils/schemas'
import {
  PatientAnamnesisData,
  PatientData,
  UpdatePatientAnamnesisFormData,
} from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface AnamnesisCardProps {
  patientData?: PatientData
}

export function AnamnesisCard({ patientData }: AnamnesisCardProps) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      patientId: String(patientData?.id),
    },
  })
  const inputList: InputListProps[] = [
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

  useMemo(async () => {
    try {
      if (patientData?.anamnesisId) {
        setIsLoading(true)
        const anamnesisData = await getAnamnesisByAnamneseId(
          patientData?.anamnesisId,
        )
        handleSetValueForm(anamnesisData)
        setIsLoading(false)
      }
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
    form.reset({
      ...anamnesisData,
    })
  }

  async function handleSubmitAnamnesisPatient(
    patientAnamnesisData: UpdatePatientAnamnesisFormData,
  ) {
    if (patientData?.anamnesisId) {
      await updateAnamnesisPatient(
        String(patientData?.anamnesisId),
        patientAnamnesisData,
      )
    } else {
      await createAnamnesisPatient(patientAnamnesisData)
    }
  }

  function handleGoBack() {
    navigate('/patient')
  }

  return (
    <>
      {isLoading ? (
        <div className="w-[100%] flex flex-col gap-6 mt-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-[20%] h-[25px] my-6" />
              <Skeleton className="w-[100%] h-[50px]" />
            </div>
          ))}
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
            onSubmit={form.handleSubmit(handleSubmitAnamnesisPatient)}
          >
            <div className="flex gap-6 mt-6 w-[100%]">
              <Button
                className="w-[100%]"
                variant="outline"
                type="button"
                onClick={handleGoBack}
              >
                Voltar
              </Button>

              <Button
                className="w-[100%]"
                variant="default"
                type="submit"
                isLoading={form.formState.isSubmitting}
              >
                {patientData?.anamnesisId ? 'Atualizar' : 'Salvar'} dados
              </Button>
            </div>
          </FormController>
        </div>
      )}
    </>
  )
}
