import { Providers } from '@aioha/aioha'
import KeychainIcon from '../icons/keychain.svg'
import PeakVaultIcon from '../icons/peakvault.svg'
import HiveAuthIcon from '../icons/hiveauth-light.svg'
import HiveAuthIconDark from '../icons/hiveauth-dark.svg'
import HiveSignerIcon from '../icons/hivesigner.svg'
import LedgerIcon from '../icons/ledger-light.svg'
import LedgerIconDark from '../icons/ledger-dark.svg'

export const ProviderInfo: {
  [provider in Providers]: {
    name: string
    icon: string
    iconDark?: string
    loginBadge?: string
  }
} = {
  [Providers.Keychain]: {
    name: 'Keychain',
    icon: KeychainIcon,
    loginBadge: 'Popular'
  },
  [Providers.PeakVault]: {
    name: 'Peak Vault',
    icon: PeakVaultIcon
  },
  [Providers.HiveAuth]: {
    name: 'HiveAuth',
    icon: HiveAuthIcon,
    iconDark: HiveAuthIconDark
  },
  [Providers.HiveSigner]: {
    name: 'HiveSigner',
    icon: HiveSignerIcon
  },
  [Providers.Ledger]: {
    name: 'Ledger',
    icon: LedgerIcon,
    iconDark: LedgerIconDark
  },
  [Providers.Custom]: {
    name: 'Other Wallet',
    icon: ''
  }
}
