import React, { Dispatch, SetStateAction } from 'react'
import { useAioha } from '@aioha/react-provider'
import { CloseIcon } from '../icons/CloseIcon.js'

export interface UserModalProps {
  imageServer?: string
  explorerUrl?: string
  onClose: Dispatch<SetStateAction<boolean>>
  onSwitchUser: () => any
}

export const UserModal = ({
  imageServer = 'https://images.hive.blog',
  explorerUrl = 'https://hivehub.dev',
  onClose,
  onSwitchUser
}: UserModalProps) => {
  const { aioha, user, otherUsers } = useAioha()
  return (
    <>
      <button
        type="button"
        className="ah:absolute ah:top-3 ah:end-2.5 ah:text-gray-400 ah:bg-transparent ah:hover:bg-gray-200 ah:hover:text-gray-900 ah:rounded-lg ah:text-sm ah:w-8 ah:h-8 ah:ms-auto ah:inline-flex ah:justify-center ah:items-center ah:dark:hover:bg-gray-600 ah:dark:hover:text-white"
        onClick={() => onClose(false)}
        aria-label="Close"
      >
        <CloseIcon />
      </button>
      <div className="ah:p-4 ah:md:p-5 ah:flex ah:flex-col ah:place-content-center ah:text-center">
        <div className="ah:my-3">
          <img
            className="ah:w-16 ah:h-16 ah:mx-auto ah:rounded-full"
            src={`${imageServer}/u/${user}/avatar`}
            alt={`${user}'s avatar`}
          />
          <h3 className="ah:text-lg ah:font-semibold ah:my-2 ah:text-gray-900 ah:dark:text-white">{user}</h3>
        </div>
        <div className="ah:flex ah:flex-col ah:rounded-md ah:shadow-xs ah:mx-auto ah:w-full" role="group">
          <button
            type="button"
            className="ah:flex-1 ah:px-4 ah:py-2 ah:text-sm ah:font-medium ah:hover:cursor-pointer ah:text-gray-900 ah:bg-white ah:border ah:border-gray-200 ah:hover:bg-gray-100 ah:dark:bg-gray-600 ah:dark:border-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-500 ah:rounded-t-lg"
            onClick={() => window.open(`${explorerUrl}/@${user}`)}
          >
            View In Explorer
          </button>
          <button
            type="button"
            className="ah:flex-1 ah:px-4 ah:py-2 ah:text-sm ah:font-medium ah:hover:cursor-pointer ah:text-gray-900 ah:bg-white border ah:border-gray-200 ah:hover:bg-gray-100 ah:dark:bg-gray-600 ah:dark:border-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-500"
            onClick={onSwitchUser}
          >
            Switch User
          </button>
          <button
            type="button"
            className="ah:flex-1 ah:px-4 ah:py-2 ah:text-sm ah:font-medium ah:hover:cursor-pointer ah:text-gray-900 ah:bg-white ah:border ah:border-gray-200 ah:hover:bg-gray-100 ah:dark:bg-gray-600 ah:dark:border-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-500 ah:rounded-b-lg"
            onClick={async () => {
              await aioha.logout()
              onClose(false)
              if (Object.keys(otherUsers).length > 0) onSwitchUser()
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
