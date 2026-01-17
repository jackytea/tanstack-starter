import { sessions } from '@/database/schemas/session.schema'

type Session = typeof sessions.$inferSelect
type SessionPayload = typeof sessions.$inferInsert

export type { Session, SessionPayload }
