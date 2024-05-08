import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/hook/Auth'
import { allPatient, createSchedule } from '@/service/patient.service'
import { createScheduleAppointmentFormSchema } from '@/utils/schemas'
import { CreateScheduleAppointmentFormSchema, PatientData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export const CreateScheduleDialog = () => {
  const [allPatients, setAllPatients] = useState<PatientData[]>()
  const { user } = useAuth()
  const form = useForm<CreateScheduleAppointmentFormSchema>({
    resolver: zodResolver(createScheduleAppointmentFormSchema),
    defaultValues: {
      date: new Date(),
      patientId: '',
      patientName: '',
      doctorId: '',
      hasConfirm: false,
    },
  })
  const inputList = [
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
      options: allPatients,
    },
  ]
  useMemo(async () => {
    try {
      setAllPatients(await allPatient())
    } catch (error) {}
  }, [])

  async function handleCreateSchedule(
    scheduleData: CreateScheduleAppointmentFormSchema,
  ) {
    const patientData = allPatients?.find(
      (patient) => patient.id === scheduleData.patientId,
    )

    scheduleData = {
      ...scheduleData,
      doctorId: user?.email || '',
      patientName: patientData?.name || '',
    }

    try {
      await createSchedule(scheduleData)
      toast({
        variant: 'success',
        title: 'Agendamento realizado com sucesso!',
        duration: 3000, // 3 SECONDS
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Não foi possivel realizar o agendamneto',
        duration: 3000, // 3 SECONDS
      })
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Novo agendamnto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar novo agendamento</DialogTitle>
        </DialogHeader>
        <div className="mt-8 flex items-center justify-center">
          <FormController
            form={form}
            // @ts-expect-error Type option
            inputList={inputList}
            className="w-96 flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleCreateSchedule)}
          >
            <div className="flex gap-6 mt-6 w-[100%]">
              <DialogClose asChild>
                <Button
                  className="w-[100%]"
                  variant="outline"
                  type="button"
                  onClick={() => {}}
                >
                  Voltar
                </Button>
              </DialogClose>
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
      </DialogContent>
    </Dialog>
  )
}
