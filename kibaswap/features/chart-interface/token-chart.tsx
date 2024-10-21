"use client";

import React from "react";

import TokenInfo from "@/components/_components/token-info";
import TokenBreadCrumb from "@/components/token-bread-crumb";
import ChartInterface from "./chart-interface";
import { useSwapContext } from "@/context/swap-context";
import { tokenLists } from "@/constants/tokens-list";

export default function TokenChart() {
  const { toTokenAddress } = useSwapContext();

  // Find the selected token from the tokenLists
  const selectedToken = tokenLists.find(
    (token) => token.address === toTokenAddress
  );

  return (
    <main className="w-1/2 mr-[200px]">
      <TokenBreadCrumb />
      <TokenInfo token={selectedToken} />
      <ChartInterface />
    </main>
  );
}
