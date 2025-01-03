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
import { Button } from '../ui/button'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/utils/tw-merge'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { Checkbox } from '../ui/checkbox'

interface IOptions {
  value: string | number
  label: string | number
}

type InputType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'email'
  | 'password'
  | 'calendar'
  | 'checkbox'
  | 'number'

export type InputListProps = {
  name: string
  label: string
  type: InputType
  disabled?: boolean
  options?: IOptions[]
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

function renderInput(
  type?: InputType,
  placeholder?: string,
  field?: any,
  options?: IOptions[],
  disabled?: boolean,
) {
  switch (type) {
    case 'textarea':
      return <Textarea placeholder={placeholder} {...field} />
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox disabled={disabled} />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {placeholder}
          </label>
        </div>
      )
    case 'select':
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent {...field}>
            {options !== undefined &&
              options?.map((option) => (
                <SelectItem
                  key={String(option.value)}
                  value={String(option.value)}
                >
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )
    case 'calendar':
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                disabled={disabled}
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !field.value && 'text-muted-foreground',
                )}
              >
                {field.value ? (
                  format(field.value, 'PPPP', { locale: ptBR })
                ) : (
                  <span>{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )
    default:
      return (
        <Input
          disabled={disabled}
          type={type || 'text'}
          placeholder={placeholder}
          {...field}
        />
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
                  input.formItemClassName ? input.formItemClassName : 'w-full'
                }
              >
                <FormLabel className="mr-2">{input.label}</FormLabel>
                <FormControl>
                  {renderInput(
                    input.type as InputType,
                    input.placeholder,
                    field,
                    input.options,
                    input.disabled,
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
