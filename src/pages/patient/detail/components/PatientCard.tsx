import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { updatePatient, updatePatientActive } from '@/service/patient.service'
import { patientCardInputList } from '@/utils/inputs-def'
import { patientSchema, updatePatientFormSchema } from '@/utils/schemas'
import { PatientData, UpdatePatientFormData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface PatientCardProps {
  patientData?: PatientData
  isLoadingPatient: boolean
  setPatientData: (patientData: PatientData) => void
}

export function PatientCard({
  patientData,
  setPatientData,
  isLoadingPatient,
}: PatientCardProps) {
  const navigate = useNavigate()
  const form = useForm<UpdatePatientFormData>({
    resolver: zodResolver(updatePatientFormSchema),
    defaultValues: {
      age: 0,
      name: '',
      email: '',
      patientId: patientData?.id,
    },
  })

  useMemo(() => {
    if (!isLoadingPatient && patientData)
      handleSetValueForm(patientSchema.parse(patientData))
  }, [isLoadingPatient])

  function handleSetValueForm(patientData: PatientData) {
    form.reset({
      age: patientData.age,
      name: patientData.name,
      email: patientData.email,
      patientId: patientData.id,
    })
  }

  function handleGoBack() {
    navigate('/patient')
  }

  async function handleUpdatePatient(patientDataForm: UpdatePatientFormData) {
    await updatePatient(patientDataForm)
  }

  async function handleToggleActivePatient() {
    await updatePatientActive(String(patientData?.id), !patientData?.active)
    if (patientData)
      setPatientData({
        ...patientData,
        active: !patientData?.active,
      })
  }

  return (
    <>
      {isLoadingPatient ? (
        <div className="w-96 flex flex-col gap-6 mt-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-[20%] h-[25px]" />
              <Skeleton className="w-[100%] h-[25px]" />
            </div>
          ))}
          <div className="flex gap-6">
            <Skeleton className="w-[100%] h-[30px]" />
            <Skeleton className="w-[100%] h-[30px]" />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <FormController
            form={form}
            inputList={patientCardInputList}
            className="w-full flex gap-3 mt-8"
            onSubmit={form.handleSubmit(handleUpdatePatient)}
          />
          <div className="flex items-center justify-center gap-6 mt-14 w-full">
            <Button variant="outline" type="button" onClick={handleGoBack}>
              Voltar
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleToggleActivePatient}
            >
              {patientData?.active ? 'Desativar' : 'Ativar'} paciente
            </Button>
            <Button
              variant="default"
              type="submit"
              isLoading={form.formState.isSubmitting}
              onClick={form.handleSubmit(handleUpdatePatient)}
            >
              Atualizar dados
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
