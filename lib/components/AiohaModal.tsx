import { useContext } from 'react'
import { AiohaContext } from './AiohaContext'
import { LoginModal, LoginModalProps } from './LoginModal'
import { UserModal } from './UserModal'

interface ModalProps extends LoginModalProps {
  displayed?: boolean
}

export const AiohaModal = ({ displayed = false, loginTitle, loginOptions, onLogin, onClose }: ModalProps) => {
  const aioha = useContext(AiohaContext)
  return (
    <div
      id="aioha-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        displayed ? '' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-30`}
      onMouseDown={() => onClose(false)}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" onMouseDown={(e) => e.stopPropagation()}>
          {aioha.isLoggedIn() ? (
            <UserModal onClose={onClose} />
          ) : (
            <LoginModal loginTitle={loginTitle} loginOptions={loginOptions} onLogin={onLogin} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}
