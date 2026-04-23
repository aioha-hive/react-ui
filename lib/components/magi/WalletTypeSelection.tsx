import React from 'react'
import hiveLogo from '../../icons/hive-logo.svg'
import ethereumLogo from '../../icons/ethereum-logo.svg'
import { CloseIcon } from '../Icons.js'
import { useMessages } from '../../i18n.js'

export const WalletTypeSelection = ({
  onSelectHive,
  onSelectEthereum,
  onCancel
}: {
  onSelectHive: () => void
  onSelectEthereum: () => void
  onCancel?: () => void
}) => {
  const m = useMessages()
  return (
    <>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-300">{m.t('wallet.selectType')}</p>
      <ul className="mt-4 mb-2 space-y-3">
        <li>
          <button
            type="button"
            className="flex items-center w-full p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-sm hover:cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            onClick={onSelectHive}
          >
            <svg aria-hidden="true" className="h-5 aspect-square">
              <image href={hiveLogo} className="h-5" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">{m.t('wallet.sectionHive')}</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="flex items-center w-full p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-sm hover:cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            onClick={onSelectEthereum}
          >
            <svg aria-hidden="true" className="h-5 aspect-square">
              <image href={ethereumLogo} className="h-5" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">{m.t('wallet.sectionEthereum')}</span>
          </button>
        </li>
      </ul>
      {typeof onCancel === 'function' ? (
        <button
          type="button"
          className="flex gap-2 items-center justify-center my-3 mx-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800 enabled:hover:cursor-pointer disabled:hover:cursor-not-allowed"
          onClick={onCancel}
        >
          <CloseIcon srDesc={m.t('action.cancel')} />
          {m.t('action.cancel')}
        </button>
      ) : null}
    </>
  )
}
