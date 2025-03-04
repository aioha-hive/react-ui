import React, { Dispatch, SetStateAction } from 'react'
import { useAioha } from '@aioha/react-provider'
import { CloseIcon } from '../icons/CloseIcon'

export interface UserModalProps {
  imageServer?: string
  explorerUrl?: string
  onClose: Dispatch<SetStateAction<boolean>>
}

export const UserModal = ({
  imageServer = 'https://images.hive.blog',
  explorerUrl = 'https://hivehub.dev',
  onClose
}: UserModalProps) => {
  const { aioha, user } = useAioha()
  return (
    <>
      <button
        type="button"
        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={() => onClose(false)}
        aria-label="Close"
      >
        <CloseIcon />
      </button>
      <div className="p-4 md:p-5 flex flex-col place-content-center text-center">
        <div className="my-3">
          <img className="w-16 h-16 mx-auto rounded-full" src={`${imageServer}/u/${user}/avatar`} alt={`${user}'s avatar`} />
          <h3 className="text-lg font-semibold my-2 text-gray-900 dark:text-white">{user}</h3>
        </div>
        <div className="flex flex-col rounded-md shadow-xs mx-auto w-full" role="group">
          <button
            type="button"
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-t-lg hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:text-white dark:hover:bg-gray-500"
            onClick={() => window.open(`${explorerUrl}/@${user}`)}
          >
            View In Explorer
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-b-lg hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:text-white dark:hover:bg-gray-500"
            onClick={async () => {
              await aioha.logout()
              onClose(false)
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
