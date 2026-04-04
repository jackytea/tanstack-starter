import { createAuthClient } from 'better-auth/client'
import { customSessionClient } from 'better-auth/client/plugins'
import type { auth } from '@/auth/config/auth.config'

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  plugins: [customSessionClient<typeof auth>()]
})

export { authClient as default }
