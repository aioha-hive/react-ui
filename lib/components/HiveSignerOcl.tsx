import React, { useEffect, useState } from 'react'
import { useAioha } from '@aioha/providers/react'
import { useTranslation } from 'react-i18next'
import { I18nextProvider } from 'react-i18next'
import { Providers } from '@aioha/aioha'
import { i18n } from '../i18n.js'

const HiveSignerOclInner = ({ onSuccess, language = 'en' }: { onSuccess: () => any; language?: string }) => {
  const { aioha } = useAioha()
  const { t } = useTranslation('aioha')
  const [error, setError] = useState('')

  useEffect(() => {
    i18n.changeLanguage(language)
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
    <p className="ml-2 text-black dark:text-white">
      {error ? t('failedOneClickLogin', { error }) : t('loggingInOneClick')}
    </p>
  )
}

export const HiveSignerOcl = (props: { onSuccess: () => any; language?: string }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <HiveSignerOclInner {...props} />
    </I18nextProvider>
  )
}
