import { Badge } from '@/components/ui/badge'
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
import { format, isPast } from 'date-fns'
import { useMemo, useRef, useState } from 'react'
import { BsLayoutTextWindow } from 'react-icons/bs'
import {
  CreateScheduleDialog,
  CreateScheduleDialogRef,
} from './create-schedule-dialog'
import { Button } from '@/components/ui/button'
import { getSchedules } from '@/service/schedule.service'
import { useAuth } from '@/hook/Auth'
import { ptBR } from 'date-fns/locale'
import {
  DetailScheduleDialog,
  DetailScheduleDialogRef,
} from './detail-schedule-dialog'

export const Schedule = () => {
  const { user } = useAuth()
  const createScheduleDialogRef = useRef<CreateScheduleDialogRef>(null)
  const detailScheduleDialogRef = useRef<DetailScheduleDialogRef>(null)
  const [schedulesList, setSchedulesList] = useState<
    ScheduleAppointmentSchemaData[]
  >([])

  useMemo(async () => {
    setSchedulesList(await getSchedules(user.id))
  }, [])

  function HandleStatus(
    date: Date,
    consultId: string,
  ): 'success' | 'destructive' | 'warning' {
    if (consultId) {
      return 'success'
    } else if (isPast(date)) {
      return 'destructive'
    } else {
      return 'warning'
    }
  }

  return (
    <div className="p-8">
      <CreateScheduleDialog ref={createScheduleDialogRef} />
      <DetailScheduleDialog ref={detailScheduleDialogRef} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agendamentos</h1>
        <p className="text-[10px] mt-2 sm:text-xs sm:mt-0">
          Atualizado em: {getActualDate()}
        </p>
      </div>
      <div className="w-[100%] border rounded-lg p-8 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold mb-4">Lista de agendamentos</h1>
          <Button
            onClick={() => createScheduleDialogRef.current?.handleOpenDialog()}
            variant="outline"
          >
            Novo agendamento
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
                      {schedule.patientName}
                    </TableCell>
                    <TableCell className="text-center">
                      {format(schedule.date, 'PPPP', {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className="w-11 rounded-3xl"
                        variant={HandleStatus(
                          schedule.date,
                          schedule.consultId,
                        )}
                      />
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <BsLayoutTextWindow
                        className="cursor-pointer"
                        size={24}
                        onClick={() =>
                          detailScheduleDialogRef.current?.handleOpenDialog(
                            schedule,
                          )
                        }
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
                  <TableCell className="flex justify-center">
                    <Skeleton className="w-[10%] h-[20px] mx-4 rounded-xl" />
                    <Skeleton className="w-[10%] h-[20px] mx-4 rounded-xl" />
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
