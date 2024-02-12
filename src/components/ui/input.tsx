import * as React from 'react'

import { cn } from '@/utils/tw-merge'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(
      type !== 'password',
    )
    const togglePasswordVisibility = () => setShowPassword(!showPassword)
    return (
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />

        {type && (
          <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
            {showPassword ? (
              <EyeOpenIcon
                className="h-4 w-4"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <EyeClosedIcon
                className="h-4 w-4"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
