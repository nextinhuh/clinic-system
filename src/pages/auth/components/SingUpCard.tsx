import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form'
import { SignUpUserFormData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpUserFormSchema } from '@/utils/schemas'
import { useToast } from '../../../components/ui/use-toast'
import { useAuth } from '@/hook/Auth'
import { FIREBASE_ERROR } from '@/utils/firebase-errors'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'

interface SignUpCardProps {
  onSignUp: (newTabValue: string) => void
}

export function SingUpCard({ onSignUp }: SignUpCardProps) {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegisterUser)}
        className="w-96 flex flex-col gap-3 mt-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmação da senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repita a senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mt-6"
          variant="outline"
          type="submit"
          isLoading={form.formState.isSubmitting}
        >
          Cadastrar
        </Button>
      </form>
    </Form>
  )
}
