import { CardContainer } from '@/components/card-container'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { format } from 'date-fns'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import tailwindColors from 'tailwindcss/colors'

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: tailwindColors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: tailwindColors.gray[600],
    },
    axisTicks: {
      color: tailwindColors.gray[600],
    },
    categories: [
      '2021-03-18T-00:00:00.000Z',
      '2021-03-19T-00:00:00.000Z',
      '2021-03-20T-00:00:00.000Z',
      '2021-03-21T-00:00:00.000Z',
      '2021-03-22T-00:00:00.000Z',
      '2021-03-23T-00:00:00.000Z',
      '2021-03-24T-00:00:00.000Z',
      '2021-03-25T-00:00:00.000Z',
      '2021-03-26T-00:00:00.000Z',
      '2021-03-27T-00:00:00.000Z',
      '2021-03-28T-00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109, 53, 68, 10, 86] },
]

export function Home() {
  function getActualDate() {
    return format(new Date(), 'dd/MM/yyyy HH:mm:ss')
  }

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
            options={options}
            series={series}
            type="area"
            height={300}
            width="100%"
          />
        </div>

        <div className="w-[100%] border rounded-lg p-2">
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
