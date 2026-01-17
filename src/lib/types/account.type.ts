import { accounts } from '@/database/schemas/account.schema'

type Account = typeof accounts.$inferSelect
type AccountPayload = typeof accounts.$inferInsert

export type { Account, AccountPayload }
