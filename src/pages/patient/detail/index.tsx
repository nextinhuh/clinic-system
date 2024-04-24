import { useParams } from 'react-router-dom'
import { PatientCard } from './components/PatientCard'
import { useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnamnesisCard } from './components/AnamnesisCard'
import { patientById } from '@/service/patient.service'
import { PatientData } from '@/utils/types'
import { patientSchema } from '@/utils/schemas'
import { toast } from '@/components/ui/use-toast'

export function DetailPatient() {
  const { patientId } = useParams()
  const [tabValue, setTabValue] = useState<string>('patientDetail')
  const [patientData, setPatientData] = useState<PatientData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleChangeTabValue(newValue: string): void {
    setTabValue(newValue)
  }

  useMemo(async () => {
    try {
      if (!patientId) return
      setIsLoading(true)
      setPatientData(await patientById(patientId))
      setIsLoading(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `${(error as Error).message}`,
        duration: 3000, // 3 SECONDS
      })
    }
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Adicionar Paciente</h1>

      <div className="flex flex-col w-[100%] border rounded-lg p-8 mt-8 flex items-center justify-center">
        <Tabs value={tabValue} className="w-[100%]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              onClick={() => handleChangeTabValue('patientDetail')}
              value="patientDetail"
            >
              Detalhes do paciente
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTabValue('anamnesisDetail')}
              value="anamnesisDetail"
            >
              Detalhes da anamnese
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="patientDetail"
            className="flex items-center justify-center"
          >
            <PatientCard
              patientData={patientData}
              isLoadingpatient={isLoading}
            />
          </TabsContent>
          <TabsContent value="anamnesisDetail">
            <AnamnesisCard patientId={patientId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
