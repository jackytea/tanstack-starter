import { eq } from 'drizzle-orm'
import { deleteUsers, selectUsers } from '@/database/providers/users.provider'
import { accounts } from '@/database/schema/account.schema'
import { users } from '@/database/schema/user.schema'
import { firstElement } from '@/utils/array.utils'
import { handleErrorWithNull } from '@/utils/function.utils'

const getUserController = async (id: string, accountId: string) => {
  return handleErrorWithNull(() =>
    selectUsers(
      {
        id: users.id,
        name: users.name,
        image: users.image,
        email: users.email,
        description: users.description,
        providerId: accounts.providerId,
        emailVerified: users.emailVerified
      },
      {
        where: eq(users.id, id)
      }
    )
      .innerJoin(accounts, eq(accounts.id, accountId))
      .then(firstElement)
  )
}

const deleteUserController = async (id: string) => {
  return handleErrorWithNull(() =>
    deleteUsers(
      {
        where: eq(users.id, id)
      },
      {
        id: users.id
      }
    ).then(firstElement)
  )
}

export { deleteUserController, getUserController }
