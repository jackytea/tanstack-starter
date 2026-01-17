import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { UUID_V7_GENERATOR_FUNCTION } from '@/constants/database.constants'
import { accounts } from '@/database/schemas/account.schema'
import { organizations } from '@/database/schemas/organization.schema'
import { users } from '@/database/schemas/user.schema'

const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().default(sql.raw(UUID_V7_GENERATOR_FUNCTION)),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
  accountId: uuid('account_id').references(() => accounts.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
  activeOrganizationId: uuid('active_organization_id').references(() => organizations.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
})

export { sessions }
