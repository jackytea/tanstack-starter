import { createServerFn } from '@tanstack/react-start'
import { deleteAccountController, getAccountController } from '@/controllers/accounts.controller'
import { authMiddleware } from '@/middleware/auth.middleware'

const getAccount = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return getAccountController(context.user.accountId)
  })

const deleteAccount = createServerFn({
  method: 'POST'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return deleteAccountController(context.user.accountId, context.user.id)
  })

export { deleteAccount, getAccount }
