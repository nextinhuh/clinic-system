import { forwardRef, useImperativeHandle, useState } from 'react'
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
import { createSchedule } from '@/service/schedule.service'
import { FormController } from '@/components/form-controller'
import { createScheduleAppointmentFormSchema } from '@/utils/schemas'
import { CreateScheduleAppointmentFormSchema, PatientData } from '@/utils/types'
import { handleMountCreateScheduleInputDefList } from '@/utils/inputs-def'

interface CreateScheduleDialogProps {
  patientsList: PatientData[]
  updateSchedulesList: () => Promise<void>
}

export interface CreateScheduleDialogRef {
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

export const CreateScheduleDialog = forwardRef<
  CreateScheduleDialogRef,
  CreateScheduleDialogProps
>(({ patientsList, updateSchedulesList }: CreateScheduleDialogProps, ref) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const form = useForm<CreateScheduleAppointmentFormSchema>({
    resolver: zodResolver(createScheduleAppointmentFormSchema),
    defaultValues: {
      date: new Date(),
      patientId: '',
      patientName: '',
      doctorId: String(user.id),
      doctorName: String(user.name),
    },
  })

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
    const patientData = patientsList?.find(
      (patient) => patient.id === scheduleData.patientId,
    )

    if (!patientData) {
      return toast({
        variant: 'destructive',
        title: 'Não foi possivel realizar o agendamento',
        duration: 3000, // 3 SECONDS
      })
    }

    try {
      await createSchedule({
        ...scheduleData,
        patientName: patientData?.name || '',
      })
      toast({
        variant: 'success',
        title: 'Agendamento realizado com sucesso!',
        duration: 3000, // 3 SECONDS
      })
      await updateSchedulesList()
      setOpen(!open)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Não foi possivel realizar o agendamento',
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
          inputList={handleMountCreateScheduleInputDefList(patientsList)}
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
CreateScheduleDialog.displayName = 'CreateScheduleDialog'
