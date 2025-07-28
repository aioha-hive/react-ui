import React from 'react'

export const BackButton = ({ onPrevious }: { onPrevious: () => void }) => {
  return (
    <button
      type="button"
      className="ah:text-gray-900 ah:bg-white ah:border ah:border-gray-300 ah:focus:outline-hidden ah:hover:bg-gray-100 ah:hover:cursor-pointer ah:focus:ring-4 ah:focus:ring-gray-100 ah:font-medium ah:rounded-lg ah:text-sm ah:pl-4 ah:pr-5 ah:py-1.5 ah:items-center ah:inline-flex ah:dark:bg-gray-700 ah:dark:text-white ah:dark:border-gray-600 ah:dark:hover:bg-gray-800 ah:dark:hover:border-gray-600 ah:dark:focus:ring-gray-700"
      onClick={onPrevious}
    >
      <svg
        className="ah:w-5 ah:h-5 ah:text-gray-900 ah:dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
      </svg>
      Back
    </button>
  )
}
