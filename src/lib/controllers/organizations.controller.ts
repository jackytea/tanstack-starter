import { selectOrganizations } from '@/database/providers/organizations.provider'
import { organizations } from '@/database/schema/organization.schema'
import { handleErrorWithArray } from '@/utils/function.utils'

const getOrganizationsController = async () => {
  return handleErrorWithArray(() =>
    selectOrganizations({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      logo: organizations.logo,
      metadata: organizations.metadata
    })
  )
}

export { getOrganizationsController }
