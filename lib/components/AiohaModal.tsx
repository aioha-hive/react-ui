import React, { useState } from 'react'
import { useAioha } from '@aioha/react-provider'
import { LoginModal, LoginModalProps } from './LoginModal.js'
import { UserModal, UserModalProps } from './UserModal.js'
import { SwitchUserModal } from './SwitchUserModal.js'

interface ModalProps extends LoginModalProps, Omit<UserModalProps, 'onSwitchUser'> {
  displayed?: boolean
}

export const AiohaModal = ({
  displayed = false,
  loginTitle,
  loginHelpUrl,
  loginOptions,
  forceShowProviders = [],
  arrangement = 'list',
  onLogin,
  onClose
}: ModalProps) => {
  const { aioha, user, otherUsers } = useAioha()
  const isInactive = Object.keys(otherUsers).length > 0 && !aioha.isLoggedIn()
  const [switchingUser, setSwitchingUser] = useState<boolean>(isInactive)
  const [addingAcc, setAddingAcc] = useState<boolean>(false)
  return (
    <div
      id="aioha-modal"
      tabIndex={-1}
      className={`${
        displayed ? '' : 'ah:hidden'
      } ah:overflow-y-auto ah:overflow-x-hidden ah:fixed ah:top-0 ah:right-0 ah:left-0 ah:z-50 ah:flex ah:justify-center ah:items-center ah:w-full ah:md:inset-0 ah:h-full ah:bg-black ah:bg-opacity-30`}
      onMouseDown={() => onClose(false)}
    >
      <div
        className={`ah:relative ah:p-4 ${arrangement === 'grid' ? 'ah:md:max-w-xl ah:max-w-md' : 'ah:max-w-md'} ah:max-h-full`}
      >
        <div
          className="ah:relative ah:bg-white ah:rounded-lg ah:shadow-sm ah:dark:bg-gray-700 ah:min-w-sm"
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
                  loginTitle={'Add Account'}
                  loginHelpUrl={loginHelpUrl}
                  loginOptions={loginOptions}
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
              <UserModal onClose={onClose} onSwitchUser={() => setSwitchingUser(true)} />
            )
          ) : (
            <LoginModal
              loginTitle={loginTitle}
              loginHelpUrl={loginHelpUrl}
              loginOptions={loginOptions}
              arrangement={arrangement}
              forceShowProviders={forceShowProviders}
              onLogin={onLogin}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  )
}
