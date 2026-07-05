import { AUTH_PROVIDERS } from '@/constants/auth.constants'

type AuthProviderWithEmail =
  (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS]
type AuthProvider = Exclude<AuthProviderWithEmail, 'credential'>

export type { AuthProvider, AuthProviderWithEmail }
