import { languageOptions } from '@/components/LanguageSwitcher/LanguageSwitcher.utils'
import { getLocale, setLocale } from '@/i18n/compiled/runtime'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'

const LanguageSwitcher = () => {
  return (
    <div className="flex cursor-pointer items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="mt-1.5 mr-0.5 size-5 cursor-pointer">
            {languageOptions[getLocale()].flag}
            <span className="sr-only">Toggle language menu</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.keys(languageOptions).map((languageOptionKey) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={languageOptions[languageOptionKey].language}
              onClick={() => setLocale(languageOptions[languageOptionKey].language)}
            >
              {languageOptions[languageOptionKey].name}
              <DropdownMenuShortcut className="h-4 w-4">{languageOptions[languageOptionKey].flag}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="sr-only">Toggle language</span>
    </div>
  )
}

export { LanguageSwitcher }
