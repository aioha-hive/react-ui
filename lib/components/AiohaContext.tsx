import { createContext, ReactNode } from 'react'
import { Aioha } from '@aioha/aioha'

const defaultAioha = new Aioha()

export const AiohaContext = createContext(defaultAioha)

export const AiohaProvider = ({ aioha, children }: { aioha: Aioha; children: ReactNode }) => {
  return <AiohaContext.Provider value={aioha}>{children}</AiohaContext.Provider>
}
