import React, { useEffect, useState } from 'react'
import { useAioha } from '@aioha/react-provider'
import { Providers } from '@aioha/aioha'

export const HiveSignerOcl = ({ onSuccess }: { onSuccess: () => any }) => {
  const { aioha } = useAioha()
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
    <p className="ml-2 text-black dark:text-white">
      {error ? 'Failed to login with one click: ' + error : 'Logging you in with one click...'}
    </p>
  )
}
