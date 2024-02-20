export function NavMenu() {
  return (
    <div className="flex items-end gap-4 ">
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
