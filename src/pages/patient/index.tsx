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
import { Skeleton } from '@/components/ui/skeleton'

export function Patient() {
  const navigate = useNavigate()
  const [patientList, setPatientList] = useState<PatientData[]>([])

  function handleCreatePatient() {
    navigate('/patient/create')
  }

  function handleDetailPatient(patientId: string | null) {
    navigate(`/patient/${patientId}`)
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
          <h1 className="font-bold mb-4">Lista dos pacientes cadastrados</h1>
          <Button onClick={handleCreatePatient} variant="outline">
            Adicionar paciente
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Idade</TableHead>
              <TableHead className="text-center">E-mail</TableHead>
              <TableHead className="text-center">Anamnese</TableHead>
              <TableHead className="text-center">Detalhes</TableHead>
            </TableRow>
          </TableHeader>

          {patientList.length !== 0 ? (
            <TableBody>
              {patientList.map((patient) => {
                return (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium text-center">
                      {patient.name}
                    </TableCell>
                    <TableCell className="text-center">{patient.age}</TableCell>
                    <TableCell className="text-center">
                      {patient.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {patient.anamnesisId === '' ? (
                        <Badge
                          className="w-11 rounded-3xl"
                          variant="destructive"
                        >
                          <IoCloseCircleOutline size={24} />
                        </Badge>
                      ) : (
                        <Badge className="w-11 rounded-3xl" variant="success">
                          <IoCheckmarkCircleOutline size={24} />
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <BsLayoutTextWindow
                        className="cursor-pointer"
                        size={24}
                        onClick={() => handleDetailPatient(patient.id)}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          ) : (
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-[80%] h-[20px] ml-8 rounded-xl" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[80%] h-[20px] ml-8 rounded-xl" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[80%] h-[20px] ml-8 rounded-xl" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[80%] h-[20px] ml-8 rounded-xl" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[80%] h-[20px] ml-8 rounded-xl" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  )
}
