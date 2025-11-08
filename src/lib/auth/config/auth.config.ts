import { createServerOnlyFn } from '@tanstack/react-start'
import type { Session } from 'better-auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { customSession } from 'better-auth/plugins'
import { reactStartCookies } from 'better-auth/react-start'
import { database } from '@/database/config/database.config'
import { readAccountByUserIdAndProviderId, updateAccounts } from '@/database/providers/accounts.provider'
import type { AuthProviderWithEmail } from '@/types/auth.type'

const populateSessionAccount = async (session: Session, providerId: AuthProviderWithEmail) => {
  const account = await readAccountByUserIdAndProviderId(session.userId, providerId)

  if (!account) {
    return
  }

  await updateAccounts(session.userId, [account.id], {
    name: account.userName,
    image: account.userImage,
    description: account.userDescription
  })

  return {
    data: {
      ...session,
      accountId: account.id
    }
  }
}

const auth = createServerOnlyFn(() =>
  betterAuth({
    baseURL: process.env.VITE_BASE_URL as string,
    plugins: [
      reactStartCookies(),
      customSession(async ({ user, session }) => {
        return {
          user,
          session: {
            ...session,
            accountId: (session as typeof session & { accountId: string }).accountId
          }
        }
      })
    ],
    database: drizzleAdapter(database, {
      provider: 'pg',
      usePlural: true
    }),
    databaseHooks: {
      session: {
        create: {
          before: async (session, context) => {
            if (!context) {
              return
            }

            if (context.path.startsWith('/callback/:id') && context.params?.id) {
              return populateSessionAccount(session, context.params.id as AuthProviderWithEmail)
            }

            return
          }
        }
      }
    },
    emailAndPassword: {
      enabled: (process.env.VITE_GUEST_DISABLE_SIGN_UP as string) !== 'true',
      disableSignUp: (process.env.VITE_GUEST_DISABLE_SIGN_UP as string) === 'true'
    },
    user: {
      deleteUser: {
        enabled: true
      },
      additionalFields: {
        description: {
          type: 'string',
          required: false
        }
      }
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60
      },
      additionalFields: {
        accountId: {
          type: 'string',
          required: false
        }
      }
    },
    socialProviders: {
      discord: {
        overrideUserInfoOnSignIn: true,
        clientId: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string
      },
      github: {
        overrideUserInfoOnSignIn: true,
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string
      },
      google: {
        overrideUserInfoOnSignIn: true,
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }
    },
    advanced: {
      ipAddress: {
        disableIpTracking: false
      },
      defaultCookieAttributes: {
        httpOnly: true,
        secure: true
      },
      disableCSRFCheck: false,
      useSecureCookies: true,
      database: {
        generateId: false
      }
    }
  })
)()

export { auth }
