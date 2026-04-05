import i18next from 'i18next'
import type { i18n as I18nInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.js'

export const i18n: I18nInstance = i18next.createInstance()

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['aioha'],
  defaultNS: 'aioha',
  resources: {
    en: { aioha: en }
  },
  interpolation: {
    escapeValue: false
  }
})

export const addTranslations = (lng: string, resources: Partial<typeof en>) => {
  i18n.addResourceBundle(lng, 'aioha', resources, true, true)
}
