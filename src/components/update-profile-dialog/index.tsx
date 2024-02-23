import { forwardRef, useImperativeHandle, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { UpdateUserFormData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserFormSchema } from '@/utils/schemas'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { useAuth } from '@/hook/Auth'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

interface UpdateProfileDialogProps {
  isOpen?: boolean
}

export interface UpdateProfileDialogRef {
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

// eslint-disable-next-line react/display-name
export const UpdateProfileDialog = forwardRef<
  UpdateProfileDialogRef,
  UpdateProfileDialogProps
>(({ isOpen = false }: UpdateProfileDialogProps, ref) => {
  const { toast } = useToast()
  const { user, updateUser } = useAuth()
  const [open, setOpen] = useState(isOpen)
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      email: user?.email ? user?.email : '',
      name: user?.name ? user?.name : '',
      photoURL: user?.photoURL ? user?.photoURL : '',
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

  async function handleUpdateUserProfile(
    userData: UpdateUserFormData,
  ): Promise<void> {
    try {
      await updateUser(userData)
      setOpen(!open)
      toast({
        variant: 'success',
        title: 'Perfil atualizado!',
        duration: 3000, // 3 SECONDS
        description: 'Seu perfil foi atualizado com sucesso.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar perfil',
        duration: 3000, // 3 SECONDS
        description:
          'Ocorreu um erro ao atualizar o perfil, favor tentar novamente.',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center max-w-96">
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateUserProfile)}
            className="flex flex-col gap-3 mt-8 items-center w-[100%]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Nome de exibição</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photoURL"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mt-8 w-[80%]"
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              Atualizar perfil
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
})
