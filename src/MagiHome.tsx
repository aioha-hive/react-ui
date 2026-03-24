import React, { useState } from 'react'
import { MagiProvider, useMagi, MagiModal } from '../lib/magi'
import { Magi } from '@aioha/magi'
import { KeyTypes } from '@aioha/aioha'
import { useAppKit } from '@reown/appkit/react'
import { ChainIcon } from './Icons'

const MagiContent = () => {
  const [magiModalDisplayed, setMagiModalDisplayed] = useState(false)
  const { user, wallet } = useMagi()
  const { open } = useAppKit()
  return (
    <>
      <button
        type="button"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-hidden focus:ring-gray-100 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        onClick={() => setMagiModalDisplayed(true)}
      >
        {user ? (
          <span>
            {user} ({wallet})
          </span>
        ) : (
          <div className="inline-flex">
            <ChainIcon />
            Connect Magi Wallet
          </div>
        )}
      </button>
      <MagiModal
        displayed={magiModalDisplayed}
        loginOptions={{
          msg: 'Hello World',
          keyType: KeyTypes.Posting
        }}
        openEthModal={open}
        onClose={setMagiModalDisplayed}
      />
    </>
  )
}

export const MagiHome = ({ magi }: { magi: Magi }) => {
  return (
    <MagiProvider magi={magi}>
      <MagiContent />
    </MagiProvider>
  )
}
