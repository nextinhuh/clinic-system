/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface InputListProps {
  name: string
  type?: string
  label: string
  placeholder?: string
  formItemClassName?: string
}

interface FormControllerProps {
  form: UseFormReturn<any>
  onSubmit: () => Promise<any>
  children?: React.ReactNode
  className?: string
  inputList?: InputListProps[]
}

export function FormController({
  form,
  onSubmit,
  children,
  className,
  inputList,
}: FormControllerProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {inputList?.map((input) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem
                className={
                  input.formItemClassName ? input.formItemClassName : 'w-[100%]'
                }
              >
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  {input.type && input.type === 'textarea' ? (
                    <Textarea placeholder={input.placeholder} {...field} />
                  ) : (
                    <Input
                      type={input.type ? input.type : 'text'}
                      placeholder={input.placeholder}
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {children}
      </form>
    </Form>
  )
}
