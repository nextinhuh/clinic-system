import { FormController } from '@/components/form-controller'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/hook/Auth'
import { createConsult } from '@/service/consult.service'
import { allPatient } from '@/service/patient.service'
import { createConsultInputDefList } from '@/utils/inputs-def'
import { createConsultFormSchema } from '@/utils/schemas'
import { CreateConsultFormData, PatientData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function CreateConsult() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [patientList, setPatientList] = useState<PatientData[]>([])
  const form = useForm<CreateConsultFormData>({
    resolver: zodResolver(createConsultFormSchema),
    defaultValues: {
      doctorId: user.id,
      patientName: '',
      patientId: '',
      assessment: '',
      date: new Date(),
      guidance: '',
      prescription: '',
      resume: '',
      status: '',
    },
  })

  useMemo(async () => {
    setPatientList(await allPatient(user.id))
  }, [])

  async function handleCreateConsult(
    consultData: CreateConsultFormData,
  ): Promise<void> {
    try {
      const findPatient = patientList.find(
        (patient) => patient.id === consultData.patientId,
      )
      await createConsult({
        ...consultData,
        patientName: String(findPatient?.name),
      })
      toast({
        variant: 'success',
        title: 'Consulta criada com sucesso!',
        duration: 3000, // 3 SECONDS
      })
      handleGoBack()
    } catch (error) {
      if ((error as Error).message) {
        toast({
          variant: 'destructive',
          title: 'Erro ao criar consulta',
          duration: 3000, // 3 SECONDS
          description:
            'Ocorreu um erro ao criar consulta, favor tentar novamente.',
        })
      }
    }
  }

  function handleGoBack() {
    navigate('/consult')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Criar nova consulta</h1>

      <div className="w-full border rounded-lg p-8 mt-8">
        <FormController
          form={form}
          inputList={createConsultInputDefList(patientList)}
          className="w-full grid grid-cols-3 gap-4"
          onSubmit={form.handleSubmit(handleCreateConsult)}
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
            onClick={form.handleSubmit(handleCreateConsult)}
          >
            Criar consulta
          </Button>
        </div>
      </div>
    </div>
  )
}
