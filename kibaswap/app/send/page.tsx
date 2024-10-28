"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Repeat } from "lucide-react";
import TokenSelect from "@/components/_components/token-select";

export default function Send() {
  const [amount, setAmount] = useState("");
  const [ethAmount, setEthAmount] = useState("0");
  const [walletAddress, setWalletAddress] = useState("");
  const [displayMode, setDisplayMode] = useState<"ETH" | "USD">("ETH");

  // Mock conversion rate (1 ETH = $2000 USD)
  const ETH_USD_RATE = 2000;

  useEffect(() => {
    const numericAmount = parseFloat(amount) || 0;
    const calculatedEth = (numericAmount / ETH_USD_RATE).toFixed(6);
    setEthAmount(calculatedEth);
  }, [amount]);

  const handleToggleDisplay = () => {
    setDisplayMode((prevMode) => (prevMode === "ETH" ? "USD" : "ETH")); // Toggle between ETH and USD
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-[#353546] border-none shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-gray-500 text-base mb-8">You&apos;re sending</h2>
          <div className="text-center mb-2 relative">
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 text-7xl font-light ml-4">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-gray-500 text-7xl font-light bg-transparent border-none focus:outline-none text-center w-full pl-12"
              placeholder="0"
            />
          </div>
          <div className="text-center mb-12">
            <span className="text-gray-500 text-xl flex items-center justify-center">
              {displayMode === "ETH" ? ethAmount : amount.toString()}{" "}
              {displayMode} {/* Conditional rendering */}
              <Repeat
                className="ml-2 cursor-pointer"
                onClick={handleToggleDisplay}
              />{" "}
              {/* Added click handler */}
            </span>
          </div>
          <div className="flex items-center justify-between bg-[#353546] border-t-1 border-[#23242F] pb-0 p-4 cursor-pointer">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#627eea] rounded-full flex items-center justify-center mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 256 417"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    fill="#fff"
                    d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                  />
                  <path
                    fill="#fff"
                    d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                  />
                  <path
                    fill="#fff"
                    d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                  />
                  <path fill="#fff" d="M127.962 416.905v-104.72L0 236.585z" />
                </svg>
              </div>
              <span className="text-white text-lg font-medium">ETH</span>
            </div>
            <ChevronDown className="text-gray-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md bg-[#353546] mt-3 border-none shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4">
            <label
              htmlFor="wallet-address"
              className="block text-gray-400 text-sm mb-2"
            >
              To
            </label>
            <Input
              id="wallet-address"
              type="text"
              placeholder="Wallet address or ENS name"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="bg-[#23242F] border-[#23242F] text-gray-300 placeholder-gray-500 rounded-lg"
            />
          </div>
          <Button className="w-full bg-[#E33319] hover:bg-[#e35e49] text-white rounded-2xl py-6 text-lg font-semibold">
            Connect wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
