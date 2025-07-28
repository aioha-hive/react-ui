import React from 'react'
import { CloseIcon } from '../icons/CloseIcon.js'

const sizes: { [s: number]: string } = {
  7: 'ah:w-7',
  12: 'ah:w-12'
}

export const RightAngledArrow = ({ w = 7 }: { w?: number }) => {
  return (
    <td className={`ah:px-1 ah:py-4 ${sizes[w]} ah:whitespace-nowrap`}>
      <svg
        className="ah:w-4 ah:h-4 ah:mx-auto ah:text-gray-400 ah:dark:text-gray-500 ah:opacity-70"
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
    <td className={`ah:px-1 ah:py-4 ${sizes[w]} ah:whitespace-nowrap ah:text-gray-800 ah:dark:text-gray-100`}>
      <CloseIcon />
    </td>
  )
}
