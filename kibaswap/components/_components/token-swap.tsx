"use client";

import React, { useState, useEffect } from "react";

import { tokenLists } from "@/constants/tokens-list";
import { ArrowDownUp } from "lucide-react";

import TokenSelect from "./token-select";
import { useSwapContext } from "@/context/swap-context";

export default function TokenSwap() {
  const { fromAmount, setFromAmount, setFromToken, setToToken } =
    useSwapContext();

  const [fromTokenState, setFromTokenState] = useState(tokenLists[0]);
  const [toTokenState, setToTokenState] = useState(tokenLists[1]);
  const [toAmount, setToAmount] = useState("");

  useEffect(() => {
    // Set initial tokens in context
    setFromToken(fromTokenState.address, fromTokenState.chainId);
    setToToken(toTokenState.address, toTokenState.chainId);
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      if (fromAmount && fromTokenState && toTokenState) {
        const amountInWei = BigInt(parseFloat(fromAmount) * 1e18).toString();
        const params = new URLSearchParams({
          sellToken: fromTokenState.address,
          buyToken: toTokenState.address,
          sellAmount: amountInWei,
          chainId: fromTokenState.chainId.toString(),
        });

        try {
          const response = await fetch(`/api/price?${params}`);
          const data = await response.json();
          console.log("Price data:", data);

          // Update the toAmount with the buyAmount from the API response
          if (data.buyAmount) {
            // Convert the buyAmount to a human-readable format
            const buyAmountInTokens = (parseInt(data.buyAmount) / 1e6).toFixed(
              6
            );
            setToAmount(buyAmountInTokens);
          }
        } catch (error) {
          console.error("Error fetching price:", error);
        }
      }
    };

    fetchPrice();
  }, [fromAmount, fromTokenState, toTokenState]);

  const handleSwap = () => {
    setFromTokenState(toTokenState);
    setToTokenState(fromTokenState);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setFromToken(toTokenState.address, toTokenState.chainId);
    setToToken(fromTokenState.address, fromTokenState.chainId);
  };

  const handleFromTokenSelect = (token: typeof fromTokenState) => {
    setFromTokenState(token);
    setFromToken(token.address, token.chainId);
  };

  const handleToTokenSelect = (token: typeof toTokenState) => {
    setToTokenState(token);
    setToToken(token.address, token.chainId);
  };

  const darkMode = true;

  return (
    <div>
      <div
        className={`mb-4 mt-2 p-4 rounded-xl ${
          darkMode ? "bg-[#23242F]" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between mb-2">
          <span>From</span>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => {
              setFromAmount(e.target.value);
            }}
            className={`w-full text-2xl ${
              darkMode ? "bg-[#23242F] text-white" : "bg-gray-100 text-gray-900"
            } outline-none`}
            placeholder="0.0"
          />
          <TokenSelect
            selectedToken={fromTokenState}
            onSelectToken={handleFromTokenSelect}
            tokens={tokenLists}
          />
        </div>
      </div>
      <div className="flex justify-center -my-4 z-10 relative">
        <button
          onClick={handleSwap}
          className={`p-2 rounded-xl ${
            darkMode
              ? "bg-[#23242F] hover:bg-gray-600"
              : "bg-white hover:bg-gray-100"
          } shadow-lg`}
        >
          <ArrowDownUp size={20} />
        </button>
      </div>
      <div
        className={`mb-4 p-4 rounded-xl ${
          darkMode ? "bg-[#23242F]" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between mb-2">
          <span>To</span>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={toAmount}
            className={`w-full text-2xl ${
              darkMode ? "bg-[#23242F] text-white" : "bg-gray-100 text-gray-900"
            } outline-none`}
            placeholder="0.0"
            readOnly
          />
          <TokenSelect
            selectedToken={toTokenState}
            onSelectToken={handleToTokenSelect}
            tokens={tokenLists}
          />
        </div>
      </div>
      <button
        className={`w-full py-3 rounded-xl font-bold ${
          darkMode ? "bg-[#E33319] text-white" : "bg-[#E33319] text-white"
        }`}
      >
        Swap
      </button>
    </div>
  );
}
