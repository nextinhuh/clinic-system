import { useForm } from 'react-hook-form'
import { SignInUserFormData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInUserFormSchema } from '@/utils/schemas'
import { useToast } from '../../../components/ui/use-toast'
import { useAuth } from '@/hook/Auth'
import { FIREBASE_ERROR } from '@/utils/firebase-errors'
import { Button } from '../../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { FormController } from '@/components/form-controller'

export function SingInCard() {
  const { toast } = useToast()
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const form = useForm<SignInUserFormData>({
    resolver: zodResolver(signInUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
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
  ]

  async function handleSignInUser(userData: SignInUserFormData): Promise<void> {
    try {
      await signIn(userData)
      navigate('/')
    } catch (error) {
      if ((error as Error).message === FIREBASE_ERROR.INVALID_CREDENTIAL) {
        toast({
          variant: 'destructive',
          title: 'Erro ao realizar login',
          duration: 3000, // 3 SECONDS
          description: 'E-mail ou senha incorreto(s), favor tentar novamente.',
        })
      }
    }
  }

  return (
    <FormController
      form={form}
      inputList={inputList}
      className="w-96 flex flex-col gap-3 mt-8"
      onSubmit={form.handleSubmit(handleSignInUser)}
    >
      <Button
        className="mt-6"
        variant="outline"
        type="submit"
        isLoading={form.formState.isSubmitting}
      >
        Login
      </Button>
    </FormController>
  )
}
