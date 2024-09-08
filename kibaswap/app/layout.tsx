import type { Metadata } from "next";
import { poppins } from "@/fonts/font";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { WalletProviders } from "@/providers/wallet-provider";
import { NextProvidersUi } from "@/providers/next-ui-provider";

import Navbarr from "@/components/ux/navbar";

import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "Kibaswap - A multichain web3 dex.",
  description:
    "Trade, earn, and own your crypto on the all-in-one multichain DEX",
  keywords: "web3, dapp, dex, exchange, decentralized",
  openGraph: {
    url: "/",
    title: "Kibaswap - A multichain web3 dex.",
    description:
      "Trade, earn, and own your crypto on the all-in-one multichain DEX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // TODO image to be added later
    title: "Kibaswap - A multichain web3 dex.",
    description:
      "Trade, earn, and own your crypto on the all-in-one multichain DEX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextProvidersUi>
            <WalletProviders>
              <Navbarr />
              {children}
            </WalletProviders>
          </NextProvidersUi>
        </ThemeProvider>
      </body>
    </html>
  );
}
