import React, { useState } from 'react'
import { useAioha, AiohaModal, defaultMessages } from '../lib'
import { KeyTypes } from '@aioha/aioha'
import { ChainIcon } from './Icons'

const LOCALES: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'hr', label: 'Hrvatski' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'pl', label: 'Polski' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en-XA', label: '🧪 Pseudo (en-XA)' }
]

const CATALOG_LOADERS: Record<string, () => Promise<{ default: Record<string, string> }>> = {
  ar: () => import('@aioha/i18n-keys/locales/ar.json'),
  de: () => import('@aioha/i18n-keys/locales/de.json'),
  es: () => import('@aioha/i18n-keys/locales/es.json'),
  fr: () => import('@aioha/i18n-keys/locales/fr.json'),
  hi: () => import('@aioha/i18n-keys/locales/hi.json'),
  hr: () => import('@aioha/i18n-keys/locales/hr.json'),
  it: () => import('@aioha/i18n-keys/locales/it.json'),
  ja: () => import('@aioha/i18n-keys/locales/ja.json'),
  ko: () => import('@aioha/i18n-keys/locales/ko.json'),
  ms: () => import('@aioha/i18n-keys/locales/ms.json'),
  pl: () => import('@aioha/i18n-keys/locales/pl.json'),
  pt: () => import('@aioha/i18n-keys/locales/pt.json'),
  ru: () => import('@aioha/i18n-keys/locales/ru.json'),
  'zh-CN': () => import('@aioha/i18n-keys/locales/zh-CN.json'),
  'zh-TW': () => import('@aioha/i18n-keys/locales/zh-TW.json')
}

const loaded = new Set<string>(['en', 'en-XA'])

async function loadLocaleCatalog(code: string) {
  if (loaded.has(code)) return
  const loader = CATALOG_LOADERS[code]
  if (!loader) return
  const cat = (await loader()).default
  defaultMessages.addCatalog(code, cat)
  loaded.add(code)
}

export const Home = () => {
  const [aiohaModalDisplayed, setAiohaModalDisplayed] = useState(false)
  const [language, setLanguage] = useState('en')
  const [dir, setDir] = useState<'auto' | 'ltr' | 'rtl'>('auto')
  const { user } = useAioha()

  const handleLanguageChange = async (code: string) => {
    await loadLocaleCatalog(code)
    setLanguage(code)
  }

  return (
    <>
      <div className="flex items-start gap-3 p-4 flex-wrap">
        <button
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-hidden focus:ring-gray-100 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          onClick={() => setAiohaModalDisplayed(true)}
        >
          {user ?? (
            <div className="inline-flex">
              <ChainIcon />
              Connect Wallet
            </div>
          )}
        </button>
        <label className="text-sm text-gray-700 dark:text-gray-200 inline-flex items-center gap-2">
          <span>Language</span>
          <select
            className="text-sm rounded-lg border border-gray-300 bg-white text-gray-900 px-2 py-1.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-hidden"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {LOCALES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label} ({l.code})
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-200 inline-flex items-center gap-2">
          <span>Direction</span>
          <select
            className="text-sm rounded-lg border border-gray-300 bg-white text-gray-900 px-2 py-1.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-hidden"
            value={dir}
            onChange={(e) => setDir(e.target.value as 'auto' | 'ltr' | 'rtl')}
          >
            <option value="auto">auto</option>
            <option value="ltr">ltr</option>
            <option value="rtl">rtl</option>
          </select>
        </label>
      </div>
      <AiohaModal
        displayed={aiohaModalDisplayed}
        language={language}
        dir={dir}
        loginOptions={{
          msg: 'Hello World',
          keyType: KeyTypes.Posting
        }}
        arrangement="grid"
        onClose={setAiohaModalDisplayed}
      />
    </>
  )
}
