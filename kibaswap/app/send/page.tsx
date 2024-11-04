"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Moralis from "moralis";

import { useAccount, useChainId } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Repeat } from "lucide-react";

import { tokenLists } from "@/constants/tokens-list";
import { Token } from "@/interfaces";

export default function Send() {
  const [amount, setAmount] = useState("");
  const [ethAmount, setEthAmount] = useState("0");
  const [walletAddress, setWalletAddress] = useState("");
  const [displayMode, setDisplayMode] = useState<"ETH" | "USD">("ETH");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokenLists[0]);

  const { isConnected, address } = useAccount();
  const chainId = useChainId();

  console.log(`Chain ID:: ${chainId}`);
  console.log(
    `wallet connected:: ${isConnected}, and wallet address:: ${address}`
  );

  // Mock conversion rate (1 ETH = $2000 USD)
  const ETH_USD_RATE = 2000;

  useEffect(() => {
    const numericAmount = parseFloat(amount) || 0;
    const calculatedEth = (numericAmount / ETH_USD_RATE).toFixed(6);
    setEthAmount(calculatedEth);
  }, [amount]);

  // useEffect for Moralis API call
  useEffect(() => {
    const fetchWalletTokenBalances = async () => {
      try {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
        });

        const response =
          await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
            chain: chainId.toString(), // Use chainId from state
            address: address || "", // Use address from state
          });

        console.log("moralis response::", await response.result);
      } catch (e) {
        console.error(e);
      }
    };

    if (isConnected && address) {
      // Ensure the wallet is connected and address is available
      fetchWalletTokenBalances();
    }
  }, [chainId, address, isConnected]); // Dependencies for the useEffect

  const handleToggleDisplay = () => {
    setDisplayMode((prevMode) => (prevMode === "ETH" ? "USD" : "ETH")); // Toggle between ETH and USD
  };

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token); // Update selected token
    setIsDropdownOpen(false); // Close dropdown after selection
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
              {selectedToken.symbol}
              {/* {displayMode} Conditional rendering */}
              <Repeat
                className="ml-2 cursor-pointer"
                onClick={handleToggleDisplay}
              />{" "}
              {/* Added click handler */}
            </span>
          </div>
          <div
            className="flex items-center justify-between bg-[#353546] border-t-1 border-[#23242F] pb-0 p-4 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <Image
                  src={selectedToken.logo}
                  alt={selectedToken.name}
                  className="w-full h-full"
                  width={25}
                  height={25}
                />{" "}
                {/* Display selected token logo */}
              </div>
              <span className="text-white text-lg font-medium">
                {selectedToken.symbol}
              </span>{" "}
              {/* Display selected token symbol */}
            </div>
            <ChevronDown className="text-gray-400" />
          </div>
          {isDropdownOpen && ( // Conditional rendering of dropdown
            <div className="absolute bg-[#23242F] w-[200px] shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto">
              {tokenLists.map((token) => (
                <div
                  key={token.symbol}
                  className="flex items-center p-2 hover:bg-[#353546] cursor-pointer"
                  onClick={() => handleTokenSelect(token)} // Handle token selection
                >
                  <Image
                    src={token.logo}
                    alt={token.name}
                    className="w-6 h-6 mr-2"
                    width={25}
                    height={25}
                  />
                  <span>{token.symbol}</span>
                </div>
              ))}
            </div>
          )}
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
          <div>
            {isConnected ? (
              <Button className="w-full bg-[#E33319] hover:bg-[#e35e49] text-white rounded-2xl py-6 text-lg font-semibold">
                Send
              </Button>
            ) : (
              <Button className="w-full bg-[#E33319] text-white rounded-2xl py-6 text-lg font-semibold">
                <ConnectButton
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
