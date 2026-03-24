import React from 'react'
import { HiveSignerCb } from '../lib'
import { initAioha } from '@aioha/aioha'
import { AiohaProvider, HiveSignerOcl } from '../lib'
import { Home } from './Home'
import { MagiHome } from './MagiHome'
import { Magi } from '@aioha/magi'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'

const aioha = initAioha({
  hivesigner: {
    app: 'ipfsuploader.app',
    callbackURL: window.location.origin + '/hivesigner',
    scope: ['login', 'vote']
  },
  hiveauth: {
    name: 'Aioha React'
  }
})

aioha.registerViewOnly()

const magi = new Magi()
magi.setAioha(aioha)

const queryClient = new QueryClient()
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet],
  projectId
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
  projectId,
  metadata: {
    name: 'Aioha React UI',
    description: 'Aioha React UI Demo',
    url: window.location.origin,
    icons: []
  }
})

export const App = () => {
  if (window.location.pathname === '/hivesigner')
    return (
      <div className="dark">
        <div className="min-h-screen min-w-full dark:bg-gray-800">
          <HiveSignerCb />
        </div>
      </div>
    )
  return (
    <div className="dark">
      <div className="min-h-screen min-w-full dark:bg-gray-800">
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AiohaProvider aioha={aioha}>
              {window.location.pathname === '/hivesigner-ocl' ? (
                <HiveSignerOcl onSuccess={() => (window.location.pathname = '/')} />
              ) : window.location.pathname === '/magi' ? (
                <MagiHome magi={magi} />
              ) : (
                <Home />
              )}
            </AiohaProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </div>
    </div>
  )
}
