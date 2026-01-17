import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { UUID_V7_GENERATOR_FUNCTION } from '@/constants/database.constants'
import { organizations } from '@/database/schemas/organization.schema'
import { users } from '@/database/schemas/user.schema'

const members = pgTable('members', {
  id: uuid('id').primaryKey().default(sql.raw(UUID_V7_GENERATOR_FUNCTION)),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, { onUpdate: 'cascade', onDelete: 'cascade' })
})

export { members }
