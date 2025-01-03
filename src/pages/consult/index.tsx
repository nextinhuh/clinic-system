import { TableSimple } from '@/components/table-simple'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hook/Auth'
import { allConsults } from '@/service/consult.service'
import { consultTableDefs } from '@/utils/columns-def'
import { getActualDate } from '@/utils/parse'
import { ConsultData } from '@/utils/types'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Consult() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loadingList, setLoadingList] = useState<boolean>(false)
  const [consultList, setConsultList] = useState<ConsultData[]>([])

  useMemo(async () => {
    setLoadingList(true)
    setConsultList(await allConsults(user.id))
    setLoadingList(false)
  }, [])

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

        <TableSimple<ConsultData>
          listData={consultList}
          tableDefs={consultTableDefs}
          isFetiching={loadingList}
        />
      </div>
    </div>
  )
}
