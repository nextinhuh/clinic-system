export function NavMenu() {
  return (
    <div className="items-end gap-4 hidden sm:flex">
      <h1 className="text-base font-bold  cursor-pointer">INÍCIO</h1>
      <h1 className="text-base font-bold text-slate-400 cursor-pointer hover:text-white duration-100">
        PACIENTES
      </h1>
      <h1 className="text-base font-bold text-slate-400 cursor-pointer hover:text-white duration-100">
        CONSULTAS
      </h1>
    </div>
  )
}
