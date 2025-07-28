import React, { useState } from 'react'
import { useAioha, AiohaModal } from '../lib'
import { KeyTypes } from '@aioha/aioha'
import { ChainIcon } from './Icons'

export const Home = () => {
  const [aiohaModalDisplayed, setAiohaModalDisplayed] = useState(false)
  const { user } = useAioha()
  return (
    <>
      <button
        type="button"
        className="ah:text-gray-900 ah:bg-white ah:hover:bg-gray-100 ah:border ah:border-gray-200 ah:focus:outline-hidden ah:focus:ring-gray-100 ah:hover:cursor-pointer ah:font-medium ah:rounded-lg ah:text-sm ah:px-5 ah:py-2.5 ah:text-center ah:items-center ah:dark:focus:ring-gray-600 ah:dark:bg-gray-800 ah:dark:border-gray-700 ah:dark:text-white ah:dark:hover:bg-gray-700"
        onClick={() => setAiohaModalDisplayed(true)}
      >
        {user ?? (
          <div className="ah:inline-flex">
            <ChainIcon />
            Connect Wallet
          </div>
        )}
      </button>
      <AiohaModal
        displayed={aiohaModalDisplayed}
        loginOptions={{
          msg: 'Hello World',
          keyType: KeyTypes.Posting
        }}
        arrangement="grid"
        onClose={setAiohaModalDisplayed}
      />
    </>
  )
}
