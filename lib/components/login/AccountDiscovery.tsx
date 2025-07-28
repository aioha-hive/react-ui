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
      <div className="ah:flex-col ah:gap-20 ah:my-3">
        <svg
          className="ah:w-20 ah:h-20 ah:ml-auto ah:mr-auto ah:text-gray-900 ah:dark:text-gray-100"
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
        <div className="ah:text-lg my-3 ah:text-gray-900 ah:dark:text-gray-100 ah:text-center">
          Please approve login request on the device.
        </div>
      </div>
    )
  return (
    <div className="ah:flex-col ah:gap-3">
      <div className="ah:mb-3 ah:w-full">
        <BackButton onPrevious={onPrevious} />
      </div>
      <ErrorAlert error={error} />
      {Object.keys(discovered.current).length > 0 && (
        <div className="ah:w-full ah:overflow-x-auto">
          <table className="ah:min-w-full ah:divide-y ah:divide-gray-200 ah:dark:divide-gray-600">
            <tbody className="ah:bg-white ah:divide-y ah:divide-gray-200 ah:dark:bg-gray-700 ah:dark:divide-gray-600">
              {Object.entries(discovered.current).map(([username, auths]) => (
                <tr
                  key={username}
                  className="ah:hover:bg-gray-50 ah:dark:hover:bg-gray-600 ah:cursor-pointer"
                  onClick={() => userSelected(username)}
                >
                  <td className="ah:px-3 ah:py-4 ah:whitespace-nowrap">
                    <div className="ah:text-sm ah:font-medium ah:text-gray-900 ah:dark:text-gray-100">{username}</div>
                  </td>
                  <td className="ah:px-3 ah:py-4 ah:whitespace-nowrap">
                    <div className="ah:flex ah:flex-wrap ah:gap-2">
                      {auths.map((auth, index) => (
                        <span
                          key={index}
                          className="ah:px-2 ah:inline-flex ah:text-xs ah:leading-5 ah:font-semplify ah:rounded-full ah:bg-green-100 ah:text-green-800 ah:dark:bg-green-900 ah:dark:text-green-200"
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
          className="ah:flex ah:gap-2 ah:items-center ah:justify-center ah:mt-3 ah:ml-auto ah:mr-auto ah:text-gray-900 ah:bg-white ah:border ah:border-gray-300 ah:focus:outline-none ah:hover:bg-gray-100 ah:font-medium ah:rounded-lg ah:text-sm ah:px-5 ah:py-2.5 ah:dark:bg-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-800 ah:enabled:hover:cursor-pointer ah:disabled:hover:cursor-not-allowed"
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
