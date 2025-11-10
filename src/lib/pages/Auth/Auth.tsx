import { useRouter } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { loginWithSocialProvider, logoutSession } from '@/auth/utils/auth.utils'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { APP } from '@/constants/app.constants'
import { AUTH_PROVIDERS } from '@/constants/auth.constants'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'
import { Route as RootRoute } from '@/routes/__root'
import type { AuthProvider, AuthProviderWithEmail } from '@/types/auth.type'
import { Button } from '@/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'

const socialLoginButtons = [
  {
    disabled: false,
    provider: AUTH_PROVIDERS.GOOGLE,
    text: 'Google',
    icon: (
      <svg
        width="800px"
        height="800px"
        viewBox="-0.5 0 48 48"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Color-" transform="translate(-401.000000, -860.000000)">
            <g id="Google" transform="translate(401.000000, 860.000000)">
              <path
                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                id="Fill-1"
                fill="#FBBC05"
              ></path>
              <path
                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                id="Fill-2"
                fill="#EB4335"
              ></path>
              <path
                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                id="Fill-3"
                fill="#34A853"
              ></path>
              <path
                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                id="Fill-4"
                fill="#4285F4"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    )
  },
  {
    disabled: false,
    provider: AUTH_PROVIDERS.GITHUB,
    text: 'GitHub',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    disabled: false,
    provider: AUTH_PROVIDERS.DISCORD,
    text: 'Discord',
    icon: (
      <svg
        width="800px"
        height="800px"
        viewBox="0 -28.5 256 256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
            fill="#5865F2"
            fillRule="nonzero"
          ></path>
        </g>
      </svg>
    )
  }
] as {
  provider: AuthProviderWithEmail
  text: string
  icon: ReactNode
  disabled: boolean
}[]

const Auth = () => {
  const router = useRouter()
  const { t } = useTranslation()
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
          <span>{t('Sign out')}</span>
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
              <span>
                {t('Login with')} {socialLoginButton.text}
              </span>
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
              <CardTitle className="text-xl">
                {t('Welcome to')} {t(APP.NAME)}
              </CardTitle>
              <CardDescription>{user ? t('You are logged in.') : t('Login to get started!')}</CardDescription>
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
