import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'

const LoadingScreen = () => {
  return (
    <AppLayout>
      <div className="flex size-full flex-col items-center justify-center">
        <LoadingSpinner className="my-8 size-32 animate-spin" />
      </div>
    </AppLayout>
  )
}

export { LoadingScreen }
