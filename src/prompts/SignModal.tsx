import React, { Dispatch, SetStateAction } from 'react'
import { CloseIcon } from '../../lib/components/Icons.js'
import { CircleArrowUp, PenIcon } from './PromptIcons.js'

export const SignModal = ({
  displayed = false,
  trx_id,
  explorerUrl = 'https://vsc.techcoderx.com',
  onClose
}: {
  displayed?: boolean
  trx_id?: string
  explorerUrl?: string
  onClose: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div
      id="aioha-sign-modal"
      tabIndex={-1}
      className={`${
        displayed ? '' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-30`}
    >
      <div className={`relative p-4 max-w-md max-h-full`}>
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 min-w-sm">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => onClose(false)}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
          <div className="p-4 md:p-8 flex flex-col gap-5 place-content-center text-center">
            {trx_id ? <CircleArrowUp /> : <PenIcon />}
            <div className="flex flex-col gap-1">
              <div className="text-xl text-gray-900 dark:text-gray-100 text-center">
                {trx_id ? 'Transaction Sent' : 'Please sign transaction in your wallet'}
              </div>
              {trx_id && (
                <a
                  href={`${explorerUrl}/tx/${trx_id}`}
                  target={'_blank'}
                  className="font-sm text-gray-900 dark:text-gray-100 hover:underline text-center"
                >
                  View in explorer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
