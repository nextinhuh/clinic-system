import { getActualDate } from "@/utils/parse"

export const Schedule = () => {
    return(
    <div className="p-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Agendamentos</h1>
            <p className="text-[10px] mt-2 sm:text-xs sm:mt-0">
            Atualizado em: {getActualDate()}
            </p>
        </div>
    </div>
    )
} 