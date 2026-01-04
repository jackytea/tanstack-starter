import { SelectedFields, SelectedFieldsFlat } from 'drizzle-orm/pg-core'
import { users } from '@/database/schema/user.schema'
import { deleteRecords, selectRecords } from '@/database/utils/database.utils'
import { DatabaseOptions } from '@/types/database.type'

const selectUsers = <Select extends SelectedFields>(
  select: Select = {} as Select,
  options: DatabaseOptions = {} as DatabaseOptions
) => {
  return selectRecords(users, select, options)
}

const deleteUsers = <ReturnedFields extends SelectedFieldsFlat>(
  options: DatabaseOptions = {} as DatabaseOptions,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return deleteRecords(users, options, returnedFields)
}

export { deleteUsers, selectUsers }
