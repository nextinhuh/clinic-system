import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { CreateUserFormData, GetUserData } from '@/utils/types'
import { createUserFormSchema } from '@/utils/schemas'
import { useToast } from '@/components/ui/use-toast'
import { FIREBASE_ERROR } from '@/utils/firebase-errors'

export function SignIn() {
  const auth = getAuth()
  const { toast } = useToast()
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleRegisterUser(
    userData: CreateUserFormData,
  ): Promise<void> {
    await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    )
      .then((userCredential: GetUserData) => {
        const user = userCredential.user

        console.log(user?.email)
        console.log(user?.uid)
      })
      .catch((error) => {
        if (error.message === FIREBASE_ERROR.EMAIL_EXISTIS) {
          toast({
            variant: 'destructive',
            title: 'Erro ao criar usuário',
            duration: 3000, // 3 SECONDS
            description:
              'Já existe usuário com esse e-mail, favor tentar com outro diferente.',
          })
        }
      })
  }

  return (
    <div className="h-[100vh] flex items-stretch">
      <div className="bg-sign-page flex-1 bg-cover"></div>

      <div className="flex flex-col items-center justify-center min-w-1/2 p-12">
        <img src="/assets/clinic-logo.png" alt="" className="text-white w-52" />

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
                    <Input placeholder="Senha" {...field} />
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
                    <Input placeholder="Repita a senha" {...field} />
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
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
