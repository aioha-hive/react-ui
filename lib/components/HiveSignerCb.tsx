import React, { useEffect } from 'react'
import { hivesignerCb } from '@aioha/aioha/build/lib/hivesigner-cb.js'
import { defaultMessages, MessagesProvider, useMessages, type Messages } from '../i18n.js'

const HiveSignerCbInner = () => {
  const m = useMessages()
  return <p className="ms-2 text-black dark:text-white">{m.t('auth.oneClick.redirecting')}</p>
}

export const HiveSignerCb = ({ language = 'en', messages }: { language?: string; messages?: Messages }) => {
  useEffect(() => {
    ;(messages ?? defaultMessages).setLocale(language)
    hivesignerCb()
  }, [])
  return (
    <MessagesProvider messages={messages}>
      <HiveSignerCbInner />
    </MessagesProvider>
  )
}
