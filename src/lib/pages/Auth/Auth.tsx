import { useRouter } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { loginWithSocialProvider, logoutSession } from '@/auth/utils/auth.utils'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { APP } from '@/constants/app.constants'
import { m as localize } from '@/i18n/compiled/messages'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'
import { socialLoginButtons } from '@/pages/Auth/Auth.utils'
import { Route as RootRoute } from '@/routes/__root'
import type { AuthProvider } from '@/types/auth.type'
import { Button } from '@/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'

const Auth = () => {
  const router = useRouter()
  const { user, queryClient } = RootRoute.useRouteContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSocialLogin = async (provider: AuthProvider) => {
    try {
      setIsLoading(true)
      await loginWithSocialProvider(provider)
    } catch {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogout = async () => {
    try {
      setIsLoading(true)
      await logoutSession(router, queryClient)
    } catch {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const renderLoginButtons = () => {
    return user ? (
      <Button variant="outline" className="w-full cursor-pointer" onClick={handleSocialLogout}>
        <div className="flex items-center justify-center gap-2">
          <LogOut className="h-4 w-4" />
          <span>{localize.signOut()}</span>
        </div>
      </Button>
    ) : (
      <>
        {socialLoginButtons.map((socialLoginButton) => (
          <Button
            variant="outline"
            key={socialLoginButton.provider}
            className="w-full cursor-pointer p-5"
            disabled={socialLoginButton.disabled}
            onClick={() => handleSocialLogin(socialLoginButton.provider as AuthProvider)}
          >
            <div className="flex items-center justify-center gap-2">
              {socialLoginButton.icon}
              <span>{localize.loginWith({ authProvider: socialLoginButton.text })}</span>
            </div>
          </Button>
        ))}
      </>
    )
  }

  return (
    <AppLayout>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full flex-col gap-6 sm:w-96">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{localize.welcomeTo({ appName: APP.NAME })}</CardTitle>
              <CardDescription>{user ? localize.youAreLoggedIn() : localize.loginToGetStarted()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid h-40 w-full gap-6">
                <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                  {isLoading ? <LoadingSpinner className="h-12 w-12 animate-spin" /> : renderLoginButtons()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

export { Auth }
