import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { consultCardInputList } from '@/utils/inputs-def'
import { createConsultFormSchema } from '@/utils/schemas'
import { ConsultData, CreateConsultFormData, PatientData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface ConsultCardProps {
  consultData?: ConsultData
  patientData?: PatientData
  isLoadingData: boolean
}

export function ConsultCard({ consultData, isLoadingData }: ConsultCardProps) {
  const navigate = useNavigate()
  const form = useForm<CreateConsultFormData>({
    resolver: zodResolver(createConsultFormSchema),
    defaultValues: {
      doctorId: '',
      patientName: consultData?.patientName,
      patientId: '',
      assessment: consultData?.assessment,
      date: consultData?.date,
      guidance: consultData?.guidance,
      prescription: consultData?.prescription,
      resume: consultData?.resume,
      status: consultData?.status,
    },
  })

  useMemo(() => {
    if (!isLoadingData && consultData) {
      form.reset({
        doctorId: consultData.doctorId,
        patientName: consultData.patientName,
        patientId: consultData.patientId,
        assessment: consultData.assessment,
        date: consultData.date,
        guidance: consultData.guidance,
        prescription: consultData.prescription,
        resume: consultData.resume,
        status: consultData.status,
      })
    }
  }, [isLoadingData])

  function handleGoBack() {
    navigate('/consult')
  }

  return (
    <>
      {isLoadingData ? (
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
            inputList={consultCardInputList}
            className="w-full grid grid-cols-3 gap-4 mt-8"
            onSubmit={form.handleSubmit(() => {})}
          />
          <div className="flex items-center justify-center gap-6 mt-14 w-full">
            <Button variant="outline" type="button" onClick={handleGoBack}>
              Voltar
            </Button>
            <Button
              variant="default"
              type="submit"
              isLoading={form.formState.isSubmitting}
              onClick={form.handleSubmit(() => {})}
            >
              Atualizar consulta
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
