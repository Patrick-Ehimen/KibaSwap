"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Buy() {
  const [amount, setAmount] = useState("0");
  const [ethAmount, setEthAmount] = useState("0.39351");

  const ETH_USD_RATE = 2541.75; // Mock exchange rate

  useEffect(() => {
    const numericAmount = parseFloat(amount) || 0;
    const calculatedEth = (numericAmount / ETH_USD_RATE).toFixed(5);
    setEthAmount(calculatedEth);
  }, [amount]);

  const handleQuickSelect = (value: string) => {
    setAmount(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-[#353546] border-none shadow-lg rounded-3xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-gray-500 text-base">You&apos;re buying</h2>
            <button className="flex items-center bg-[#23242F] rounded-full p-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-white mr-1"></div>
              <ChevronDown className="text-gray-400 w-4 h-4" />
            </button>
          </div>
          <div className="text-center flex mb-4">
            <span className=" left-0 mt-[70px] top-1/2 transform -translate-y-1/2 text-gray-500 text-7xl font-light ml-4">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-gray-500 text-7xl font-light bg-transparent border-none focus:outline-none text-center w-full"
            />
          </div>
          <div className="flex items-center justify-center mb-8">
            <div className="w-6 h-6 bg-[#627eea] rounded-full flex items-center justify-center mr-2">
              <svg
                className="w-4 h-4"
                viewBox="0 0 784.37 1277.39"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer_x0020_1">
                  <path
                    fill="#FFFFFF"
                    d="M392.07 0L383.5 29.11V873.74L392.07 882.29L784.13 650.54L392.07 0Z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M392.07 0L0 650.54L392.07 882.29V472.33V0Z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M392.07 956.52L387.24 962.41V1263.28L392.07 1277.38L784.37 724.89L392.07 956.52Z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M392.07 1277.38V956.52L0 724.89L392.07 1277.38Z"
                  />
                </g>
              </svg>
            </div>
            <span className="text-gray-400 text-lg font-medium mr-1">
              {ethAmount} ETH
            </span>
            <ChevronDown className="text-gray-400 w-4 h-4" />
          </div>
          <div className="flex justify-between mb-8">
            <Button
              variant="outline"
              className={`bg-[#23242f] text-white border-none hover:bg-[#3c3c3e] px-6 ${
                amount === "100" ? "bg-[#3c3c3e]" : ""
              }`}
              onClick={() => handleQuickSelect("100")}
            >
              $100
            </Button>
            <Button
              variant="outline"
              className={`bg-[#23242f] text-white border-none hover:bg-[#3c3c3e] px-6 ${
                amount === "300" ? "bg-[#3c3c3e]" : ""
              }`}
              onClick={() => handleQuickSelect("300")}
            >
              $300
            </Button>
            <Button
              variant="outline"
              className={`bg-[#23242f] text-white border-none hover:bg-[#3c3c3e] px-6 ${
                amount === "1000" ? "bg-[#3c3c3e]" : ""
              }`}
              onClick={() => handleQuickSelect("1000")}
            >
              $1000
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full max-w-md mt-3  bg-[#E33319] hover:bg-[#e35e49] text-white rounded-2xl py-6 text-lg font-semibold">
        Connect wallet
      </Button>
    </div>
  );
}
