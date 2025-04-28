import React, { Dispatch, SetStateAction } from 'react'
import { useAioha } from '@aioha/react-provider'
import { CloseIcon } from '../icons/CloseIcon'
import { RightAngledArrow } from './TableUtils'
import { Badge } from './login/ProviderSelection'
import { PlusIcon } from '../icons/PlusIcon'

export interface SwitchUserModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  onSelect: (user: string) => any
  onAddAcc: () => any
}

export const SwitchUserModal = ({ onClose, onSelect, onAddAcc }: SwitchUserModalProps) => {
  const { user, provider, otherUsers } = useAioha()
  return (
    <>
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Switch User</h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => onClose(false)}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
            {user && (
              <tr key={user} className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => onSelect(user!)}>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <Badge>{provider}</Badge>
                </td>
                <RightAngledArrow w={12} />
              </tr>
            )}
            {Object.keys(otherUsers).map((u, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => onSelect(u!)}>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{u}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <Badge>{otherUsers[u]}</Badge>
                </td>
                <RightAngledArrow w={12} />
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="flex gap-1 items-center justify-center my-5 ml-auto mr-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800 enabled:hover:cursor-pointer disabled:hover:cursor-not-allowed"
          onClick={onAddAcc}
        >
          <PlusIcon />
          Add account
        </button>
      </div>
    </>
  )
}
