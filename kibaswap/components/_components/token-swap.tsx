"use client";

import React, { useState } from "react";

import { tokenLists } from "@/constants/tokens-list";
import { ArrowDownUp } from "lucide-react";

import TokenSelect from "./token-select";

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState(tokenLists[0]);
  const [toToken, setToToken] = useState(tokenLists[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
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
            onChange={(e) => setFromAmount(e.target.value)}
            className={`w-full text-2xl ${
              darkMode ? "bg-[#23242F] text-white" : "bg-gray-100 text-gray-900"
            } outline-none`}
            placeholder="0.0"
          />
          <TokenSelect
            selectedToken={fromToken}
            onSelectToken={setFromToken}
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
            onChange={(e) => setToAmount(e.target.value)}
            className={`w-full text-2xl ${
              darkMode ? "bg-[#23242F] text-white" : "bg-gray-100 text-gray-900"
            } outline-none`}
            placeholder="0.0"
          />
          <TokenSelect
            selectedToken={toToken}
            onSelectToken={setToToken}
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
