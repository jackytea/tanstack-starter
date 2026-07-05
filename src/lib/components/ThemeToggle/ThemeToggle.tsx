import { Moon, Sun } from 'lucide-react'

import { toggleTheme } from '@/components/ThemeToggle/ThemeToggle.utils'

const ThemeToggle = () => {
  return (
    <div
      className="flex cursor-pointer items-center justify-center"
      onClick={toggleTheme}
    >
      <Sun className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </div>
  )
}

export { ThemeToggle }
