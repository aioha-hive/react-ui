import React, { Dispatch, SetStateAction, useState } from 'react'
import { useAioha } from '@aioha/react-provider'
import { CloseIcon } from '../icons/CloseIcon.js'
import { RightAngledArrow, RmRowIcon } from './TableUtils.js'
import { Badge } from './login/ProviderSelection.js'
import { PlusIcon } from '../icons/PlusIcon.js'
import { EditIcon } from '../icons/EditIcon.js'

export interface SwitchUserModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  onSelect: (user: string) => any
  onAddAcc: () => any
}

export const SwitchUserModal = ({ onClose, onSelect, onAddAcc }: SwitchUserModalProps) => {
  const { aioha, user, provider, otherUsers } = useAioha()
  const [editing, setEditing] = useState(false)
  const onClickUser = (selected: string) => {
    if (editing) {
      selected === user ? aioha.logout() : aioha.removeOtherLogin(selected)
    } else {
      onSelect(selected)
    }
  }
  return (
    <>
      <div className="ah:flex ah:items-center ah:justify-between ah:p-4 ah:md:p-5 ah:border-b ah:rounded-t ah:dark:border-gray-600">
        <h3 className="ah:text-lg ah:font-semibold ah:text-gray-900 ah:dark:text-white">Switch User</h3>
        <button
          type="button"
          className="ah:text-gray-400 ah:bg-transparent ah:hover:bg-gray-200 ah:hover:text-gray-900 ah:rounded-lg ah:text-sm ah:h-8 ah:w-8 ah:ms-auto ah:inline-flex ah:justify-center ah:items-center ah:dark:hover:bg-gray-600 ah:dark:hover:text-white"
          onClick={() => onClose(false)}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="ah:w-full ah:overflow-x-auto">
        <table className="ah:min-w-full ah:divide-y ah:divide-gray-200 ah:dark:divide-gray-600">
          <tbody className="ah:bg-white ah:divide-y ah:divide-gray-200 ah:dark:bg-gray-700 ah:dark:divide-gray-600">
            {user && (
              <tr
                key={user}
                className="ah:hover:bg-gray-50 ah:dark:hover:bg-gray-600 ah:cursor-pointer"
                onClick={() => onClickUser(user!)}
              >
                <td className="ah:px-5 ah:py-4 ah:whitespace-nowrap">
                  <div className="ah:text-sm ah:font-medium ah:text-gray-900 ah:dark:text-gray-100">{user}</div>
                </td>
                <td className="ah:px-3 ah:py-4 ah:whitespace-nowrap">
                  <Badge>{provider}</Badge>
                </td>
                {editing ? <RmRowIcon w={12} /> : <RightAngledArrow w={12} />}
              </tr>
            )}
            {Object.keys(otherUsers).map((u, i) => (
              <tr
                key={i}
                className="ah:hover:bg-gray-50 ah:dark:hover:bg-gray-600 ah:cursor-pointer"
                onClick={() => onClickUser(u!)}
              >
                <td className="ah:px-5 ah:py-4 ah:whitespace-nowrap">
                  <div className="ah:text-sm ah:font-medium ah:text-gray-900 ah:dark:text-gray-100">{u}</div>
                </td>
                <td className="ah:px-3 ah:py-4 ah:whitespace-nowrap">
                  <Badge>{otherUsers[u]}</Badge>
                </td>
                {editing ? <RmRowIcon w={12} /> : <RightAngledArrow w={12} />}
              </tr>
            ))}
          </tbody>
        </table>
        {editing ? (
          <div className="ah:flex ah:gap-2 ah:my-5 ah:mx-auto ah:justify-center">
            <button
              type="button"
              className="ah:flex ah:gap-1 ah:items-center ah:justify-center ah:text-gray-900 ah:bg-white ah:border ah:border-gray-300 ah:focus:outline-none ah:hover:bg-gray-100 ah:font-medium ah:rounded-lg ah:text-sm ah:px-4 ah:py-2.5 ah:dark:bg-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-800 ah:enabled:hover:cursor-pointer ah:disabled:hover:cursor-not-allowed"
              onClick={() => setEditing(false)}
            >
              Done
            </button>
          </div>
        ) : (
          <div className="ah:flex ah:gap-2 ah:my-5 ah:mx-auto ah:justify-center">
            <button
              type="button"
              className="ah:flex ah:gap-1 ah:items-center ah:justify-center ah:text-gray-900 ah:bg-white ah:border ah:border-gray-300 ah:focus:outline-none ah:hover:bg-gray-100 ah:font-medium ah:rounded-lg ah:text-sm ah:pl-3.5 ah:pr-4 ah:py-2.5 ah:dark:bg-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-800 ah:enabled:hover:cursor-pointer ah:disabled:hover:cursor-not-allowed"
              onClick={() => setEditing(true)}
            >
              <EditIcon />
              Edit
            </button>
            <button
              type="button"
              className="ah:flex ah:gap-1 ah:items-center ah:justify-center ah:text-gray-900 ah:bg-white ah:border ah:border-gray-300 ah:focus:outline-none ah:hover:bg-gray-100 ah:font-medium ah:rounded-lg ah:text-sm ah:pl-3 ah:pr-4 ah:py-2.5 ah:dark:bg-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-800 ah:enabled:hover:cursor-pointer ah:disabled:hover:cursor-not-allowed"
              onClick={onAddAcc}
            >
              <PlusIcon />
              Add account
            </button>
          </div>
        )}
      </div>
    </>
  )
}
