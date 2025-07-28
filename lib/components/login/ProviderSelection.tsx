import React, { ReactNode } from 'react'
import { Providers } from '@aioha/aioha'
import { useAioha } from '@aioha/react-provider'
import { ProviderInfo } from '../ProviderInfo.js'
import { CloseIcon } from '../../icons/CloseIcon.js'

type ProviderCb = (provider: Providers) => any
export type Arrangement = 'list' | 'grid'

export const Badge = ({ children }: { children?: ReactNode }) => {
  return (
    <span className="ah:inline-flex ah:items-center ah:justify-center ah:px-2 ah:py-0.5 ah:ms-3 ah:text-xs ah:font-medium ah:text-gray-500 ah:bg-gray-200 ah:rounded-sm ah:dark:bg-gray-700 ah:dark:text-gray-400">
      {children}
    </span>
  )
}

const ProviderBtn = ({ provider, forceShow, onClick }: { provider: Providers; forceShow: boolean; onClick: ProviderCb }) => {
  const { aioha } = useAioha()
  const { name, icon, iconDark, loginBadge } = ProviderInfo[provider]
  return aioha.isProviderEnabled(provider) || (forceShow && aioha.isProviderRegistered(provider)) ? (
    <li>
      <a
        className="ah:flex ah:items-center ah:p-3 ah:text-base ah:font-bold ah:text-gray-900 ah:rounded-lg ah:bg-gray-50 ah:hover:bg-gray-100 ah:group ah:hover:shadow-sm ah:hover:cursor-pointer ah:dark:bg-gray-600 ah:dark:hover:bg-gray-500 ah:dark:text-white"
        onClick={() => onClick(provider)}
      >
        <svg aria-hidden="true" className={`ah:h-5 ah:aspect-square`}>
          <image href={icon} className={`ah:h-5 ${iconDark ? 'ah:block ah:dark:hidden' : ''}`} />
          {iconDark ? <image href={iconDark} className={`ah:h-5 ah:hidden ah:dark:block`} /> : null}
        </svg>
        <span className="ah:flex-1 ah:ms-3 ah:whitespace-nowrap">{name}</span>
        {loginBadge ? <Badge>{loginBadge}</Badge> : null}
      </a>
    </li>
  ) : null
}

const ProviderBtnGrid = ({ provider, forceShow, onClick }: { provider: Providers; forceShow: boolean; onClick: ProviderCb }) => {
  const { aioha } = useAioha()
  const { name, icon, iconDark } = ProviderInfo[provider]
  return aioha.isProviderEnabled(provider) || (forceShow && aioha.isProviderRegistered(provider)) ? (
    <a
      className="ah:flex ah:flex-col ah:items-center ah:w-34 ah:p-6 ah:rounded-lg ah:bg-gray-50 ah:hover:bg-gray-100 ah:group ah:hover:shadow-sm ah:hover:cursor-pointer ah:dark:bg-gray-700 ah:dark:hover:bg-gray-600 ah:dark:text-white"
      onClick={() => onClick(provider)}
    >
      <svg aria-hidden="true" className={`ah:h-12 ah:aspect-square`}>
        <image href={icon} className={`ah:h-12 ${iconDark ? 'ah:block ah:dark:hidden' : ''}`} />
        {iconDark ? <image href={iconDark} className={`ah:h-12 ah:hidden ah:dark:block`} /> : null}
      </svg>
      <span className="ah:mt-4 ah:text-base ah:font-bold ah:dark:text-white ah:whitespace-nowrap">{name}</span>
    </a>
  ) : null
}

const ProvidersSeq: Providers[] = [
  Providers.Keychain,
  Providers.PeakVault,
  Providers.HiveAuth,
  Providers.HiveSigner,
  Providers.Ledger
] // in this particular order

export const ProviderSelection = ({
  helpUrl,
  forceShow,
  onSelected,
  arrangement,
  onCancel
}: {
  helpUrl?: string
  forceShow: Providers[]
  onSelected: ProviderCb
  arrangement: Arrangement
  onCancel?: () => any
}) => {
  return (
    <>
      <p className="ah:text-sm ah:font-normal ah:text-gray-500 ah:dark:text-gray-400">
        Connect with one of our available Hive wallet providers.
      </p>
      {arrangement === 'list' ? (
        <ul className="ah:mt-4 ah:mb-2 ah:space-y-3">
          {ProvidersSeq.map((p, i) => (
            <ProviderBtn key={i} provider={p} forceShow={forceShow.includes(p)} onClick={onSelected} />
          ))}
        </ul>
      ) : (
        <div className="ah:grid ah:grid-cols-2 ah:md:grid-cols-3 ah:gap-4 ah:mt-4 ah:mb-2">
          {ProvidersSeq.map((p, i) => (
            <ProviderBtnGrid key={i} provider={p} forceShow={forceShow.includes(p)} onClick={onSelected} />
          ))}
        </div>
      )}
      {helpUrl ? (
        <a
          href={helpUrl}
          target="_blank"
          className="ah:inline-flex ah:items-center ah:mt-2 ah:text-xs ah:font-normal ah:text-gray-500 ah:hover:underline ah:dark:text-gray-400"
        >
          <svg
            className="ah:w-3 ah:h-3 ah:me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Need help connecting a wallet?
        </a>
      ) : null}
      {typeof onCancel === 'function' ? (
        <button
          type="button"
          className="ah:flex ah:gap-2 ah:items-center ah:justify-center ah:my-3 ah:ml-auto ah:mr-auto ah:text-gray-900 ah:bg-white ah:border ah:border-gray-300 ah:focus:outline-none ah:hover:bg-gray-100 ah:font-medium ah:rounded-lg ah:text-sm ah:px-5 ah:py-2.5 ah:dark:bg-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-800 ah:enabled:hover:cursor-pointer ah:disabled:hover:cursor-not-allowed"
          onClick={onCancel}
        >
          <CloseIcon srDesc="Cancel button" />
          Cancel
        </button>
      ) : null}
    </>
  )
}
