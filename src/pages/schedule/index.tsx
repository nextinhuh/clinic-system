import { getActualDate } from '@/utils/parse'
import { PatientData, ScheduleAppointmentSchemaData } from '@/utils/types'
import { useMemo, useRef, useState } from 'react'
import {
  CreateScheduleDialog,
  CreateScheduleDialogRef,
} from './create-schedule-dialog'
import { Button } from '@/components/ui/button'
import { allSchedules } from '@/service/schedule.service'
import { useAuth } from '@/hook/Auth'
import {
  DetailScheduleDialog,
  DetailScheduleDialogRef,
} from './detail-schedule-dialog'
import { TableSimple } from '@/components/table-simple'
import { scheduleTableDefs } from './components/columns'
import { allPatient } from '@/service/patient.service'

export const Schedule = () => {
  const { user } = useAuth()
  const createScheduleDialogRef = useRef<CreateScheduleDialogRef>(null)
  const detailScheduleDialogRef = useRef<DetailScheduleDialogRef>(null)
  const [loadingList, setLoadingList] = useState<boolean>(false)
  const [patientsList, setPatientsList] = useState<PatientData[]>([])

  const [schedulesList, setSchedulesList] = useState<
    ScheduleAppointmentSchemaData[]
  >([])

  useMemo(async () => {
    await handleGetSchedules()
    setPatientsList(await allPatient(user?.id))
  }, [])

  async function handleGetSchedules() {
    setLoadingList(true)
    setSchedulesList(await allSchedules(user.id))
    setLoadingList(false)
  }

  return (
    <div className="p-8">
      <CreateScheduleDialog
        updateSchedulesList={handleGetSchedules}
        patientsList={patientsList}
        ref={createScheduleDialogRef}
      />
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

        <TableSimple<ScheduleAppointmentSchemaData>
          listData={schedulesList}
          tableDefs={scheduleTableDefs}
          isFetiching={loadingList}
          customDetailCallback={(data) =>
            detailScheduleDialogRef.current?.handleOpenDialog(data)
          }
        />
      </div>
    </div>
  )
}
