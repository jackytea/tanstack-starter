import { database } from '@/database/config/database.config'
import type { DatabaseOptions } from '@/types/database.type'
import { and, type InferInsertModel, type SQL } from 'drizzle-orm'
import type {
  PgTable,
  SelectedFields,
  SelectedFieldsFlat,
  TableConfig
} from 'drizzle-orm/pg-core'

const mergeAndClauses = (
  first: SQL<unknown>,
  second: SQL<unknown>,
  ...rest: SQL<unknown>[]
): SQL<unknown> => {
  return and(first, second, ...rest) as SQL<unknown>
}

const selectRecords = <
  Select extends SelectedFields,
  Table extends TableConfig
>(
  table: PgTable<Table>,
  select: Select = {} as Select,
  options: DatabaseOptions = {} as DatabaseOptions
) => {
  return ((query) => {
    if (options.where) {
      query.where(options.where)
    }

    if (options.orderBy) {
      query.orderBy(options.orderBy)
    }

    if (options.pagination) {
      query.limit(options.pagination.limit).offset(options.pagination.offset)
    }

    return query
  })(database.select(select).from(table))
}

const updateRecords = <
  ReturnedFields extends SelectedFieldsFlat,
  Table extends TableConfig
>(
  table: PgTable<Table>,
  data: Partial<InferInsertModel<PgTable<Table>>>,
  where: SQL<unknown>,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return database.update(table).set(data).where(where).returning(returnedFields)
}

const deleteRecords = <
  ReturnedFields extends SelectedFieldsFlat,
  Table extends TableConfig
>(
  table: PgTable<Table>,
  where: SQL<unknown>,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return database.delete(table).where(where).returning(returnedFields)
}

export { deleteRecords, mergeAndClauses, selectRecords, updateRecords }
