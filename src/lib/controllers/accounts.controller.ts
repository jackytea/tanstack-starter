import { and, eq, not } from 'drizzle-orm'
import { deleteAccounts, selectAccounts, updateAccounts } from '@/database/providers/accounts.provider'
import { accounts } from '@/database/schema/account.schema'
import { organizations } from '@/database/schema/organization.schema'
import { users } from '@/database/schema/user.schema'
import type { AccountPayload } from '@/types/account.type'
import { firstElement } from '@/utils/array.utils'
import { handleErrorWithArray, handleErrorWithNull } from '@/utils/function.utils'

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

const getAccountsByUserIdController = async (userId: string) => {
  return handleErrorWithArray(() =>
    selectAccounts(
      {
        id: accounts.id,
        userId: accounts.userId
      },
      {
        where: eq(accounts.userId, userId)
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

const getAccountByUserIdAndProviderIdController = async (userId: string, providerId: string) => {
  return handleErrorWithNull(() =>
    selectAccounts(
      {
        id: accounts.id,
        userName: users.name,
        userImage: users.image,
        userDescription: users.description,
        activeOrganizationId: accounts.activeOrganizationId
      },
      {
        where: and(eq(accounts.userId, userId), eq(accounts.providerId, providerId))
      }
    )
      .innerJoin(users, eq(accounts.userId, users.id))
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

const deleteAccountController = async (id: string) => {
  return handleErrorWithNull(() =>
    deleteAccounts({ where: eq(accounts.id, id) }, { id: accounts.id }).then(firstElement)
  )
}

export {
  deleteAccountController,
  getAccountByUserIdAndProviderIdController,
  getAccountController,
  getAccountsByUserIdController,
  getAccountsController,
  updateAccountController
}
