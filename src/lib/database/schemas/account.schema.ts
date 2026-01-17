import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { UUID_V7_GENERATOR_FUNCTION } from '@/constants/database.constants'
import { organizations } from '@/database/schemas/organization.schema'
import { users } from '@/database/schemas/user.schema'

const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().default(sql.raw(UUID_V7_GENERATOR_FUNCTION)),
  name: text('name'),
  image: text('image'),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'),
  description: text('description'),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
  activeOrganizationId: uuid('active_organization_id').references(() => organizations.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
})

export { accounts }
