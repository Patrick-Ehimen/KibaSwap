"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface SwapContextType {
  fromAmount: string;
  setFromAmount: (amount: string) => void;
  fromTokenAddress: string;
  fromTokenChainId: number;
  toTokenAddress: string;
  toTokenChainId: number;
  setFromToken: (address: string, chainId: number) => void;
  setToToken: (address: string, chainId: number) => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const SwapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fromAmount, setFromAmount] = useState("");
  const [fromTokenAddress, setFromTokenAddress] = useState("");
  const [fromTokenChainId, setFromTokenChainId] = useState(0);
  const [toTokenAddress, setToTokenAddress] = useState("");
  const [toTokenChainId, setToTokenChainId] = useState(0);

  const setFromAmountWithLog = (amount: string) => {
    setFromAmount(amount);
    console.log("FromAmount updated in context:", amount);
  };

  const setFromTokenWithLog = (address: string, chainId: number) => {
    setFromTokenAddress(address);
    setFromTokenChainId(chainId);
    console.log("From Token updated:", { address, chainId });
  };

  const setToTokenWithLog = (address: string, chainId: number) => {
    setToTokenAddress(address);
    setToTokenChainId(chainId);
    console.log("To Token updated:", { address, chainId });
  };

  return (
    <SwapContext.Provider
      value={{
        fromAmount,
        setFromAmount: setFromAmountWithLog,
        fromTokenAddress,
        fromTokenChainId,
        toTokenAddress,
        toTokenChainId,
        setFromToken: setFromTokenWithLog,
        setToToken: setToTokenWithLog,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export const useSwapContext = () => {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error("useSwapContext must be used within a SwapProvider");
  }
  return context;
};
