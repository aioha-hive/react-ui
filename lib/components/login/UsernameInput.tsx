import { useState } from 'react'

export const UsernameInput = ({ onPrevious, onNext }: { onPrevious: () => any; onNext: (username: string) => any }) => {
  const [username, setUsername] = useState('')
  return (
    <>
      <div className="mb-4">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm pl-4 pr-5 py-1.5 items-center inline-flex dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={onPrevious}
        >
          <svg
            className="w-5 h-5 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      <div className="inline-flex flex-row gap-1.5 w-full">
        <input
          type="text"
          id="small-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 h-auto text-sm rounded-lg focus:ring-transparent focus:border-gray-900 flex-grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-white"
          placeholder="Enter Hive Username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 items-center flex-none dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-500 dark:hover:border-gray-500"
          onClick={() => onNext(username)}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  )
}
