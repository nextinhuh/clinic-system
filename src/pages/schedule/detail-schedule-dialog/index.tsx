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
import { FormController } from '@/components/form-controller'
import { scheduleAppointmentSchema } from '@/utils/schemas'
import { ScheduleAppointmentSchemaData } from '@/utils/types'
import { isPast } from 'date-fns'

interface DetailScheduleDialogProps {
  isOpen?: boolean
}

export interface DetailScheduleDialogRef {
  handleOpenDialog: (scheduleData: ScheduleAppointmentSchemaData) => void
  handleCloseDialog: () => void
}

// eslint-disable-next-line react/display-name
export const DetailScheduleDialog = forwardRef<
  DetailScheduleDialogRef,
  DetailScheduleDialogProps
>(({ isOpen = false }: DetailScheduleDialogProps, ref) => {
  const { toast } = useToast()
  const { user } = useAuth()
  const [open, setOpen] = useState(isOpen)
  const [schedule, setSchedule] = useState<ScheduleAppointmentSchemaData>(
    {} as ScheduleAppointmentSchemaData,
  )
  const form = useForm<ScheduleAppointmentSchemaData>({
    resolver: zodResolver(scheduleAppointmentSchema),
    defaultValues: {
      date: new Date(),
      patientId: '',
      patientName: ' schedule?.patientName',
      doctorId: '',
    },
  })
  const inputList = [
    {
      name: 'date',
      label: 'Data',
      placeholder: 'Selecione uma data',
      type: 'calendar',
      disabled: true,
    },
    {
      name: 'patientName',
      label: 'Paciente',
      disabled: true,
    },
    {
      name: 'doctorId',
      label: 'Nome do médico',
      disabled: true,
    },
  ]
  useMemo(async () => {
    if (schedule !== undefined) {
      form.reset({
        date: schedule?.date,
        patientName: schedule?.patientName,
        doctorId: user.name,
      })
    }
  }, [schedule])

  useImperativeHandle(ref, () => ({
    handleOpenDialog(scheduleData: ScheduleAppointmentSchemaData): void {
      setOpen(true)
      setSchedule(scheduleData)
    },
    handleCloseDialog(): void {
      setOpen(false)
    },
  }))

  async function handleConfirmSchedule() {
    try {
      toast({
        variant: 'success',
        title: 'Agendamento confirmado com sucesso!',
        duration: 3000, // 3 SECONDS
      })
      setOpen(!open)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Não foi possivel confirmar 0 agendamento',
        duration: 3000, // 3 SECONDS
      })
    }
  }

  function handleCheckScheduleDate(): boolean {
    return isPast(schedule.date)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center max-w-96">
        <DialogHeader>
          <DialogTitle>Detalhes do agendamento</DialogTitle>
        </DialogHeader>

        <FormController
          form={form}
          inputList={inputList}
          className="flex flex-col gap-5 mt-8 items-center w-full"
          onSubmit={form.handleSubmit(handleConfirmSchedule)}
        >
          <div className="flex gap-6 mt-6 w-[100%]">
            <Button
              className="w-[100%]"
              variant="default"
              type="submit"
              isLoading={form.formState.isSubmitting}
              disabled={handleCheckScheduleDate()}
            >
              Gerar consulta
            </Button>
          </div>
        </FormController>
      </DialogContent>
    </Dialog>
  )
})
