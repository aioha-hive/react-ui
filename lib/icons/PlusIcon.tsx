import React from 'react'

export const PlusIcon = ({ size = 6, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={`w-${size} h-${size} text-gray-800 dark:text-white`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7 7V5" />
    </svg>
  )
}
