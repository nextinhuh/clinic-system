import { Button } from '@/components/ui/button'
import { allPatient } from '@/service/patient.service'
import { getActualDate } from '@/utils/parse'
import { PatientData } from '@/utils/types'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hook/Auth'
import { TableSimple } from '@/components/table-simple'
import { patientTableDefs } from '@/utils/columns-def'

export function Patient() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [patientList, setPatientList] = useState<PatientData[]>([])
  const [loadingList, setLoadingList] = useState<boolean>(false)

  function handleCreatePatient() {
    navigate('/patient/create')
  }

  useMemo(async () => {
    setLoadingList(true)
    setPatientList(await allPatient(user.id))
    setLoadingList(false)
  }, [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pacientes</h1>
        <p className="text-[10px] mt-2 sm:text-xs sm:mt-0">
          Atualizado em: {getActualDate()}
        </p>
      </div>

      <div className="w-[100%] border rounded-lg p-8 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold mb-4">Lista dos pacientes cadastrados</h1>
          <Button onClick={handleCreatePatient} variant="outline">
            Adicionar paciente
          </Button>
        </div>

        <TableSimple<PatientData>
          listData={patientList}
          tableDefs={patientTableDefs}
          isFetiching={loadingList}
        />
      </div>
    </div>
  )
}
