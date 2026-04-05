import React from 'react'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { QRCode } from 'react-qr-code'

export const HiveAuthQR = ({ payload, cancel }: { payload: string; cancel: () => void }) => {
  const { t } = useTranslation('aioha')
  return (
    <>
      <p className="text-sm font-normal max-w-[375px] text-gray-500 dark:text-gray-300">
        {t('hiveAuthInstruction')}
      </p>
      <a href={payload} aria-label={t('openHiveAuthLink')}>
        <div className="bg-white p-4 w-64 aspect-square mx-auto my-5">
          <QRCode value={payload} className="w-full h-full" />
        </div>
      </a>
      <div className="w-full flex place-content-center">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-hidden hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800 cursor-pointer"
          onClick={cancel}
        >
          {t('cancel')}
        </button>
      </div>
    </>
  )
}
