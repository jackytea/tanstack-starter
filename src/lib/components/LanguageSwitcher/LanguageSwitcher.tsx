import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { langKey, languageOptions } from '@/components/LanguageSwitcher/LanguageSwitcher.utils'
import { LANGUAGES } from '@/constants/lang.constants'
import { Language } from '@/types/language.type'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = (language: Language) => {
    i18n.changeLanguage(language)
    localStorage.setItem(langKey, language)
  }

  useEffect(() => {
    const language = localStorage.getItem(langKey)

    if (!language) {
      return
    }

    i18n.changeLanguage(language)
  }, [i18n])

  return (
    <div className="flex cursor-pointer items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-6 cursor-pointer">
            {languageOptions[i18n.language ?? LANGUAGES.ENGLISH].flag}
            <span className="sr-only">Toggle language menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.keys(languageOptions).map((languageOptionKey) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={languageOptions[languageOptionKey].language}
              onClick={() => toggleLanguage(languageOptions[languageOptionKey].language)}
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
