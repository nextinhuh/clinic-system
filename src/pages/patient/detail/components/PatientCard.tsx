import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { patientById } from '@/service/patient.service'
import { updateUserFormSchema } from '@/utils/schemas'
import { PatientData, UpdatePatientFormData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface PatientCardProps {
  patientId?: string
}

export function PatientCard({ patientId }: PatientCardProps) {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<UpdatePatientFormData>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      age: 0,
      name: '',
      email: '',
    },
  })
  const inputList = [
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

  useMemo(async () => {
    try {
      if (!patientId) return
      setIsLoading(true)
      const patientData = await patientById(patientId)
      handleSetValueForm(patientData)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if ((error as Error).message) {
        toast({
          variant: 'destructive',
          title: `${(error as Error).message}`,
          duration: 3000, // 3 SECONDS
        })
      }
    }
  }, [])

  function handleSetValueForm(patientData: PatientData) {
    form.setValue('name', patientData?.name ? patientData.name : '')
    form.setValue('email', patientData?.email ? patientData.email : '')
    form.setValue('age', patientData?.age ? patientData.age : 0)
  }

  function handleGoBack() {
    navigate('/patient')
  }

  async function handleUpdatePatient(patientData: UpdatePatientFormData) {
    console.log(patientData)
  }

  return (
    <>
      {isLoading ? (
        <div className="w-96 flex flex-col gap-6 mt-8">
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[25px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[25px]" />
          <Skeleton className="w-[20%] h-[25px]" />
          <Skeleton className="w-[100%] h-[25px]" />
          <div className="flex gap-6">
            <Skeleton className="w-[100%] h-[30px]" />
            <Skeleton className="w-[100%] h-[30px]" />
          </div>
        </div>
      ) : (
        <FormController
          form={form}
          inputList={inputList}
          className="w-96 flex flex-col gap-3 mt-8"
          onSubmit={form.handleSubmit(handleUpdatePatient)}
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
              Atualizar dados
            </Button>
          </div>
        </FormController>
      )}
    </>
  )
}
