import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, sepolia } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'ecaad0407192fae67912fb4f81143d30'

const { chains, publicClient, webSocketPublicClient } = configureChains(
 [goerli],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
