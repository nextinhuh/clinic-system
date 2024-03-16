import { useForm } from 'react-hook-form'
import { SignUpUserFormData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpUserFormSchema } from '@/utils/schemas'
import { useToast } from '../../../components/ui/use-toast'
import { useAuth } from '@/hook/Auth'
import { FIREBASE_ERROR } from '@/utils/firebase-errors'
import { Button } from '../../../components/ui/button'
import { FormController } from '@/components/form-controller'

interface SignUpCardProps {
  onSignUp: (newTabValue: string) => void
}

export function SignUpCard({ onSignUp }: SignUpCardProps) {
  const { toast } = useToast()
  const { signUp } = useAuth()
  const form = useForm<SignUpUserFormData>({
    resolver: zodResolver(signUpUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const inputList = [
    {
      name: 'email',
      label: 'E-mail',
      placeholder: 'E-mail',
    },
    {
      name: 'password',
      label: 'Senha',
      placeholder: 'Senha',
      type: 'password',
    },
    {
      name: 'confirmPassword',
      label: 'Confirmação da senha',
      placeholder: 'Confirmação da senha',
      type: 'password',
    },
  ]

  async function handleRegisterUser(
    userData: SignUpUserFormData,
  ): Promise<void> {
    try {
      await signUp(userData)

      toast({
        variant: 'success',
        title: 'Sucesso!',
        duration: 3000, // 3 SECONDS
        description: 'Usuário cadastrado com sucesso.',
      })
      onSignUp('signIn')
    } catch (error) {
      if ((error as Error).message === FIREBASE_ERROR.EMAIL_EXISTIS) {
        toast({
          variant: 'destructive',
          title: 'Erro ao criar usuário',
          duration: 3000, // 3 SECONDS
          description:
            'Já existe usuário com esse e-mail, favor tentar com outro diferente.',
        })
      }
    }
  }

  return (
    <FormController
      form={form}
      inputList={inputList}
      className="w-96 flex flex-col gap-3 mt-8"
      onSubmit={form.handleSubmit(handleRegisterUser)}
    >
      <Button
        className="mt-6"
        variant="outline"
        type="submit"
        isLoading={form.formState.isSubmitting}
      >
        Cadastrar
      </Button>
    </FormController>
  )
}
