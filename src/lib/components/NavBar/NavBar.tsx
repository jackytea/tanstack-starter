import { Link, useRouteContext, useRouter, useRouterState } from '@tanstack/react-router'
import { Home, House, LogOut, Palmtree, User } from 'lucide-react'
import { logoutSession } from '@/auth/utils/auth.utils'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { ROUTES } from '@/constants/route.constants'
import { m as localize } from '@/i18n/compiled/messages'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'

const NavBar = () => {
  const router = useRouter()
  const routerState = useRouterState()
  const { user, queryClient } = useRouteContext({
    from: '__root__'
  })

  return (
    <header className="fixed top-0 z-50 h-(--header-height) w-full bg-white dark:bg-stone-950">
      <div className="container mx-auto flex h-full items-center justify-between p-0">
        <div className="mx-4 flex h-full w-full items-center justify-between border-gray-200 border-x px-4 dark:border-stone-800">
          <div className="flex items-center space-x-2">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 font-semibold text-lg md:text-base">
              <Palmtree className="mt-0.5 h-4 w-4" />
              <span>{localize.application()}</span>
            </Link>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
            <div className="px-2" />
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="ml-4 cursor-pointer rounded-full">
                    <Avatar
                      key={user?.id}
                      className="h-8 w-8 border border-gray-200 bg-white dark:border-stone-800 dark:bg-neutral-800"
                    >
                      <AvatarImage src={user?.image ?? ''} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to={routerState.location.pathname === ROUTES.PROFILE ? ROUTES.HOME : ROUTES.PROFILE}>
                    <DropdownMenuItem className="cursor-pointer">
                      {routerState.location.pathname === ROUTES.PROFILE ? localize.home() : localize.profile()}
                      <DropdownMenuShortcut>
                        {routerState.location.pathname === ROUTES.PROFILE ? (
                          <House className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={async () => {
                      await logoutSession(router, queryClient)
                    }}
                  >
                    {localize.signOut()}
                    <DropdownMenuShortcut>
                      <LogOut className="h-4 w-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                className="cursor-pointer rounded-full"
                to={routerState.location.pathname === ROUTES.AUTH ? ROUTES.HOME : ROUTES.AUTH}
              >
                <Avatar className="ml-4 h-8 w-8 border-2 border-gray-200 bg-white dark:border-stone-800 dark:bg-neutral-800">
                  <AvatarFallback>
                    {routerState.location.pathname === ROUTES.AUTH ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        </div>
      </div>
      <hr className="absolute w-full border-gray-200 dark:border-stone-800" />
    </header>
  )
}

export { NavBar }
