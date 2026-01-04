import { createServerFn } from '@tanstack/react-start'
import {
  deleteAccountController,
  getAccountController,
  getAccountsByUserIdController,
  getAccountsController,
  updateAccountController
} from '@/controllers/accounts.controller'
import { deleteUserController } from '@/controllers/users.controller'
import { authMiddleware } from '@/middleware/auth.middleware'

const getAccounts = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return getAccountsController(context.user.accountId)
  })

const getAccount = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return getAccountController(context.user.accountId)
  })

const updateAccount = createServerFn({
  method: 'POST'
})
  .middleware([authMiddleware])
  .inputValidator((data: { activeOrganizationId: string }) => data)
  .handler(async ({ context, data }) => {
    return updateAccountController(context.user.accountId, context.user.id, {
      activeOrganizationId: data.activeOrganizationId
    })
  })

const deleteAccount = createServerFn({
  method: 'POST'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const accounts = await getAccountsByUserIdController(context.user.id)

    return accounts.length <= 1
      ? deleteUserController(context.user.id)
      : deleteAccountController(context.user.accountId)
  })

export { deleteAccount, getAccount, getAccounts, updateAccount }
