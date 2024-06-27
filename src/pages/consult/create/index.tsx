import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hook/Auth'
import { createConsultInputDefList } from '@/utils/inputs-def'
import { createConsultFormSchema } from '@/utils/schemas'
import { CreateConsultFormSchema } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function CreateConsult() {
  const { user } = useAuth()
  const form = useForm<CreateConsultFormSchema>({
    resolver: zodResolver(createConsultFormSchema),
    defaultValues: {
      doctorId: user.id,
      patientId: '',
      assessment: '',
      date: new Date(),
      guidance: '',
      prescription: '',
      resume: '',
      status: 1,
    },
  })

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Criar nova consulta</h1>

      <div className="w-full border rounded-lg p-8 mt-8">
        <FormController
          form={form}
          inputList={createConsultInputDefList}
          className="w-full grid grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(() => {})}
        />
        <div className="flex items-center justify-center gap-6 mt-14 w-full">
          <Button
            className="w-56"
            variant="outline"
            type="button"
            onClick={() => {}}
          >
            Voltar
          </Button>

          <Button
            className="w-56"
            variant="default"
            type="submit"
            isLoading={form.formState.isSubmitting}
            onClick={form.handleSubmit(() => {})}
          >
            Criar consulta
          </Button>
        </div>
      </div>
    </div>
  )
}
