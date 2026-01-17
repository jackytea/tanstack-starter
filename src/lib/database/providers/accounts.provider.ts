import { SelectedFields, SelectedFieldsFlat } from 'drizzle-orm/pg-core'
import { accounts } from '@/database/schemas/account.schema'
import { deleteRecords, selectRecords, updateRecords } from '@/database/utils/database.utils'
import { AccountPayload } from '@/types/account.type'
import { DatabaseOptions } from '@/types/database.type'

const selectAccounts = <Select extends SelectedFields>(
  select: Select = {} as Select,
  options: DatabaseOptions = {} as DatabaseOptions
) => {
  return selectRecords(accounts, select, options)
}

const updateAccounts = <ReturnedFields extends SelectedFieldsFlat>(
  data: Omit<Partial<AccountPayload>, 'id' | 'userId'>,
  options: DatabaseOptions = {} as DatabaseOptions,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return updateRecords(accounts, data, options, returnedFields)
}

const deleteAccounts = <ReturnedFields extends SelectedFieldsFlat>(
  options: DatabaseOptions = {} as DatabaseOptions,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return deleteRecords(accounts, options, returnedFields)
}

export { deleteAccounts, selectAccounts, updateAccounts }
