import React, { useEffect, useState } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { useAioha } from '@aioha/providers/react'
import { LoginModal, LoginModalProps } from './LoginModal.js'
import { UserModal, UserModalProps } from './UserModal.js'
import { SwitchUserModal } from './SwitchUserModal.js'
import { i18n } from '../i18n.js'

interface ModalProps extends LoginModalProps, Omit<UserModalProps, 'onSwitchUser'> {
  displayed?: boolean
  language?: string
}

const AiohaModalInner = ({
  displayed = false,
  language = 'en',
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
  const { t } = useTranslation('aioha')
  const isInactive = Object.keys(otherUsers).length > 0 && !aioha.isLoggedIn()
  const [switchingUser, setSwitchingUser] = useState<boolean>(isInactive)
  const [addingAcc, setAddingAcc] = useState<boolean>(false)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  if (!displayed) return <></>
  return (
    <div
      id="aioha-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aioha-modal-title"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black/60"
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
                  loginTitle={t('addAccount')}
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
  return (
    <I18nextProvider i18n={i18n}>
      <AiohaModalInner {...props} />
    </I18nextProvider>
  )
}
