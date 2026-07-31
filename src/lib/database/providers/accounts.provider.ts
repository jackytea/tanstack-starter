import { accounts } from '@/database/schemas/account.schema'
import {
  deleteRecords,
  selectRecords,
  updateRecords
} from '@/database/utils/database.utils'
import { AccountPayload } from '@/types/account.type'
import { DatabaseOptions } from '@/types/database.type'
import type { SQL } from 'drizzle-orm'
import { SelectedFields, SelectedFieldsFlat } from 'drizzle-orm/pg-core'

const selectAccounts = <Select extends SelectedFields>(
  select: Select = {} as Select,
  options: DatabaseOptions = {} as DatabaseOptions
) => {
  return selectRecords(accounts, select, options)
}

const updateAccounts = <ReturnedFields extends SelectedFieldsFlat>(
  data: Omit<Partial<AccountPayload>, 'id' | 'userId'>,
  where: SQL<unknown>,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return updateRecords(accounts, data, where, returnedFields)
}

const deleteAccounts = <ReturnedFields extends SelectedFieldsFlat>(
  where: SQL<unknown>,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return deleteRecords(accounts, where, returnedFields)
}

export { deleteAccounts, selectAccounts, updateAccounts }
