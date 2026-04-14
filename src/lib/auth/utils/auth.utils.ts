import type { QueryClient } from '@tanstack/react-query'
import { default as authClient } from '@/auth/client/auth.instance'
import { QUERY_KEYS } from '@/constants/query.constants'
import { ROUTES } from '@/constants/route.constants'
import type { AuthProvider } from '@/types/auth.type'
import type { TanstackUseRouter } from '@/types/router.type'
import { destroySession } from '@/utils/browser.utils'

const loginWithSocialProvider = async (provider: AuthProvider) => {
  const { error } = await authClient.signIn.social({
    provider,
    callbackURL: ROUTES.HOME
  })

  if (error) {
    throw new Error('[AUTH ERROR]: Unable to sign in.', { cause: error.status })
  }

  return error === null
}

const logoutSession = async (router: TanstackUseRouter, queryClient: QueryClient) => {
  const { error } = await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        destroySession()

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.AUTH]
        })

        router.invalidate()
        router.navigate({ to: ROUTES.AUTH })
      }
    }
  })

  return error === null
}

export { loginWithSocialProvider, logoutSession }
