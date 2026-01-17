import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { UUID_V7_GENERATOR_FUNCTION } from '@/constants/database.constants'

const verifications = pgTable('verifications', {
  id: uuid('id').primaryKey().default(sql.raw(UUID_V7_GENERATOR_FUNCTION)),
  value: text('value').notNull(),
  identifier: text('identifier').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
})

export { verifications }
