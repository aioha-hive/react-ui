import { Dispatch, SetStateAction } from 'react'

interface LoginModalProps {
  displayed?: boolean
  title?: string
  onClose: Dispatch<SetStateAction<boolean>>
}

export const AiohaLoginModal = ({ displayed = false, title = 'Connect Wallet', onClose }: LoginModalProps) => {
  return (
    <div
      id="aioha-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        displayed ? '' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-30`}
      onClick={() => onClose(false)}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="aioha-modal"
              onClick={() => onClose(false)}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Connect with one of our available Hive wallet providers.
            </p>
            <ul className="my-4 space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <svg className="h-5 aspect-square">
                    <image href="/keychain.svg" className="h-5" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Keychain</span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                    Popular
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <svg aria-hidden="true" className="h-5 aspect-square">
                    <image href="/peakvault.svg" className="h-5" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Peak Vault</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <svg aria-hidden="true" className="h-5 aspect-square">
                    <image href="/hivesigner.svg" className="h-5" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">HiveSigner</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <svg className="h-5 aspect-square">
                    <image href="/hiveauth-light.svg" className="h-5 block dark:hidden" />
                    <image href="/hiveauth-dark.svg" className="h-5 hidden dark:block" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">HiveAuth</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <svg className="h-4 w-5">
                    <image href="/ledger-light.svg" className="h-4 block dark:hidden" />
                    <image href="/ledger-dark.svg" className="h-4 hidden dark:block" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Ledger</span>
                </a>
              </li>
            </ul>
            <div>
              <a
                href="#"
                className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  className="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Why do I need to connect with my wallet?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
