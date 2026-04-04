import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'
import { users } from '@/database/schemas/user.schema'
import { deleteRecords } from '@/database/utils/database.utils'
import { DatabaseOptions } from '@/types/database.type'

const deleteUsers = <ReturnedFields extends SelectedFieldsFlat>(
  options: DatabaseOptions = {} as DatabaseOptions,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return deleteRecords(users, options, returnedFields)
}

export { deleteUsers }
