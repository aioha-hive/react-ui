import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAioha } from '@aioha/providers/react'
import { LoginModal, LoginModalProps } from './LoginModal.js'
import { UserModal, UserModalProps } from './UserModal.js'
import { SwitchUserModal } from './SwitchUserModal.js'
import { defaultMessages, MessagesProvider, useMessages, type Messages } from '../i18n.js'

const SizeTransition = ({ children }: { children: React.ReactNode }) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number | undefined>(undefined)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [ready, setReady] = useState(false)
  useLayoutEffect(() => {
    const el = innerRef.current
    if (!el) return
    setWidth(el.offsetWidth)
    setHeight(el.offsetHeight)
    const id = setTimeout(() => setReady(true), 200)
    const ro = new ResizeObserver(() => {
      setWidth(el.offsetWidth)
      setHeight(el.offsetHeight)
    })
    ro.observe(el)
    return () => {
      clearTimeout(id)
      ro.disconnect()
    }
  }, [])
  const sizeStyle: React.CSSProperties = {}
  if (width !== undefined) sizeStyle.width = `${width}px`
  if (height !== undefined) sizeStyle.height = `${height}px`
  return (
    <div
      style={width !== undefined ? sizeStyle : undefined}
      className={`overflow-hidden ${ready ? 'transition-[width,height] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none' : ''}`}
    >
      <div ref={innerRef} className="w-max min-w-sm">{children}</div>
    </div>
  )
}

const VIEW_ORDER: Record<string, number> = { login: 0, user: 1, switch: 2, add: 3 }

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

  const [isMounted, setIsMounted] = useState<boolean>(displayed)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  useEffect(() => {
    if (displayed) {
      setIsMounted(true)
      const id = requestAnimationFrame(() => setIsOpen(true))
      return () => cancelAnimationFrame(id)
    } else if (isMounted) {
      setIsOpen(false)
      const id = setTimeout(() => setIsMounted(false), 200)
      return () => clearTimeout(id)
    }
  }, [displayed])

  const viewKey =
    aioha.isLoggedIn() || Object.keys(otherUsers).length > 0
      ? switchingUser
        ? addingAcc
          ? 'add'
          : 'switch'
        : 'user'
      : 'login'
  const [viewIn, setViewIn] = useState<boolean>(true)
  const [viewDir, setViewDir] = useState<'fwd' | 'back'>('fwd')
  const prevKey = useRef(viewKey)
  useLayoutEffect(() => {
    if (prevKey.current !== viewKey) {
      setViewDir((VIEW_ORDER[viewKey] ?? 0) >= (VIEW_ORDER[prevKey.current] ?? 0) ? 'fwd' : 'back')
      prevKey.current = viewKey
      setViewIn(false)
      let inner: number | undefined
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setViewIn(true))
      })
      return () => {
        cancelAnimationFrame(outer)
        if (inner !== undefined) cancelAnimationFrame(inner)
      }
    }
  }, [viewKey])

  if (!isMounted) return <></>
  const resolvedDir: 'ltr' | 'rtl' =
    dir === 'auto' ? (typeof document !== 'undefined' && document.dir === 'rtl' ? 'rtl' : m.getDir()) : dir
  const viewCls = `transition-[opacity,translate,scale] duration-200 motion-reduce:transition-none ease-[cubic-bezier(0.32,0.72,0,1)] ${
    viewIn
      ? 'opacity-100 translate-x-0'
      : viewDir === 'fwd'
        ? 'opacity-0 translate-x-2'
        : 'opacity-0 -translate-x-2'
  }`
  return (
    <div
      id="aioha-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aioha-modal-title"
      dir={resolvedDir}
      className={`overflow-y-auto overflow-x-hidden fixed top-0 inset-x-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black/60 transition-opacity duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseDown={() => onClose(false)}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(false) }}
    >
      <div className={`relative p-4 ${arrangement === 'grid' ? 'md:max-w-xl max-w-md' : 'max-w-md'} max-h-full`}>
        <div
          className={`relative bg-white rounded-lg shadow-sm dark:bg-gray-700 transition-[opacity,translate,scale] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
            isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
          }`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <SizeTransition>
          <div className={viewCls}>
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
          </SizeTransition>
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
