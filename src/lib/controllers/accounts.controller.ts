import { and, eq, not } from 'drizzle-orm'
import { deleteAccounts, selectAccounts, updateAccounts } from '@/database/providers/accounts.provider'
import { accounts } from '@/database/schemas/account.schema'
import { organizations } from '@/database/schemas/organization.schema'
import { users } from '@/database/schemas/user.schema'
import type { AccountPayload } from '@/types/account.type'
import { firstElement } from '@/utils/array.utils'
import { handleErrorWithArray, handleErrorWithNull } from '@/utils/function.utils'
import { deleteUsers } from '../database/providers/users.provider'

const getAccountsController = async (id: string) => {
  return handleErrorWithArray(() =>
    selectAccounts(
      {
        id: accounts.id,
        name: accounts.name,
        image: accounts.image,
        userId: accounts.userId,
        description: accounts.description
      },
      {
        where: not(eq(accounts.id, id))
      }
    )
  )
}

const getAccountController = async (id: string) => {
  return handleErrorWithNull(() =>
    selectAccounts(
      {
        id: accounts.id,
        name: accounts.name,
        image: accounts.image,
        description: accounts.description,
        organization: {
          id: organizations.id,
          name: organizations.name,
          slug: organizations.slug,
          logo: organizations.logo
        }
      },
      {
        where: eq(accounts.id, id)
      }
    )
      .leftJoin(organizations, eq(accounts.activeOrganizationId, organizations.id))
      .then(firstElement)
  )
}

const updateAccountController = async (
  id: string,
  userId: string,
  accountPayload: Omit<Partial<AccountPayload>, 'userId' | 'id'>
) => {
  return handleErrorWithNull(() =>
    updateAccounts(
      accountPayload,
      {
        where: and(eq(accounts.id, id), eq(accounts.userId, userId))
      },
      {
        id: accounts.id
      }
    ).then(firstElement)
  )
}

const deleteAccountController = async (id: string, userId: string) => {
  return handleErrorWithNull(async () => {
    const existingAccounts = await selectAccounts(
      {
        id: accounts.id
      },
      {
        where: eq(accounts.userId, userId)
      }
    )

    return existingAccounts.length <= 1
      ? deleteUsers(
          {
            where: eq(users.id, userId)
          },
          {
            id: users.id
          }
        ).then(firstElement)
      : deleteAccounts({ where: eq(accounts.id, id) }, { id: accounts.id }).then(firstElement)
  })
}

export { deleteAccountController, getAccountController, getAccountsController, updateAccountController }
