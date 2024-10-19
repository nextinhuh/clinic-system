import { TableDefsProps } from '@/components/table-simple'
import { PatientData } from '@/utils/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<PatientData>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
]

export const patientTableDefs: TableDefsProps[] = [
  {
    tableRowKey: 'name',
    tableColumnName: 'Nome',
    tableColumnType: 'text',
  },
  {
    tableRowKey: 'age',
    tableColumnName: 'Idade',
    tableColumnType: 'text',
  },
  {
    tableRowKey: 'active',
    tableColumnName: 'Habilitado',
    tableColumnType: 'active',
  },
  {
    tableRowKey: 'anamnesisId',
    tableColumnName: 'Anamnese',
    tableColumnType: 'pacientAnamnesisStatus',
  },
  {
    tableRowKey: 'details',
    tableColumnName: 'Detalhes',
    tableColumnType: 'detail',
  },
]

export const consultTableDefs: TableDefsProps[] = [
  {
    tableRowKey: 'patientName',
    tableColumnName: 'Nome',
    tableColumnType: 'text',
  },
  {
    tableRowKey: 'date',
    tableColumnName: 'Data da consulta',
    tableColumnType: 'date',
  },
  {
    tableRowKey: 'status',
    tableColumnName: 'Status da consulta',
    tableColumnType: 'text',
  },
  {
    tableRowKey: 'anamnesisId',
    tableColumnName: 'Anamnese',
    tableColumnType: 'pacientAnamnesisStatus',
  },
  {
    tableRowKey: 'details',
    tableColumnName: 'Detalhes',
    tableColumnType: 'detail',
  },
]
