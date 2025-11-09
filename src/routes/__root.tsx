import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, HeadContent, Outlet, ScriptOnce, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { rootThemeScript } from '@/components/ThemeToggle/ThemeToggle.utils'
import { APP } from '@/constants/app.constants'
import { QUERY_KEYS } from '@/constants/query.constants'
import { ErrorBoundary } from '@/pages/ErrorBoundary/ErrorBoundary'
import { NotFound } from '@/pages/NotFound/NotFound'
import { getCurrentSession } from '@/services/auth.service'
import appCss from '@/styles/index.css?url'
import { UserWithAccount } from '@/types/user.type'

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { i18n } = useTranslation()

  return (
    <html lang={i18n.language} suppressHydrationWarning suppressContentEditableWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>{rootThemeScript}</ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

const RootComponent = () => {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  user: Awaited<ReturnType<typeof getCurrentSession>>
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: [QUERY_KEYS.AUTH],
      queryFn: ({ signal }) => getCurrentSession({ signal })
    })

    return { user } as { user: UserWithAccount | null }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        httpEquiv: 'Content-Type',
        content: 'text/html;charset=utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'description',
        content: 'TanStack Start template.'
      },
      {
        name: 'theme-color',
        content: '#000000'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: import.meta.env.VITE_BASE_URL as string
      },
      {
        property: 'og:title',
        content: 'TanStack Start template.'
      },
      {
        property: 'og:site_name',
        content: import.meta.env.VITE_BASE_URL as string
      },
      {
        property: 'og:description',
        content: 'TanStack Start template.'
      },
      {
        property: 'og:image',
        content: `${import.meta.env.VITE_BASE_URL as string}/card.png`
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:url',
        content: import.meta.env.VITE_BASE_URL as string
      },
      {
        property: 'twitter:title',
        content: 'Example'
      },
      {
        property: 'twitter:description',
        content: 'TanStack Start template.'
      },
      {
        property: 'twitter:image',
        content: `${import.meta.env.VITE_BASE_URL as string}/card.png`
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${import.meta.env.VITE_BASE_URL as string}/favicon.ico`
      },
      {
        title: APP.NAME
      }
    ],
    links: [{ rel: 'stylesheet', href: appCss }]
  }),
  errorComponent: () => {
    return <ErrorBoundary />
  },
  notFoundComponent: () => {
    return <NotFound />
  },
  component: RootComponent
})
