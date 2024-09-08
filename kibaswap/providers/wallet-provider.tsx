// This line is a Next.js directive to enable client-side rendering for this component
"use client";

// Importing necessary libraries and components
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // For managing data fetching and caching
import { WagmiProvider } from "wagmi"; // For Web3 functionality
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"; // For wallet and theme management
import { config } from "@/config/wagmi"; // Importing Wagmi configuration

// Creating a new instance of QueryClient for managing queries
const queryClient = new QueryClient();

// The WalletProviders component wraps children with necessary providers for Web3 and theme functionality
export function WalletProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      {" "}
      {/* Providing Wagmi configuration */}
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* Providing QueryClient for query management */}
        {/* Customizing the dark theme for RainbowKit */}
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#E33319",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
