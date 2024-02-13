import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form'
import { SignInUserFormData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInUserFormSchema } from '@/utils/schemas'
import { useToast } from '../../../components/ui/use-toast'
import { useAuth } from '@/hook/Auth'
import { FIREBASE_ERROR } from '@/utils/firebase-errors'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { useNavigate } from 'react-router-dom'

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignInUser)}
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

        <Button
          className="mt-6"
          variant="outline"
          type="submit"
          isLoading={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
