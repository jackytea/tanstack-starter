import { createFileRoute, redirect } from '@tanstack/react-router'

import { APP } from '@/constants/app.constants'
import { PAGE } from '@/constants/page.constants'
import { ROUTES } from '@/constants/route.constants'
import { LoadingScreen } from '@/pages/LoadingScreen/LoadingScreen'
import { Profile } from '@/pages/Profile/Profile'
import { getAccount } from '@/services/accounts.service'

const ProfilePage = () => {
  const { account } = Route.useLoaderData()

  return <Profile account={account} />
}

export const Route = createFileRoute('/profile')({
  head: () => ({
    meta: [{ title: `${APP.NAME} | Profile` }]
  }),
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: ROUTES.AUTH })
    }
  },
  pendingComponent: () => {
    return <LoadingScreen />
  },
  loader: async () => {
    return { account: await getAccount() }
  },
  component: ProfilePage,
  pendingMinMs: PAGE.PENDING_MIN_MS,
  pendingMs: PAGE.PENDING_MS,
  preload: true,
  ssr: true
})
