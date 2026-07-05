import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'

import { auth } from '@/auth/config/auth.config'
import { ROUTES } from '@/constants/route.constants'

const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  const { headers } = request

  const session = await auth.api.getSession({
    headers
  })

  if (!session) {
    setResponseStatus(401)
    throw redirect({ to: ROUTES.AUTH })
  }

  return next({
    context: { user: { ...session.user, accountId: session.session.accountId } }
  })
})

export { authMiddleware }
