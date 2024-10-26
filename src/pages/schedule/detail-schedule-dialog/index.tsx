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
import { confirmScheduleInputList } from '@/utils/inputs-def'
import { useNavigate } from 'react-router-dom'

interface DetailScheduleDialogProps {
  isOpen?: boolean
}

export interface DetailScheduleDialogRef {
  handleOpenDialog: (scheduleData: ScheduleAppointmentSchemaData) => void
  handleCloseDialog: () => void
}

export const DetailScheduleDialog = forwardRef<
  DetailScheduleDialogRef,
  DetailScheduleDialogProps
>(({ isOpen = false }: DetailScheduleDialogProps, ref) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
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
      doctorName: '',
    },
  })

  useMemo(async () => {
    if (schedule !== undefined) {
      form.reset({
        date: schedule?.date,
        patientName: schedule?.patientName,
        doctorName: String(user.name),
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
      navigate(`/consult/create`, { state: { schedule } })
      toast({
        variant: 'success',
        title: 'Agendamento confirmado com sucesso!',
        duration: 3000, // 3 SECONDS
      })
      setOpen(!open)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Não foi possivel confirmar o agendamento',
        duration: 3000, // 3 SECONDS
      })
    }
  }

  function handleCheckScheduleDate(): boolean {
    return schedule?.date?.getDate() > Date.now() || schedule.consultId !== ''
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center max-w-96">
        <DialogHeader>
          <DialogTitle>Detalhes do agendamento</DialogTitle>
        </DialogHeader>

        <FormController
          form={form}
          inputList={confirmScheduleInputList}
          className="flex flex-col gap-5 mt-8 items-center w-full"
          onSubmit={form.handleSubmit(() => {})}
        >
          <div className="flex gap-6 mt-6 w-[100%]">
            <Button
              className="w-[100%]"
              variant="default"
              type="button"
              isLoading={form.formState.isSubmitting}
              disabled={handleCheckScheduleDate()}
              onClick={handleConfirmSchedule}
            >
              Gerar consulta
            </Button>
          </div>
        </FormController>
      </DialogContent>
    </Dialog>
  )
})
DetailScheduleDialog.displayName = 'DetailScheduleDialog'
