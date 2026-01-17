import { createServerOnlyFn } from '@tanstack/react-start'
import { config as dotEnvConfig } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'

import { accounts } from '@/database/schemas/account.schema'
import { members } from '@/database/schemas/member.schema'
import { organizations } from '@/database/schemas/organization.schema'
import { sessions } from '@/database/schemas/session.schema'
import { users } from '@/database/schemas/user.schema'
import { verifications } from '@/database/schemas/verification.schema'

dotEnvConfig({ quiet: true })

const database = createServerOnlyFn(() =>
  drizzle(process.env.DATABASE_URL as string, {
    schema: { accounts, sessions, users, verifications, organizations, members }
  })
)()

export { database }
