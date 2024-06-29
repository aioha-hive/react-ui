import { Dispatch, SetStateAction, useState } from 'react'
import { Aioha, Providers } from '@aioha/aioha'
import { ProviderSelection } from './login/ProviderSelection'
import { UsernameInput } from './login/UsernameInput'
import { LoginOptions, LoginResult } from '@aioha/aioha/build/types'
import { HiveAuthQR } from './login/HiveAuthQR'
import { ErrorAlert } from './login/ErrorAlert'

interface LoginModalProps {
  aioha: Aioha
  displayed?: boolean
  title?: string
  loginOptions: LoginOptions
  onClose: Dispatch<SetStateAction<boolean>>
  onLogin?: (result: LoginResult) => any
}

export const AiohaLoginModal = ({
  aioha,
  displayed = false,
  title = 'Connect Wallet',
  loginOptions,
  onClose,
  onLogin
}: LoginModalProps) => {
  const [page, setPage] = useState(0)
  const [chosenProvider, setProvider] = useState<Providers>()
  const [error, setError] = useState('')
  const [hiveAuthPl, setHiveAuthPl] = useState<{ payload: string; cancel: () => void }>()
  const login = async (provider: Providers, username: string, options: LoginOptions) => {
    const loginResult = await aioha.login(provider, username, {
      ...options,
      hiveauth: {
        cbWait: (payload, _, cancel) => {
          setHiveAuthPl({ payload, cancel })
          setPage(2)
        }
      }
    })
    if (loginResult.error) {
      setError(loginResult.error)
      if (provider !== Providers.HiveSigner) setPage(1)
    } else {
      if (typeof onLogin === 'function') onLogin(loginResult)
      onClose(false)
    }
    return loginResult
  }
  return (
    <div
      id="aioha-login-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        displayed ? '' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-30`}
      onMouseDown={() => onClose(false)}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" onMouseDown={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="aioha-login-modal"
              onClick={() => onClose(false)}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <ErrorAlert error={error} />
            {page === 0 ? (
              <ProviderSelection
                aioha={aioha}
                onProviderSelected={async (provider) => {
                  setProvider(provider)
                  if (provider === Providers.HiveSigner) {
                    await login(provider, '', {})
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
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
