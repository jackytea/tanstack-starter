import { eq } from 'drizzle-orm'
import { deleteAccounts, selectAccounts } from '@/database/providers/accounts.provider'
import { accounts } from '@/database/schemas/account.schema'
import { users } from '@/database/schemas/user.schema'
import { firstElement } from '@/utils/array.utils'
import { handleErrorWithNull } from '@/utils/function.utils'
import { deleteUsers } from '../database/providers/users.provider'

const getAccountController = async (id: string) => {
  return handleErrorWithNull(() =>
    selectAccounts(
      {
        id: accounts.id,
        name: accounts.name,
        image: accounts.image,
        description: accounts.description
      },
      {
        where: eq(accounts.id, id)
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

export { deleteAccountController, getAccountController }
