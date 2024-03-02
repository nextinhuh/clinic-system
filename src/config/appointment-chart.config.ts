import { ApexOptions } from 'apexcharts'
import tailwindColors from 'tailwindcss/colors'

export const APPOINTMENT_CHART_OPTIONS: ApexOptions = {
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
