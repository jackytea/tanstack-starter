import { m as localize } from '@/i18n/compiled/messages'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'
import { Route as RootRoute } from '@/routes/__root'

const Home = () => {
  const { user } = RootRoute.useRouteContext()

  return (
    <AppLayout>
      <div className="flex size-full flex-col items-center justify-center">
        <h1 className="mb-3 text-2xl font-black">
          🏝️{' '}
          {user ? localize.welcome({ username: user.name }) : localize.hello()}{' '}
          🏝️
        </h1>
      </div>
    </AppLayout>
  )
}

export { Home }
