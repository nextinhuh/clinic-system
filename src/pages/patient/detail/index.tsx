import { useParams } from 'react-router-dom'
import { PatientCard } from './components/PatientCard'
import { useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnamnesisCard } from './components/AnamnesisCard'
import { patientById } from '@/service/patient.service'
import { PatientData } from '@/utils/types'
import { toast } from '@/components/ui/use-toast'
import { Badge } from '@/components/ui/badge'

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
      if (patientId) {
        setIsLoading(true)
        setPatientData(await patientById(patientId))
        setIsLoading(false)
      }
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
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">Detalhes do Paciente</h1>
        <Badge
          variant={patientData?.active ? 'active' : 'desactive'}
          className="text-lg"
        >
          {patientData?.active ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>

      <div className="flex flex-col w-[100%] border rounded-lg p-8 mt-8 items-center justify-center">
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
              isLoadingPatient={isLoading}
            />
          </TabsContent>
          <TabsContent value="anamnesisDetail">
            <AnamnesisCard patientData={patientData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
