import { TableSimple } from '@/components/table-simple'
import { Button } from '@/components/ui/button'
import { consultTableDefs } from '@/utils/columns-def'
import { getActualDate } from '@/utils/parse'
import { useNavigate } from 'react-router-dom'

export function Consult() {
  const navigate = useNavigate()

  function handleCreateConsult() {
    navigate('/consult/create')
  }
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Consultas</h1>
        <p className="text-[10px] mt-2 sm:text-xs sm:mt-0">
          Atualizado em: {getActualDate()}
        </p>
      </div>

      <div className="w-[100%] border rounded-lg p-8 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold mb-4">Lista das consultas realizadas</h1>
          <Button onClick={handleCreateConsult} variant="outline">
            Criar consulta
          </Button>
        </div>

        <TableSimple<any>
          listData={[]}
          tableDefs={consultTableDefs}
          isFetiching={false}
        />
      </div>
    </div>
  )
}
