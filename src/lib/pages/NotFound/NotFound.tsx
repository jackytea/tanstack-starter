import { m as localize } from '@/i18n/compiled/messages'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'

const NotFound = () => {
  return (
    <AppLayout>
      <div className="flex h-full w-full items-center justify-center">{localize.notFound()}</div>
    </AppLayout>
  )
}

export { NotFound }
