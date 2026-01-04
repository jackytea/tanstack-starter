import { getAccountController, getAccountsController } from '@/controllers/accounts.controller'
import type { ArrayElement } from '@/types/array.type'

type AccountWithImage = Awaited<Promise<ReturnType<typeof getAccountController>>>
type AccountWithUser = ArrayElement<Awaited<Promise<ReturnType<typeof getAccountsController>>>>

export type { AccountWithImage, AccountWithUser }
