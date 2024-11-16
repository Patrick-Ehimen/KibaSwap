"use client";

import React from "react";

import BitcoinChart from "@/features/markets/market-charts/bitcoin-chart";
import EthereumChart from "@/features/markets/market-charts/ethereum-chart";
import UsdtChart from "@/features/markets/market-charts/usdt-chart";
import SolanaChart from "@/features/markets/market-charts/solana-chart";
import RadialChart from "@/features/markets/market-charts/radial-chart";

export default function Tokens() {
  return (
    <main className="mx-10 lg:mx-20 my-10">
      <div className="hidden md:flex">
        <BitcoinChart />
        <EthereumChart />
        <UsdtChart />
        <SolanaChart />
        <div>
          <RadialChart />
        </div>
      </div>
    </main>
  );
}
