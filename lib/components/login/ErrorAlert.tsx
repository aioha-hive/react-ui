import React from 'react'

export const ErrorAlert = ({ error }: { error?: string }) => {
  return error ? (
    <div
      className="flex items-center px-3 py-2 mb-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      {error}
    </div>
  ) : null
}
