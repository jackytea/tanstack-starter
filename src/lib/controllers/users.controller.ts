import { eq } from 'drizzle-orm'
import { selectUsers } from '@/database/providers/users.provider'
import { accounts } from '@/database/schemas/account.schema'
import { users } from '@/database/schemas/user.schema'
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

export { getUserController }
