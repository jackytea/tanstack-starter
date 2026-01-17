import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { UUID_V7_GENERATOR_FUNCTION } from '@/constants/database.constants'

const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().default(sql.raw(UUID_V7_GENERATOR_FUNCTION)),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  logo: text('name'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
})

export { organizations }
