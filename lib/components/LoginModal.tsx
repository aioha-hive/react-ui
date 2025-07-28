import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Providers } from '@aioha/aioha'
import { Arrangement, ProviderSelection } from './login/ProviderSelection.js'
import { UsernameInput } from './login/UsernameInput.js'
import { LoginOptions, LoginResult } from '@aioha/aioha/build/types.js'
import { useAioha } from '@aioha/react-provider'
import { HiveAuthQR } from './login/HiveAuthQR.js'
import { ErrorAlert } from './login/ErrorAlert.js'
import { CloseIcon } from '../icons/CloseIcon.js'
import { ProviderInfo } from './ProviderInfo.js'
import { AccountDiscovery } from './login/AccountDiscovery.js'

export interface LoginModalProps {
  loginTitle?: string
  loginHelpUrl?: string
  loginOptions: LoginOptions
  arrangement?: Arrangement
  forceShowProviders?: Providers[]
  onLogin?: (result: LoginResult) => any
  onCancel?: () => any
  onClose: Dispatch<SetStateAction<boolean>>
}

export const LoginModal = ({
  loginTitle = 'Connect Wallet',
  loginHelpUrl,
  loginOptions,
  arrangement = 'list',
  forceShowProviders = [],
  onCancel,
  onClose,
  onLogin
}: LoginModalProps) => {
  const { aioha } = useAioha()
  const [page, setPage] = useState(0)
  const [chosenProvider, setProvider] = useState<Providers>()
  const [error, setError] = useState('')
  const [hiveAuthPl, setHiveAuthPl] = useState<{ payload: string; cancel: () => void }>()
  useEffect(() => {
    aioha.on('hiveauth_login_request', (payload: string, _: any, cancel: () => void) => {
      setError('')
      setHiveAuthPl({ payload, cancel })
      setPage(2)
    })
    return () => {
      aioha.off('hiveauth_login_request')
    }
  })
  const login = async (provider: Providers, username: string, options: LoginOptions) => {
    const loginResult = await aioha.login(provider, username, {
      ...options,
      hiveauth: {
        // TODO: remove after removing the callback function in next core release
        cbWait: () => {}
      }
    })
    if (!loginResult.success) {
      setError(loginResult.error)
      if (provider !== Providers.HiveSigner) setPage(1)
    } else {
      if (typeof onLogin === 'function') onLogin(loginResult)
      onClose(false)
    }
    return loginResult
  }
  return (
    <>
      <div className="ah:flex ah:items-center ah:justify-between ah:p-4 ah:md:p-5 ah:border-b ah:rounded-t ah:dark:border-gray-600">
        <h3 className="ah:text-lg ah:font-semibold ah:text-gray-900 ah:dark:text-white">{loginTitle}</h3>
        <button
          type="button"
          className="ah:text-gray-400 ah:bg-transparent ah:hover:bg-gray-200 ah:hover:text-gray-900 ah:rounded-lg ah:text-sm ah:h-8 ah:w-8 ah:ms-auto ah:inline-flex ah:justify-center ah:items-center ah:dark:hover:bg-gray-600 ah:dark:hover:text-white"
          onClick={() => onClose(false)}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="ah:p-4 ah:md:p-5">
        <ErrorAlert error={error} />
        {page === 0 ? (
          <ProviderSelection
            helpUrl={loginHelpUrl}
            forceShow={forceShowProviders}
            arrangement={arrangement}
            onCancel={onCancel}
            onSelected={async (provider) => {
              if (!aioha.isProviderEnabled(provider)) {
                if (ProviderInfo[provider].url) window.open(ProviderInfo[provider].url, '_blank', 'noopener,noreferrer')
                return
              }
              setProvider(provider)
              if (provider === Providers.HiveSigner) {
                await login(provider, '', {})
              } else if (ProviderInfo[provider].discovery) {
                setError('')
                setPage(3)
              } else {
                setError('')
                setPage(1)
              }
            }}
          />
        ) : page === 1 ? (
          <UsernameInput
            onPrevious={() => {
              setError('')
              setPage(0)
            }}
            onNext={(username) => login(chosenProvider!, username, loginOptions)}
          />
        ) : page === 2 ? (
          <HiveAuthQR payload={hiveAuthPl!.payload} cancel={hiveAuthPl!.cancel} />
        ) : page === 3 ? (
          <AccountDiscovery
            provider={chosenProvider!}
            onPrevious={() => setPage(0)}
            onNext={(username, info) => login(chosenProvider!, username, { ...loginOptions, paths: info.map((v) => v.path) })}
          />
        ) : null}
      </div>
    </>
  )
}
