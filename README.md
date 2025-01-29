# Aioha React UI

Opinionated React modal UI for Hive logins through Aioha, styled using [Tailwind CSS](https://tailwindcss.com). This provides a quick and easy way to bootstrap a React web app with ready to use Aioha-powered modal component.

## Installation

```sh
pnpm i @aioha/react-ui @aioha/aioha
```

## Usage

1. Initialize Aioha and setup the provider at the root of your application. This may be in `index.jsx`, `index.tsx` or `App.tsx` depending on the framework you use.

```tsx
import { initAioha } from '@aioha/aioha'
import { AiohaProvider } from '@aioha/react-ui'

// See options: https://aioha.dev/docs/core/usage#instantiation
const aioha = initAioha()

const App = () => {
  return (
    <AiohaProvider aioha={aioha}>
      <TheRestOfYourApplication />
    </AiohaProvider>
  )
}
```

2. Use the modal component and the [`useAioha()` hook](https://aioha.dev/docs/react/provider#usage) anywhere within `AiohaProvider`.

If your application is primarily styled using Tailwind CSS, it is not required to import `@aioha/react-ui/dist/build.css`.

```tsx
import { useState } from 'react'
import { useAioha, AiohaModal } from '@aioha/react-ui'
import { KeyTypes } from '@aioha/aioha'
import { Button, useColorMode } from '@chakra-ui/react'
import '@aioha/react-ui/dist/build.css'

export const AiohaPage = () => {
  const { colorMode } = useColorMode()
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const { user } = useAioha()
  return (
    <>
      <Button onClick={() => setModalDisplayed(true)}>
        {user ?? 'Connect Wallet'}
      </Button>
      <div className={colorMode}>
        <AiohaModal
          displayed={modalDisplayed}
          loginOptions={{
            msg: 'Login',
            keyType: KeyTypes.Posting
          }}
          onLogin={console.log}
          onClose={setModalDisplayed}
        />
      </div>
    </>
  )
}
```

## `AiohaModal` component

|Property|Required?|Description|Default|
|-|-|-|-|
|`displayed`|✅|Boolean of whether the modal is displayed.|*false*|
|`loginTitle`|❌|Login title to be displayed.|Connect Wallet|
|`loginHelpUrl`|❌|Help URL to be linked under provider selection view, if any.|*undefined*|
|`loginOptions`|✅|Aioha login options. See available configuration [here](https://aioha.dev/docs/core/usage#login).||
|`onLogin`|❌|Callback function to be called upon successful login, if any. Parameter contains login result as defined [here](https://aioha.dev/docs/core/usage#login).|
|`onClose`|✅|Function to be called to close the modal.||
|`imageServer`|❌|Image server URL for user avatar.|https://images.hive.blog|
|`explorerUrl`|❌|Hive block explorer URL.|https://hivehub.dev|
|`forceShowProviders`|❌|List of `Providers` to force show as login option, which must be registered already. Clicking on unavailable providers displayed will open the URL of the provider landing page.|*[]*|

ℹ️ Note: `hiveauth.cbWait` in `loginOptions` will be overriden as `AiohaModal` will handle the presentation of HiveAuth QR codes.