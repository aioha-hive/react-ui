import React from 'react'
import { hivesignerCb } from '@aioha/aioha/build/lib/hivesigner-cb'

export const HiveSignerCb = () => {
  hivesignerCb()
  return <p className="ml-2 text-black dark:text-white">Redirecting back to Aioha app...</p>
}
