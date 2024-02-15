import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function TopBar() {
  return (
    <header className="flex items-center justify-between w-[100%] mt-4">
      <h1 className="font-mono text-3xl">@Clinic System</h1>

      <div className="flex items-center gap-6">
        <p className="text-sm">Álvaro Neto</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
