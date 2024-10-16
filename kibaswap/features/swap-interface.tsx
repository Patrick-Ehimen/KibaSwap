import React from "react";
import { ArrowDownUp, Settings2Icon, Info } from "lucide-react";
import TokenSwap from "@/components/_components/token-swap";
import { SwapProvider } from "@/context/swap-context";

export default function SwapInterface() {
  return (
    <SwapProvider>
      <main className="flex-grow flex items-center justify-center px-4 py-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-[#353546] shadow-xl rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Swap</h2>
            <div className="flex space-x-2">
              <button className="p-2 rounded-xl bg-[#23242F]">
                <Settings2Icon size={20} />
              </button>
              <button className="p-2 rounded-xl bg-[#23242F]">
                <Info size={20} />
              </button>
            </div>
          </div>
          <TokenSwap />
        </div>
      </main>
    </SwapProvider>
  );
}
