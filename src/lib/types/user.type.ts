import { users } from '@/database/schemas/user.schema'

type User = typeof users.$inferSelect
type UserWithAccount = User & { accountId: string }

export type { UserWithAccount }
