import { getAccountController } from '@/controllers/accounts.controller'

type AccountWithImage = Awaited<Promise<ReturnType<typeof getAccountController>>>

export type { AccountWithImage }
