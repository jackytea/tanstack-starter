import { THEMES } from '@/constants/theme.constants'

const themeKey = 'theme' as const

const toggleTheme = () => {
  const themeNotSet = !(themeKey in localStorage)
  const isDarkTheme = document.documentElement.classList.contains(THEMES.DARK)
  const prefersDarkTheme = window.matchMedia(`(prefers-color-scheme: ${THEMES.DARK})`).matches

  if (isDarkTheme || (themeNotSet && prefersDarkTheme)) {
    document.documentElement.classList.remove(THEMES.DARK)
    localStorage.setItem(themeKey, THEMES.LIGHT)
  } else {
    document.documentElement.classList.add(THEMES.DARK)
    localStorage.setItem(themeKey, THEMES.DARK)
  }
}

const rootThemeScript =
  `document.documentElement.classList.toggle('${THEMES.DARK}', localStorage.theme === '${THEMES.DARK}' || (!('${themeKey}' in localStorage) && window.matchMedia('(prefers-color-scheme: ${THEMES.DARK})').matches))` as const

export { rootThemeScript, toggleTheme }
