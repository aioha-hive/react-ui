import React, { useState } from 'react'
import { BackButton } from './BackButton.js'
import { SpinningIcon } from '../../icons/SpinningIcon.js'

interface UsernameInputProps {
  onPrevious: () => any
  onNext: (username: string) => Promise<any>
}

export const UsernameInput = ({ onPrevious, onNext }: UsernameInputProps) => {
  const [username, setUsername] = useState('')
  const [inProgress, setInProgress] = useState(false)
  const proceed = async () => {
    setInProgress(true)
    await onNext(username)
    setInProgress(false)
  }
  return (
    <>
      <div className="ah:mb-3">
        <BackButton onPrevious={onPrevious} />
      </div>
      <div className="ah:inline-flex ah:flex-row ah:gap-1.5 ah:w-full">
        <input
          type="text"
          id="small-input"
          className="ah:bg-gray-50 ah:border ah:border-gray-300 ah:text-gray-900 ah:h-auto ah:text-sm ah:rounded-lg ah:focus:outline-hidden ah:focus:border-gray-900 ah:grow ah:p-2.5 ah:dark:bg-gray-700 ah:dark:border-gray-600 ah:dark:placeholder-gray-400 ah:dark:text-white ah:dark:focus:border-white"
          placeholder="Enter Hive Username"
          autoCapitalize="off"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          onKeyDown={(evt) => (evt.key === 'Enter' ? proceed() : null)}
          disabled={inProgress}
        />
        <button
          type="button"
          className="ah:text-gray-900 ah:bg-white ah:border ah:border-gray-300 ah:focus:outline-hidden ah:hover:bg-gray-100 ah:font-medium ah:rounded-lg ah:text-sm ah:px-3 ah:py-1.5 ah:items-center ah:flex-none ah:dark:bg-gray-600 ah:dark:text-white ah:dark:border-gray-600 ah:dark:hover:bg-gray-500 ah:dark:hover:border-gray-500"
          onClick={proceed}
          aria-label="Proceed"
          disabled={inProgress}
        >
          {inProgress ? (
            <SpinningIcon />
          ) : (
            <svg
              className="ah:w-6 ah:h-6 ah:text-gray-800 ah:dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}
