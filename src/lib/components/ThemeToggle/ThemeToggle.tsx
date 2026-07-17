import { Moon, Sun } from 'lucide-react'

import { toggleTheme } from '@/components/ThemeToggle/ThemeToggle.utils'

const ThemeToggle = () => {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex cursor-pointer items-center justify-center"
    >
      <Sun className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle Theme</span>
    </button>
  )
}

export { ThemeToggle }
