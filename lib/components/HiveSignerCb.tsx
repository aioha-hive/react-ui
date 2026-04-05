import React, { useEffect } from 'react'
import { hivesignerCb } from '@aioha/aioha/build/lib/hivesigner-cb.js'
import { i18n } from '../i18n.js'

export const HiveSignerCb = ({ language = 'en' }: { language?: string }) => {
  useEffect(() => {
    i18n.changeLanguage(language)
    hivesignerCb()
  }, [])
  return <p className="ml-2 text-black dark:text-white">{i18n.t('redirectingBack')}</p>
}
