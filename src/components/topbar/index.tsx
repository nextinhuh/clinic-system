import { NavMenu } from '../nav-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function TopBar() {
  return (
    <header className="flex items-center justify-between w-[100%] border-b-[1px] border-white mt-4 pb-5">
      <div className="flex gap-10">
        <h1 className="text-3xl font-['Pacifico']">Clinic System</h1>
        <NavMenu />
      </div>

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
