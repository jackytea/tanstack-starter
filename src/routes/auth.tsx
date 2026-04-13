import { createFileRoute } from '@tanstack/react-router'

import { APP } from '@/constants/app.constants'
import { PAGE } from '@/constants/page.constants'
import { Auth } from '@/pages/Auth/Auth'
import { LoadingScreen } from '@/pages/LoadingScreen/LoadingScreen'

const AuthPage = () => {
  return <Auth />
}

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [{ title: `${APP.NAME} | Login` }]
  }),
  pendingComponent: () => {
    return <LoadingScreen />
  },
  component: AuthPage,
  pendingMinMs: PAGE.PENDING_MIN_MS,
  pendingMs: PAGE.PENDING_MS,
  preload: true,
  ssr: true
})
