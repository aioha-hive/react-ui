import React, { useEffect, useState } from 'react'
import { useAioha } from '@aioha/providers/react'
import { Providers } from '@aioha/aioha'
import { defaultMessages, MessagesProvider, useMessages, type Messages } from '../i18n.js'

const HiveSignerOclInner = ({ onSuccess }: { onSuccess: () => any }) => {
  const { aioha } = useAioha()
  const m = useMessages()
  const [error, setError] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)
    const loginResult = aioha.loginNonInteractive(Providers.HiveSigner, url.searchParams.get('username')!, {
      ignorePersistence: url.searchParams.get('force') === 'true',
      hivesigner: {
        accessToken: url.searchParams.get('access_token')!,
        expiry: parseInt(url.searchParams.get('expiry')!)
      }
    })
    if (!loginResult.success) {
      setError(loginResult.error)
    } else {
      onSuccess()
    }
  }, [])

  return (
    <p className="ms-2 text-black dark:text-white">
      {error ? m.t('auth.oneClick.failed', { error }) : m.t('auth.oneClick.logging')}
    </p>
  )
}

export const HiveSignerOcl = (props: { onSuccess: () => any; language?: string; messages?: Messages }) => {
  const { language = 'en', messages, ...rest } = props
  useEffect(() => {
    ;(messages ?? defaultMessages).setLocale(language)
  }, [language, messages])
  return (
    <MessagesProvider messages={messages}>
      <HiveSignerOclInner {...rest} />
    </MessagesProvider>
  )
}
