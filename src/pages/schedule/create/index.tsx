import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { allPatient } from '@/service/patient.service'
import { createScheduleAppointmentFormSchema } from '@/utils/schemas'
import { CreateScheduleAppointmentFormSchema, PatientData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export const CreateSchedule = () => {
  const form = useForm<CreateScheduleAppointmentFormSchema>({
    resolver: zodResolver(createScheduleAppointmentFormSchema),
    defaultValues: {
      date: {
        startDate: new Date(),
      },
      patientId: '',
    },
  })

  const [allPatients, setAllPatients] = useState<PatientData[]>()

  useMemo(async () => {
    setAllPatients(await allPatient())
  }, [])

  const inputList = [
    {
      name: 'patientId',
      label: 'Paciente',
      placeholder: 'Um paciente',
      type: 'select',
      options: allPatients,
    },
  ]

  async function handleCreateSchedule(
    scheduleData: CreateScheduleAppointmentFormSchema,
  ): Promise<void> {
    console.log(scheduleData)
  }

  function handleGoBack() {}
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Agendar nova consulta</h1>

      <div className="w=[100%] border rounded-lg p-8 mt-8 flex items-center justify-center">
        <FormController
          onSubmit={form.handleSubmit(handleCreateSchedule)}
          form={form}
          // @ts-expect-error error type
          inputList={inputList}
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
              Adicionar
            </Button>
          </div>
        </FormController>
      </div>
    </div>
  )
}
