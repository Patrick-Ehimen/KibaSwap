// Importing the default configuration from RainbowKit
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
// Importing various blockchain networks from Wagmi
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  bsc,
  avalanche,
  sepolia,
  avalancheFuji,
} from "wagmi/chains";
// Importing various wallet options from RainbowKit
import {
  phantomWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";

// Defining the wallet groups and their respective wallets
const wallets = [
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet,
      phantomWallet,
      rainbowWallet,
      coinbaseWallet,
      walletConnectWallet,
    ],
  },
  {
    groupName: "Others",
    wallets: [argentWallet, trustWallet, ledgerWallet],
  },
];

const id = "a07d3fd03a42be9708dadd3ac613a55e";
console.log(
  "NEXT_PUBLIC_ENABLE_TESTNETS",
  process.env.NEXT_PUBLIC_ENABLE_TESTNETS
);

// Exporting the configuration for Wagmi
export const config = getDefaultConfig({
  // Setting the application name
  appName: "KibaSwap",
  // Setting the project ID from environment variables
  projectId: id,
  // Defining the blockchain networks to support
  chains: [
    mainnet,
    arbitrum,
    optimism,
    polygon,
    base,
    bsc,
    avalanche,
    sepolia,
    avalancheFuji,
    // Conditionally adding Sepolia network if testnets are enabled
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    //   ? [sepolia, avalancheFuji]
    //   : []),
  ],
  // Enabling server-side rendering
  ssr: true,
  // Setting the wallet options
  wallets,
});
