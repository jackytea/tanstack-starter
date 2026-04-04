import { accounts } from '@/database/schemas/account.schema'

type AccountPayload = typeof accounts.$inferInsert

export type { AccountPayload }
