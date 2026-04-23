import React, { useEffect, useState } from 'react'
import { useAioha } from '@aioha/providers/react'
import { LoginModal, LoginModalProps } from './LoginModal.js'
import { UserModal, UserModalProps } from './UserModal.js'
import { SwitchUserModal } from './SwitchUserModal.js'
import { defaultMessages, MessagesProvider, useMessages, type Messages } from '../i18n.js'

interface ModalProps extends LoginModalProps, Omit<UserModalProps, 'onSwitchUser'> {
  displayed?: boolean
  language?: string
  dir?: 'ltr' | 'rtl' | 'auto'
  messages?: Messages
}

const AiohaModalInner = ({
  displayed = false,
  dir = 'auto',
  loginTitle,
  loginHelpUrl,
  loginOptions,
  discOptions,
  forceShowProviders = [],
  arrangement = 'list',
  imageServer,
  explorerUrl,
  onLogin,
  onClose
}: ModalProps) => {
  const { aioha, user, otherUsers } = useAioha()
  const m = useMessages()
  const isInactive = Object.keys(otherUsers).length > 0 && !aioha.isLoggedIn()
  const [switchingUser, setSwitchingUser] = useState<boolean>(isInactive)
  const [addingAcc, setAddingAcc] = useState<boolean>(false)

  if (!displayed) return <></>
  const resolvedDir: 'ltr' | 'rtl' =
    dir === 'auto' ? (typeof document !== 'undefined' && document.dir === 'rtl' ? 'rtl' : m.getDir()) : dir
  return (
    <div
      id="aioha-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aioha-modal-title"
      dir={resolvedDir}
      className="overflow-y-auto overflow-x-hidden fixed top-0 inset-x-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black/60"
      onMouseDown={() => onClose(false)}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(false) }}
    >
      <div className={`relative p-4 ${arrangement === 'grid' ? 'md:max-w-xl max-w-md' : 'max-w-md'} max-h-full`}>
        <div
          className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 min-w-sm"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {aioha.isLoggedIn() || Object.keys(otherUsers).length > 0 ? (
            switchingUser ? (
              !addingAcc ? (
                <SwitchUserModal
                  onClose={onClose}
                  onSelect={(newUser: string) => {
                    if (newUser !== user) aioha.switchUser(newUser)
                    setSwitchingUser(false)
                  }}
                  onAddAcc={() => setAddingAcc(true)}
                />
              ) : (
                <LoginModal
                  loginTitle={m.t('user.addAccount')}
                  loginHelpUrl={loginHelpUrl}
                  loginOptions={loginOptions}
                  discOptions={discOptions}
                  arrangement={arrangement}
                  forceShowProviders={forceShowProviders}
                  onLogin={(r) => {
                    setAddingAcc(false)
                    setSwitchingUser(false)
                    if (typeof onLogin === 'function') onLogin(r)
                  }}
                  onClose={onClose}
                  onCancel={() => setAddingAcc(false)}
                />
              )
            ) : (
              <UserModal
                imageServer={imageServer}
                explorerUrl={explorerUrl}
                onClose={onClose}
                onSwitchUser={() => setSwitchingUser(true)}
              />
            )
          ) : (
            <LoginModal
              loginTitle={loginTitle}
              loginHelpUrl={loginHelpUrl}
              loginOptions={loginOptions}
              discOptions={discOptions}
              arrangement={arrangement}
              forceShowProviders={forceShowProviders}
              onLogin={(r) => {
                setSwitchingUser(false)
                if (typeof onLogin === 'function') onLogin(r)
              }}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const AiohaModal = (props: ModalProps) => {
  const { language = 'en', messages, ...rest } = props
  useEffect(() => {
    ;(messages ?? defaultMessages).setLocale(language)
  }, [language, messages])
  return (
    <MessagesProvider messages={messages}>
      <AiohaModalInner {...rest} />
    </MessagesProvider>
  )
}
