import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/hook/Auth'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { allPatient } from '@/service/patient.service'
import { createSchedule } from '@/service/schedule.service'
import { FormController } from '@/components/form-controller'
import { createScheduleAppointmentFormSchema } from '@/utils/schemas'
import { CreateScheduleAppointmentFormSchema, PatientData } from '@/utils/types'

interface CreateScheduleDialogProps {
  isOpen?: boolean
}

export interface CreateScheduleDialogRef {
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

// eslint-disable-next-line react/display-name
export const CreateScheduleDialog = forwardRef<
  CreateScheduleDialogRef,
  CreateScheduleDialogProps
>(({ isOpen = false }: CreateScheduleDialogProps, ref) => {
  const { toast } = useToast()
  const { user } = useAuth()
  const [open, setOpen] = useState(isOpen)
  const [allPatients, setAllPatients] = useState<PatientData[]>()
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
      options: allPatients?.map((patient) => {
        return {
          label: patient.name,
          value: patient.id,
        }
      }),
    },
  ]
  useMemo(async () => {
    try {
      setAllPatients(await allPatient(user?.id))
    } catch (error) {}
  }, [])

  useImperativeHandle(ref, () => ({
    handleOpenDialog(): void {
      setOpen(true)
    },
    handleCloseDialog(): void {
      setOpen(false)
    },
  }))

  async function handleCreateSchedule(
    scheduleData: CreateScheduleAppointmentFormSchema,
  ) {
    const patientData = allPatients?.find(
      (patient) => patient.id === scheduleData.patientId,
    )

    scheduleData = {
      ...scheduleData,
      doctorId: user?.id || '',
      patientName: patientData?.name || '',
    }

    try {
      await createSchedule(scheduleData)
      toast({
        variant: 'success',
        title: 'Agendamento realizado com sucesso!',
        duration: 3000, // 3 SECONDS
      })
      setOpen(!open)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Não foi possivel realizar o agendamneto',
        duration: 3000, // 3 SECONDS
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center max-w-96">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>

        <FormController
          form={form}
          inputList={inputList}
          className="flex flex-col gap-5 mt-8 items-center w-full"
          onSubmit={form.handleSubmit(handleCreateSchedule)}
        >
          <div className="flex gap-6 mt-6 w-[100%]">
            <Button
              className="w-[100%]"
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
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
      </DialogContent>
    </Dialog>
  )
})
