import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { logoutSession } from '@/auth/utils/auth.utils'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { QUERY_KEYS } from '@/constants/query.constants'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'
import { Route as RootRoute } from '@/routes/__root'
import { deleteAccount, updateAccount } from '@/services/accounts.service'
import { getOrganizations } from '@/services/organizations.service'
import { AccountWithImage } from '@/types/account.provider.type'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader } from '@/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'

const Profile = ({ account }: { account: AccountWithImage | null }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { queryClient } = RootRoute.useRouteContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const deleteAccountServerFn = useServerFn(deleteAccount)
  const updateAccountsServerFn = useServerFn(updateAccount)
  const getOrganizationsServerFn = useServerFn(getOrganizations)
  const [organizationSelectValue, setOrganizationSelectValue] = useState<string>(account?.organization?.id ?? '')

  const { data: organizations = [] } = useQuery({
    queryFn: () => getOrganizationsServerFn(),
    queryKey: [QUERY_KEYS.ORGANIZATIONS]
  })

  const updateAccountsMutation = useMutation({
    mutationFn: async (activeOrganizationId: string) => {
      return updateAccountsServerFn({
        data: {
          activeOrganizationId
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATIONS] })
    }
  })

  const handleDeleteAccount = async () => {
    try {
      await deleteAccountServerFn().then(() => {
        router.invalidate()
      })

      setIsLoading(false)

      await logoutSession(router, queryClient)
    } catch {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppLayout>
      <div className="flex h-full w-full flex-col items-center justify-center">
        {account ? (
          <Card className="h-100">
            {isLoading ? (
              <div className="w-full">
                <LoadingSpinner className="h-12 w-12 animate-spin" />
              </div>
            ) : (
              <>
                <CardHeader className="text-center">
                  <Avatar className="flex h-48 w-48 items-center justify-center">
                    <AvatarImage
                      className="h-48 w-48 rounded-full border-2 border-gray-200 dark:border-stone-800"
                      src={account.image ?? ''}
                    />
                    <AvatarFallback className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-gray-200 bg-gray-100 text-5xl dark:border-stone-800 dark:bg-stone-900">
                      {account.name?.[0] ?? ''}
                      {account.name?.split(' ')?.[1]?.[0] ?? ''}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="grid w-full text-center">
                    <p className="mb-4 font-extrabold text-2xl">{account.name ?? ''}</p>
                    <Button
                      onClick={handleDeleteAccount}
                      variant="outline"
                      className="cursor-pointer border-red-500 text-red-500"
                    >
                      {t('Delete Account')}
                    </Button>
                  </div>
                  <Select
                    value={organizationSelectValue}
                    onValueChange={(value) => {
                      setOrganizationSelectValue(value)
                      updateAccountsMutation.mutate(value)
                    }}
                  >
                    <SelectTrigger className="mt-3 cursor-pointer">
                      <SelectValue placeholder="Select An Organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {organizations.map((organization) => (
                          <SelectItem key={organization.id} value={organization.id}>
                            {organization.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </CardContent>
              </>
            )}
          </Card>
        ) : (
          <>
            <X className="h-32 w-32 text-red-500" />
            <p className="text-lg">{t('Account Not Found')}</p>
          </>
        )}
      </div>
    </AppLayout>
  )
}

export { Profile }
