import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hook/Auth'
import { createPatient } from '@/service/patient.service'
import { createPatientFormSchema } from '@/utils/schemas'
import { CreatePatientFormData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function CreatePatient() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const form = useForm<CreatePatientFormData>({
    resolver: zodResolver(createPatientFormSchema),
    defaultValues: {
      age: 0,
      name: '',
      email: '',
      doctorId: user.id,
      active: false,
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

  function handleGoBack() {
    navigate('/patient')
  }

  async function handleCreatePatient(
    patientData: CreatePatientFormData,
  ): Promise<void> {
    try {
      await createPatient(patientData)
      toast({
        variant: 'success',
        title: 'Paciente adicionado com sucesso!',
        duration: 3000, // 3 SECONDS
      })
      handleGoBack()
    } catch (error) {
      if ((error as Error).message) {
        toast({
          variant: 'destructive',
          title: 'Erro ao adicionar paciente',
          duration: 3000, // 3 SECONDS
          description:
            'Ocorreu um erro ao adicionar o paciente, favor tentar novamente.',
        })
      }
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Adicionar Paciente</h1>

      <div className="w-[100%] border rounded-lg p-8 mt-8 flex items-center justify-center">
        <FormController
          form={form}
          inputList={inputList}
          className="w-96 flex flex-col gap-3"
          onSubmit={form.handleSubmit(handleCreatePatient)}
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
