import { useContext, useState } from 'react'
import { LoginModal, AiohaContext } from '../lib'
import { KeyTypes } from '@aioha/aioha'

export const Home = () => {
  const [aiohaModalDisplayed, setAiohaModalDisplayed] = useState(false)
  const aioha = useContext(AiohaContext)
  return (
    <>
      <button
        type="button"
        data-modal-target="crypto-modal"
        data-modal-toggle="crypto-modal"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        onClick={() => setAiohaModalDisplayed(true)}
      >
        {aioha.isLoggedIn() ? (
          aioha.getCurrentUser()
        ) : (
          <div>
            <svg
              aria-hidden="true"
              className="w-4 h-4 me-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              ></path>
            </svg>
            'Connect Wallet'
          </div>
        )}
      </button>
      <LoginModal
        displayed={aiohaModalDisplayed}
        loginOptions={{
          msg: 'Hello World',
          keyType: KeyTypes.Posting
        }}
        onClose={setAiohaModalDisplayed}
      />
    </>
  )
}
