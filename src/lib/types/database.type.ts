import type { SQL } from 'drizzle-orm'
import type { PgColumn } from 'drizzle-orm/pg-core'

type DatabaseOptions = {
  where?: SQL<unknown>
  pagination?: { limit: number; offset: number }
  orderBy?: PgColumn | SQL<unknown> | SQL.Aliased
}

export type { DatabaseOptions }
