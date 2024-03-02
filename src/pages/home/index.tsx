import { CardContainer } from '@/components/card-container'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { APPOINTMENT_CHART_OPTIONS } from '@/config/appointment-chart.config'
import { APPOINTMENT_CHART_SERIES } from '@/utils/moks'
import { getActualDate } from '@/utils/parse'

import Chart from 'react-apexcharts'

export function Home() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Início</h1>
        <p className="text-[10px] mt-2 sm:text-xs sm:mt-0">
          Atualizado em: {getActualDate()}
        </p>
      </div>

      <CardContainer />

      <div className="flex flex-col justify-between gap-4 mt-10 xl:flex-row">
        <div className="border w-[100%] rounded-lg p-4">
          <h1 className="font-bold">Consultas no mês</h1>
          <Chart
            options={APPOINTMENT_CHART_OPTIONS}
            series={APPOINTMENT_CHART_SERIES}
            type="area"
            height={300}
            width="100%"
          />
        </div>

        <div className="w-[100%] border rounded-lg p-6">
          <h1 className="font-bold mb-4">Lista das últimas consultas</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data da consulta</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Qtd. retorno</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">20/02/2024</TableCell>
                <TableCell>Aguardando retorno</TableCell>
                <TableCell>2</TableCell>
                <TableCell className="text-right">R$ 250,00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
