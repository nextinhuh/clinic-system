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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface IOptions {
  id: string
  name: string | number
}

interface InputListProps {
  name: string
  type?: string
  label: string
  placeholder?: string
  formItemClassName?: string
  options?: IOptions[]
}

type InputType = 'text' | 'textarea' | 'select' | 'email' | 'password'

interface FormControllerProps {
  form: UseFormReturn<any>
  onSubmit: () => Promise<any>
  children?: React.ReactNode
  className?: string
  inputList?: InputListProps[]
}

function renderInput(
  type?: InputType,
  placeholder?: string,
  field?: any,
  options?: IOptions[],
) {
  switch (type) {
    case 'textarea':
      return <Textarea placeholder={placeholder} {...field} />
    case 'select':
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options !== undefined &&
              options?.map((option, index) => (
                <SelectItem key={option.id + index} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )
    default:
      return (
        <Input type={type || 'text'} placeholder={placeholder} {...field} />
      )
  }
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
                  {renderInput(
                    input.type as InputType,
                    input.placeholder,
                    field,
                    input.options,
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
