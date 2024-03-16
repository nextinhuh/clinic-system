import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { allPatient } from '@/service/patient.service'
import { getActualDate } from '@/utils/parse'
import { PatientData } from '@/utils/types'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { BsLayoutTextWindow } from 'react-icons/bs'

export function Patient() {
  const navigate = useNavigate()
  const [patientList, setPatientList] = useState<PatientData[]>([])

  function handleCreatePatient() {
    navigate('/patient/create')
  }

  useMemo(async () => {
    setPatientList(await allPatient())
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
          <h1 className="font-bold mb-4">Lista das últimas consultas</h1>
          <Button onClick={handleCreatePatient} variant="outline">
            Adicionar paciente
          </Button>
        </div>

        {patientList.length !== 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Anamnese</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientList.map((patient) => {
                return (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      {patient.name}
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>
                      {patient.anamnesisId === '' ? (
                        <Badge className="w-11 rounded-3xl" variant="default">
                          <IoCloseCircleOutline size={24} color="red" />
                        </Badge>
                      ) : (
                        <Badge className="w-11 rounded-3xl" variant="default">
                          <IoCheckmarkCircleOutline size={24} color="green" />
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <BsLayoutTextWindow
                        className="cursor-pointer"
                        size={24}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
