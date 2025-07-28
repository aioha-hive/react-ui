import React, { Dispatch, SetStateAction } from 'react'
import { CloseIcon } from '../../lib/icons/CloseIcon.js'
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
        displayed ? '' : 'ah:hidden'
      } ah:overflow-y-auto ah:overflow-x-hidden ah:fixed ah:top-0 ah:right-0 ah:left-0 ah:z-50 ah:flex ah:justify-center ah:items-center ah:w-full ah:md:inset-0 ah:h-full ah:bg-black ah:bg-opacity-30`}
    >
      <div className={`ah:relative ah:p-4 ah:max-w-md ah:max-h-full`}>
        <div className="ah:relative ah:bg-white ah:rounded-lg ah:shadow-sm ah:dark:bg-gray-700 ah:min-w-sm">
          <button
            type="button"
            className="ah:absolute ah:top-3 ah:end-2.5 ah:text-gray-400 ah:bg-transparent ah:hover:bg-gray-200 ah:hover:text-gray-900 ah:rounded-lg ah:text-sm ah:w-8 ah:h-8 ah:ms-auto ah:inline-flex ah:justify-center ah:items-center ah:dark:hover:bg-gray-600 ah:dark:hover:text-white"
            onClick={() => onClose(false)}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
          <div className="ah:p-4 ah:md:p-8 ah:flex ah:flex-col ah:gap-5 ah:place-content-center ah:text-center">
            {trx_id ? <CircleArrowUp /> : <PenIcon />}
            <div className="ah:flex ah:flex-col ah:gap-1">
              <div className="ah:text-xl ah:text-gray-900 ah:dark:text-gray-100 ah:text-center">
                {trx_id ? 'Transaction Sent' : 'Please sign transaction in your wallet'}
              </div>
              {trx_id && (
                <a
                  href={`${explorerUrl}/tx/${trx_id}`}
                  target={'_blank'}
                  className="ah:font-sm ah:text-gray-900 ah:dark:text-gray-100 ah:hover:underline ah:text-center"
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
