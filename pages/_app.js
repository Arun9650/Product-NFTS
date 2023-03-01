import '../styles/globals.css'
import { AppContext } from '../utils/context'
import { ThemeProvider } from "@material-tailwind/react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';



function MyApp({ Component, pageProps }) {



  const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [
      alchemyProvider({ apiKey: 'MWDD2DprrMhhaZX6Fnl-490KnsFnvOOM' }),
     
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })


  return (
    <AppContext>
      <ThemeProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </AppContext>
  )
}

export default MyApp
