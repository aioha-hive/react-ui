import React from 'react'
import { CloseIcon } from './Icons.js'

const sizes: { [s: number]: string } = {
  7: 'w-7',
  12: 'w-12'
}

export const RightAngledArrow = ({ w = 7 }: { w?: number }) => {
  return (
    <td className={`px-1 py-4 ${sizes[w]} whitespace-nowrap`}>
      <svg
        className="w-4 h-4 mx-auto text-gray-400 dark:text-gray-500 opacity-70"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </td>
  )
}

export const RmRowIcon = ({ w = 7 }: { w?: number }) => {
  return (
    <td className={`px-1 py-4 ${sizes[w]} whitespace-nowrap text-gray-800 dark:text-gray-100`}>
      <CloseIcon />
    </td>
  )
}
