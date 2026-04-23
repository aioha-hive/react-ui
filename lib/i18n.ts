import React, { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react'
import {
  createDefaultMessages,
  type Catalog,
  type DefaultMessages,
  type Messages
} from '@aioha/i18n-keys'

export { createDefaultMessages } from '@aioha/i18n-keys'
export type { Messages, DefaultMessages, MessageId, Catalog, MessageVars, Direction } from '@aioha/i18n-keys'

export const defaultMessages: DefaultMessages = createDefaultMessages({ initialLocale: 'en' })

const MessagesContext = createContext<Messages>(defaultMessages)

export const MessagesProvider = ({ messages, children }: { messages?: Messages; children: ReactNode }) => {
  return React.createElement(MessagesContext.Provider, { value: messages ?? defaultMessages }, children)
}

export function useMessages(): Messages {
  const messages = useContext(MessagesContext)
  useSyncExternalStore(
    (cb) => messages.subscribe(cb),
    () => messages.getLocale(),
    () => messages.getLocale()
  )
  return messages
}

export function loadLocale(locale: string, catalog: Partial<Catalog>): void {
  defaultMessages.addCatalog(locale, catalog)
}
