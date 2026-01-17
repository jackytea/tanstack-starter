import { sql } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { UUID_V7_GENERATOR_FUNCTION } from '@/constants/database.constants'

const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql.raw(UUID_V7_GENERATOR_FUNCTION)),
  image: text('image'),
  name: text('name').notNull(),
  description: text('description'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
})

export { users }
