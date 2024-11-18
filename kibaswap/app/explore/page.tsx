"use client";

import React, { useEffect, useState } from "react";

import BitcoinChart from "@/features/markets/market-charts/bitcoin-chart";
import EthereumChart from "@/features/markets/market-charts/ethereum-chart";
import UsdtChart from "@/features/markets/market-charts/usdt-chart";
import SolanaChart from "@/features/markets/market-charts/solana-chart";
import RadialChart from "@/features/markets/market-charts/radial-chart";
import MarketData from "@/features/markets/markets-tokens-details/market-data";

export default function Tokens() {
  return (
    <main className="mx-10 lg:mx-20 my-10">
      <div className="">
        <p className="text-gray-400 font-bold text-[24px] my-3 mx-2">
          Total MarketCap: $3.05 T
        </p>
        <p className="text-gray-400 font-bold text-[24px] my-3 mx-2">
          Top Four Cryptos by MarketCap
        </p>
        <div className="flex">
          <div className="hidden md:flex bg-[#23242F] h-fit rounded-lg p-2">
            {/* <BitcoinChart />
            <EthereumChart />
            <UsdtChart />
            <SolanaChart /> */}
          </div>
          <div className="ml-52 -mt-24">
            <RadialChart />
          </div>
        </div>
        <div className="mt-10">
          <MarketData />
        </div>
      </div>
    </main>
  );
}
