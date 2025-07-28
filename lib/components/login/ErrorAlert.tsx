import React from 'react'

export const ErrorAlert = ({ error }: { error?: string }) => {
  return error ? (
    <div
      className="ah:flex ah:items-center ah:px-3 ah:py-2 ah:mb-2 ah:text-sm ah:text-red-800 ah:border ah:border-red-300 ah:rounded-lg ah:bg-red-50 ah:dark:bg-gray-800 ah:dark:text-red-400 ah:dark:border-red-800"
      role="alert"
    >
      {error}
    </div>
  ) : null
}
