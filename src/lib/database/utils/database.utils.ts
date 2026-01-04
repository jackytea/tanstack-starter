import type { InferInsertModel } from 'drizzle-orm'
import type { PgTable, SelectedFields, SelectedFieldsFlat, TableConfig } from 'drizzle-orm/pg-core'
import { database } from '@/database/config/database.config'
import type { DatabaseOptions } from '@/types/database.type'

const selectRecords = <Select extends SelectedFields, Table extends TableConfig>(
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

const insertRecords = <ReturnedFields extends SelectedFieldsFlat, Table extends TableConfig>(
  table: PgTable<Table>,
  data: InferInsertModel<PgTable<Table>>[],
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return database.insert(table).values(data).returning(returnedFields)
}

const updateRecords = <ReturnedFields extends SelectedFieldsFlat, Table extends TableConfig>(
  table: PgTable<Table>,
  data: Partial<InferInsertModel<PgTable<Table>>>,
  options: DatabaseOptions = {} as DatabaseOptions,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return database.update(table).set(data).where(options.where).returning(returnedFields)
}

const deleteRecords = <ReturnedFields extends SelectedFieldsFlat, Table extends TableConfig>(
  table: PgTable<Table>,
  options: DatabaseOptions = {} as DatabaseOptions,
  returnedFields: ReturnedFields = {} as ReturnedFields
) => {
  return database.delete(table).where(options.where).returning(returnedFields)
}

export { deleteRecords, insertRecords, selectRecords, updateRecords }
