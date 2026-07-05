import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { auth } from '@/auth/config/auth.config'

const getCurrentSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { headers } = getRequest()!

    const session = await auth.api.getSession({
      headers,
      query: {
        disableCookieCache: true
      }
    })

    return session?.user
      ? { ...session.user, accountId: session.session.accountId }
      : null
  }
)

export { getCurrentSession }
