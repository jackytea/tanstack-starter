import { createServerFn } from '@tanstack/react-start'
import { getUserController } from '@/controllers/users.controller'
import { authMiddleware } from '@/middleware/auth.middleware'

const getUser = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return getUserController(context.user.id, context.user.accountId)
  })

export { getUser }
