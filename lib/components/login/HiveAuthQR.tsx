import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { QRCode } from 'react-qr-code'

export const HiveAuthQR = ({ payload, cancel }: { payload: string; cancel: () => void }) => {
  return (
    <>
      <p className="ah:text-sm ah:font-normal ah:max-w-[375px] ah:text-gray-500 ah:dark:text-gray-400">
        Scan the QR code using a HiveAuth-compatible mobile app.
      </p>
      <a href={payload}>
        <div className="ah:bg-white ah:p-4 ah:w-64 ah:aspect-square ah:mx-auto ah:my-5">
          <QRCode value={payload} className="ah:w-full ah:h-full" />
        </div>
      </a>
      <div className="ah:w-full ah:flex ah:place-content-center">
        <button
          type="button"
          className="ah:text-gray-900 ah:bg-white ah:border ah:border-gray-300 ah:focus:outline-hidden ah:hover:bg-gray-100 ah:font-medium ah:rounded-lg ah:text-sm ah:px-5 ah:py-2.5 ah:dark:bg-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-800"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
