import { createServerFn } from '@tanstack/react-start'
import { getOrganizationsController } from '@/controllers/organizations.controller'
import { authMiddleware } from '@/middleware/auth.middleware'

const getOrganizations = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async () => {
    return getOrganizationsController()
  })

export { getOrganizations }
