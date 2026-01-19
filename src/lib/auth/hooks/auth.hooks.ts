import type { Session } from 'better-auth'
import { and, eq } from 'drizzle-orm'
import { selectAccounts, updateAccounts } from '@/database/providers/accounts.provider'
import { accounts } from '@/database/schemas/account.schema'
import { users } from '@/database/schemas/user.schema'
import type { AuthProviderWithEmail } from '@/types/auth.type'
import { firstElement } from '@/utils/array.utils'

const sessionHook = async (session: Session, providerId: AuthProviderWithEmail) => {
  const currentAccount = await selectAccounts(
    {
      id: accounts.id,
      userName: users.name,
      userImage: users.image,
      userDescription: users.description,
      activeOrganizationId: accounts.activeOrganizationId
    },
    {
      where: and(eq(accounts.userId, session.userId), eq(accounts.providerId, providerId))
    }
  )
    .innerJoin(users, eq(accounts.userId, users.id))
    .then(firstElement)

  if (!currentAccount) {
    return
  }

  await updateAccounts(
    {
      name: currentAccount.userName,
      image: currentAccount.userImage,
      description: currentAccount.userDescription,
      activeOrganizationId: currentAccount.activeOrganizationId
    },
    {
      where: and(eq(accounts.id, currentAccount.id), eq(accounts.userId, session.userId))
    },
    {
      id: accounts.id
    }
  )

  return {
    data: {
      ...session,
      accountId: currentAccount.id,
      activeOrganizationId: currentAccount.activeOrganizationId
    }
  }
}

export { sessionHook }
