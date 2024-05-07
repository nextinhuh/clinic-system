import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getActualDate } from '@/utils/parse'
import { ScheduleAppointmentSchemaData } from '@/utils/types'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { BsLayoutTextWindow } from 'react-icons/bs'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const Schedule = () => {
  const navigate = useNavigate()
  const [schedulesList, setSchedulesList] = useState<
    ScheduleAppointmentSchemaData[]
  >([])

  function handleCreateSchedule() {
    navigate('/schedule/create')
  }

  function handleDetailSchedule(scheduleId: string | null) {
    navigate(`/schedules/${scheduleId}`)
  }

  useMemo(async () => {
    setSchedulesList([])
  }, [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agendamentos</h1>
        <p className="text-[10px] mt-2 sm:text-xs sm:mt-0">
          Atualizado em: {getActualDate()}
        </p>
      </div>
      <div className="w-[100%] border rounded-lg p-8 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold mb-4">Lista de agendamentos</h1>
          <Button onClick={handleCreateSchedule} variant="outline">
            Novo agendamnto
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          {schedulesList.length !== 0 ? (
            <TableBody>
              {schedulesList.map((schedule) => {
                return (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium text-center">
                      {schedule.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {format(schedule.date, 'dd/MM/yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell className="text-center">
                      {schedule.id === '' ? (
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
                        onClick={() => handleDetailSchedule(schedule.id)}
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
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  )
}
