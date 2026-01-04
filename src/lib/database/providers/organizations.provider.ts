import { SelectedFields } from 'drizzle-orm/pg-core'
import { organizations } from '@/database/schema/organization.schema'
import { selectRecords } from '@/database/utils/database.utils'
import { DatabaseOptions } from '@/types/database.type'

const selectOrganizations = <Select extends SelectedFields>(
  select: Select = {} as Select,
  options: DatabaseOptions = {} as DatabaseOptions
) => {
  return selectRecords(organizations, select, options)
}

export { selectOrganizations }
