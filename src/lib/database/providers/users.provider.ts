import { users } from '@/database/schemas/user.schema'
import { deleteRecords } from '@/database/utils/database.utils'
import type { SQL } from 'drizzle-orm'
import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

const deleteUsers = <ReturnedFields extends SelectedFieldsFlat>(
  where: SQL<unknown>,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return deleteRecords(users, where, returnedFields)
}

export { deleteUsers }
