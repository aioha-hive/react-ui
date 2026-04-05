import React, { useEffect, useState } from 'react'
import { Wallet } from '@aioha/magi'
import { useAioha } from '@aioha/providers/react'
import { useMagi } from '@aioha/providers/magi/react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { LoginModal, LoginModalProps } from './LoginModal.js'
import { UserModal, UserModalProps } from './UserModal.js'
import { SwitchUserModal } from './SwitchUserModal.js'
import { WalletTypeSelection } from './magi/WalletTypeSelection.js'
import { CloseIcon } from './Icons.js'
import { i18n } from '../i18n.js'

type MagiView = 'select' | 'hive' | 'ethereum'

interface MagiModalProps extends LoginModalProps, Omit<UserModalProps, 'onSwitchUser'> {
  displayed?: boolean
  language?: string
  openEthModal: () => void
}

const MagiModalInner = ({
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
  openEthModal,
  onLogin,
  onClose
}: MagiModalProps) => {
  const { aioha, user: hiveUser, otherUsers } = useAioha()
  const { magi, wallet } = useMagi()
  const { t } = useTranslation('aioha')

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  const getInitialView = (): MagiView => {
    if (magi.getWallet() === Wallet.Hive && aioha.isLoggedIn()) return 'hive'
    return 'select'
  }

  const [view, setView] = useState<MagiView>(getInitialView)
  const [switchingUser, setSwitchingUser] = useState(false)
  const [addingAcc, setAddingAcc] = useState(false)

  useEffect(() => {
    if (displayed) setView(getInitialView())
  }, [displayed])

  // Auto-close when Ethereum wallet connects via wagmi
  useEffect(() => {
    if (wallet === Wallet.Ethereum && magi.isConnected()) {
      onClose(false)
    }
  }, [wallet])

  const handleSelectEthereum = () => {
    setView('ethereum')
    openEthModal()
  }

  const handleHiveLogin = (r: any) => {
    setSwitchingUser(false)
    setView('hive')
    if (typeof onLogin === 'function') onLogin(r)
  }

  if (!displayed) return null

  if (wallet === Wallet.Ethereum && magi.isConnected()) {
    openEthModal()
    onClose(false)
    return null
  }

  const renderHiveView = () => {
    const isInactive = Object.keys(otherUsers).length > 0 && !aioha.isLoggedIn()
    if (aioha.isLoggedIn() || Object.keys(otherUsers).length > 0) {
      if (switchingUser || isInactive) {
        if (addingAcc) {
          return (
            <LoginModal
              loginTitle={t('addAccount')}
              loginHelpUrl={loginHelpUrl}
              loginOptions={loginOptions}
              discOptions={discOptions}
              arrangement={arrangement}
              forceShowProviders={forceShowProviders}
              onLogin={(r) => {
                setAddingAcc(false)
                handleHiveLogin(r)
              }}
              onClose={onClose}
              onCancel={() => setAddingAcc(false)}
            />
          )
        }
        return (
          <SwitchUserModal
            onClose={onClose}
            onSelect={(newUser: string) => {
              if (newUser !== hiveUser) aioha.switchUser(newUser)
              setSwitchingUser(false)
            }}
            onAddAcc={() => setAddingAcc(true)}
          />
        )
      }
      return (
        <UserModal
          imageServer={imageServer}
          explorerUrl={explorerUrl}
          onClose={onClose}
          onSwitchUser={() => setSwitchingUser(true)}
        />
      )
    }
    return (
      <LoginModal
        loginTitle={loginTitle}
        loginHelpUrl={loginHelpUrl}
        loginOptions={loginOptions}
        discOptions={discOptions}
        arrangement={arrangement}
        forceShowProviders={forceShowProviders}
        onLogin={handleHiveLogin}
        onClose={onClose}
        onCancel={() => setView('select')}
      />
    )
  }

  const renderEthView = () => {
    return (
      <>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 id="aioha-modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">{t('connectEthWallet')}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            onClick={() => onClose(false)}
          >
            <CloseIcon srDesc={t('closeModal')} />
          </button>
        </div>
        <div className="p-4 md:p-5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{t('ethWalletInstruction')}</p>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800 enabled:hover:cursor-pointer"
            onClick={() => setView('select')}
          >
            {t('back')}
          </button>
        </div>
      </>
    )
  }

  const renderSelectView = () => {
    return (
      <>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 id="aioha-modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">{t('connectWallet')}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            onClick={() => onClose(false)}
          >
            <CloseIcon srDesc={t('closeModal')} />
          </button>
        </div>
        <div className="p-4 md:p-5">
          <WalletTypeSelection
            onSelectHive={() => setView('hive')}
            onSelectEthereum={handleSelectEthereum}
            onCancel={magi.isConnected() ? () => setView('hive') : undefined}
          />
        </div>
      </>
    )
  }

  return (
    <div
      id="magi-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aioha-modal-title"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black/60"
      onMouseDown={() => onClose(false)}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(false) }}
    >
      <div className="relative p-4 max-w-md max-h-full">
        <div
          className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 min-w-sm"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {view === 'select'
            ? renderSelectView()
            : view === 'hive'
              ? renderHiveView()
              : view === 'ethereum'
                ? renderEthView()
                : null}
        </div>
      </div>
    </div>
  )
}

export const MagiModal = (props: MagiModalProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <MagiModalInner {...props} />
    </I18nextProvider>
  )
}
