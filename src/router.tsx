import '@/i18n'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'

import { ErrorBoundary } from '@/pages/ErrorBoundary/ErrorBoundary'
import { NotFound } from '@/pages/NotFound/NotFound'
import { routeTree } from '@/routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        refetchOnWindowFocus: true
      }
    }
  })

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      scrollRestoration: true,
      defaultPreload: 'intent',
      defaultPreloadStaleTime: 0,
      defaultStructuralSharing: true,
      context: { queryClient, user: null },
      defaultNotFoundComponent: NotFound,
      defaultErrorComponent: ErrorBoundary
    }),
    queryClient
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
