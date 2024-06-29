import { ReactNode } from 'react'
import { Aioha, Providers } from '@aioha/aioha'
import KeychainIcon from '../../icons/keychain.svg'
import PeakVaultIcon from '../../icons/peakvault.svg'
import HiveAuthIcon from '../../icons/hiveauth-light.svg'
import HiveAuthIconDark from '../../icons/hiveauth-dark.svg'
import HiveSignerIcon from '../../icons/hivesigner.svg'
import LedgerIcon from '../../icons/ledger-light.svg'
import LedgerIconDark from '../../icons/ledger-dark.svg'

const Badge = ({ children }: { children?: ReactNode }) => {
  return (
    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
      {children}
    </span>
  )
}

const ProviderBtn = ({
  displayName,
  iconHref,
  iconHrefDark,
  badge,
  onClick
}: {
  displayName: string
  iconHref: string
  iconHrefDark?: string
  badge?: string
  onClick?: () => any
}) => {
  return (
    <a
      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow hover:cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
      onClick={onClick}
    >
      <svg aria-hidden="true" className={`h-5 aspect-square`}>
        <image href={iconHref} className={`h-5 ${iconHrefDark ? 'block dark:hidden' : ''}`} />
        {iconHrefDark ? <image href={iconHrefDark} className={`h-5 hidden dark:block`} /> : null}
      </svg>
      <span className="flex-1 ms-3 whitespace-nowrap">{displayName}</span>
      {badge ? <Badge>{badge}</Badge> : null}
    </a>
  )
}

export const ProviderSelection = ({
  aioha,
  onProviderSelected
}: {
  aioha: Aioha
  onProviderSelected: (provider: Providers) => any
}) => {
  return (
    <>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Connect with one of our available Hive wallet providers.
      </p>
      <ul className="my-4 space-y-3">
        {aioha.isProviderEnabled(Providers.Keychain) ? (
          <li>
            <ProviderBtn
              displayName={'Keychain'}
              iconHref={KeychainIcon}
              onClick={() => onProviderSelected(Providers.Keychain)}
              badge={'Popular'}
            />
          </li>
        ) : null}
        {aioha.isProviderEnabled(Providers.PeakVault) ? (
          <li>
            <ProviderBtn
              displayName={'Peak Vault'}
              iconHref={PeakVaultIcon}
              onClick={() => onProviderSelected(Providers.PeakVault)}
            />
          </li>
        ) : null}
        {aioha.isProviderRegistered(Providers.HiveAuth) ? (
          <li>
            <ProviderBtn
              displayName={'HiveAuth'}
              iconHref={HiveAuthIcon}
              iconHrefDark={HiveAuthIconDark}
              onClick={() => onProviderSelected(Providers.HiveAuth)}
            />
          </li>
        ) : null}
        {aioha.isProviderRegistered(Providers.HiveSigner) ? (
          <li>
            <ProviderBtn
              displayName={'HiveSigner'}
              iconHref={HiveSignerIcon}
              onClick={() => onProviderSelected(Providers.HiveSigner)}
            />
          </li>
        ) : null}
        {aioha.isProviderRegistered(Providers.Ledger) ? (
          <li>
            <ProviderBtn
              displayName={'Ledger'}
              iconHref={LedgerIcon}
              iconHrefDark={LedgerIconDark}
              onClick={() => onProviderSelected(Providers.Ledger)}
            />
          </li>
        ) : null}
      </ul>
      <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
        <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Why do I need to connect with my wallet?
      </a>
    </>
  )
}
