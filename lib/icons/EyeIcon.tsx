import React from 'react'

export const EyeIcon = ({ size = 6 }: { size?: number }) => {
  const sizes: { [s: number]: string } = {
    6: 'w-6 h-6',
    12: 'w-12 h-12'
  }
  return (
    <svg
      className={`${sizes[size]} ml-[-2.5px] mr-[-2.5px] text-gray-800 dark:text-white`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
      <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}
