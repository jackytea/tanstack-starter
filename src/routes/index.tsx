import { createFileRoute } from '@tanstack/react-router'

import { APP } from '@/constants/app.constants'
import { PAGE } from '@/constants/page.constants'
import { Home } from '@/pages/Home/Home'
import { LoadingScreen } from '@/pages/LoadingScreen/LoadingScreen'

const HomePage = () => {
  return <Home />
}

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: `${APP.NAME} | Home` }]
  }),
  pendingComponent: () => {
    return <LoadingScreen />
  },
  component: HomePage,
  pendingMinMs: PAGE.PENDING_MIN_MS,
  pendingMs: PAGE.PENDING_MS,
  preload: true,
  ssr: true
})
