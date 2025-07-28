import React, { useEffect } from 'react'
import { hivesignerCb } from '@aioha/aioha/build/lib/hivesigner-cb.js'

export const HiveSignerCb = () => {
  useEffect(() => hivesignerCb(), [])
  return <p className="ah:ml-2 ah:text-black ah:dark:text-white">Redirecting back to Aioha app...</p>
}
