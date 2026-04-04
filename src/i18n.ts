import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LANGUAGES } from '@/constants/lang.constants'
import englishTranslations from '@/translations/en.json'
import frenchTranslations from '@/translations/fr.json'
import chineseTranslations from '@/translations/zh.json'

const resources = {
  [LANGUAGES.ENGLISH]: englishTranslations,
  [LANGUAGES.FRENCH]: frenchTranslations,
  [LANGUAGES.CHINESE]: chineseTranslations
}

i18n.use(initReactI18next).init({
  resources,
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ['localStorage'],
    caches: ['localStorage']
  },
  lng: LANGUAGES.ENGLISH,
  fallbackLng: LANGUAGES.ENGLISH,
  supportedLngs: Object.values(LANGUAGES)
})
