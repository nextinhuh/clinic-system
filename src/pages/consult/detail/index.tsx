import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { consultById } from '@/service/consult.service'
import { patientById } from '@/service/patient.service'
import { ConsultData, PatientData } from '@/utils/types'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ConsultCard } from './components/ConsultCard'

export function ConsultDetail() {
  const { consultId } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [consultData, setConsultData] = useState<ConsultData>()
  const [patientData, setPatientData] = useState<PatientData>()
  const [tabValue, setTabValue] = useState<string>('consultDetail')

  function handleChangeTabValue(newValue: string): void {
    setTabValue(newValue)
  }

  useMemo(async () => {
    try {
      if (consultId) {
        setIsLoading(true)
        const consultData = await consultById(consultId)
        setConsultData(consultData)
        setPatientData(await patientById(consultData.patientId))
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
        <h1 className="text-3xl font-bold">Detalhes da Consulta</h1>
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
              onClick={() => handleChangeTabValue('consultDetail')}
              value="consultDetail"
            >
              Detalhes da consulta
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTabValue('patientDetail')}
              value="patientDetail"
            >
              Detalhes da anamnese
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="consultDetail"
            className="flex items-center justify-center"
          >
            <ConsultCard
              consultData={consultData}
              patientData={patientData}
              isLoadingData={isLoading}
            />
          </TabsContent>
          <TabsContent value="patientDetail"></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
