import React, { useEffect, useRef, useState } from 'react'
import { Providers } from '@aioha/aioha'
import { useAioha } from '@aioha/react-provider'
import { ErrorAlert } from './ErrorAlert.js'
import { BackButton } from './BackButton.js'
import { SpinningIcon } from '../../icons/SpinningIcon.js'
import { RightAngledArrow } from '../TableUtils.js'

interface AccountDiscoveryProps {
  provider: Providers
  onPrevious: () => any
  onNext: (username: string, details: DiscUserAuth[]) => Promise<any>
}

interface DiscUserAuth {
  pubkey: string
  path: string
  role: string
}

interface DiscUsers {
  [user: string]: DiscUserAuth[]
}

export const AccountDiscovery = ({ provider, onPrevious, onNext }: AccountDiscoveryProps) => {
  const { aioha } = useAioha()
  const discovering = useRef(false)
  const stopDiscovery = useRef(() => {})
  const discovered = useRef<DiscUsers>({})
  const [completed, setCompleted] = useState(false)
  const [count, setCount] = useState<number>(0)
  const [error, setError] = useState<string>()
  const [isPrompt, showPrompt] = useState<boolean>(false)
  useEffect(() => {
    const discover = async () => {
      if (discovering.current) return
      discovering.current = true
      const result = await aioha.discoverAccounts(provider, (disc, stop) => {
        stopDiscovery.current = stop
        const d: DiscUserAuth = {
          pubkey: disc.pubkey!,
          path: disc.path!,
          role: disc.role!
        }
        if (!discovered.current[disc.username]) {
          discovered.current[disc.username] = [d]
        } else if (!discovered.current[disc.username].find((a) => a.role === d.role)) {
          discovered.current[disc.username].push(d)
        }
        setCount((c) => c + 1)
      })
      setCompleted(true)
      if (!result.success) {
        setError(result.error)
      }
    }
    discover()
  }, [])
  const userSelected = (user: string) => {
    showPrompt(true)
    onNext(user, discovered.current[user])
  }
  if (isPrompt)
    return (
      <div className="flex-col gap-20 my-3">
        <svg
          className="w-20 h-20 ml-auto mr-auto text-gray-900 dark:text-gray-100"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6 15h12M6 6h12m-6 12h.01M7 21h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1Z"
          />
        </svg>
        <div className="text-lg my-3 text-gray-900 dark:text-gray-100 text-center">
          Please approve login request on the device.
        </div>
      </div>
    )
  return (
    <div className="flex-col gap-3">
      <div className="mb-3 w-full">
        <BackButton onPrevious={onPrevious} />
      </div>
      <ErrorAlert error={error} />
      {Object.keys(discovered.current).length > 0 && (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
              {Object.entries(discovered.current).map(([username, auths]) => (
                <tr
                  key={username}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => userSelected(username)}
                >
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{username}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      {auths.map((auth, index) => (
                        <span
                          key={index}
                          className="px-2 inline-flex text-xs leading-5 font-semplify rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          {auth.role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <RightAngledArrow />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!completed ? (
        <button
          type="button"
          className="flex gap-2 items-center justify-center mt-3 ml-auto mr-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800 enabled:hover:cursor-pointer disabled:hover:cursor-not-allowed"
          onClick={stopDiscovery.current}
          disabled={count === 0}
        >
          <SpinningIcon size={5} />
          Stop
        </button>
      ) : null}
    </div>
  )
}
