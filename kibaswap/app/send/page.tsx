"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Moralis from "moralis";

import {
  useAccount,
  useChainId,
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import { parseEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ChevronDown, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Ethereum } from "@/public";
import { Token } from "@/types";

export default function Send() {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formattedResponse, setFormattedResponse] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  console.log(`Chain ID:: ${chainId}`);
  console.log(
    `wallet connected:: ${isConnected}, and wallet address:: ${address}`
  );
  console.log("Amount::", amount);
  console.log("walletAddress::", walletAddress);

  useEffect(() => {
    const fetchTokenBalances = async () => {
      try {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
        });

        const response =
          await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
            chain: chainId.toString(), // Specify the chain ID
            address: address || "", // Use the connected wallet address
          });

        console.log("Raw Moralis response:", response);
        console.log("moralis response::", await response.result);

        const formattedResponse = response.result.map((token) => ({
          name: token.name,
          symbol: token.symbol,
          logo: token.logo,
          tokenBalance: token.balanceFormatted,
          usdValue: token.usdValue ? token.usdValue.toString() : "N/A",
          priceinUsd: token.usdPrice ? parseFloat(token.usdPrice) : null,
        }));

        setFormattedResponse(formattedResponse);

        console.log("Formatted response:", formattedResponse);
      } catch (e) {
        console.error(e);
      }
    };

    if (isConnected && (address || chainId)) {
      fetchTokenBalances(); // Fetch balances when connected
    }
  }, [isConnected, address, chainId]);

  async function sendTxs() {
    // Ensure that walletAddress and amount are available
    if (!walletAddress || !amount) {
      console.error("Wallet address and amount are required.");
      return;
    }

    const to: `0x${string}` = walletAddress as `0x${string}`; // Use the walletAddress state as 'to'
    const value: string = amount; // Use the amount state as 'value'

    try {
      await sendTransaction({ to, value: parseEther(value) }); // Call sendTransaction with the parsed value
      console.log(`Transaction sent: ${value} to ${to}`);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Function to copy the hash to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(true); // Set copy status to true
      setTimeout(() => setCopyStatus(false), 2000); // Reset after 2 seconds
    });
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
              min="0"
            />
          </div>

          {/* Only show this div if the wallet is not connected */}
          {isConnected ? (
            <div className="mt-4 relative">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-gray-300 ">
                  {selectedToken ? (
                    <div className="flex">
                      {selectedToken.logo ? (
                        <Avatar>
                          <AvatarImage
                            src={selectedToken.logo}
                            alt={selectedToken.symbol}
                            className=""
                          />
                        </Avatar>
                      ) : (
                        <Avatar>
                          <AvatarFallback>KB</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="text-white text-lg mt-2  ml-2 font-medium">
                        {selectedToken.symbol}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#E33319] p-2 rounded-lg">
                      Select Token
                    </div>
                  )}
                </span>
                <ChevronDown
                  className={`text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isDropdownOpen && ( // Conditional rendering of dropdown
                <ul className="absolute bg-[#23242F] w-full shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto">
                  {formattedResponse.map((token: Token, index) => (
                    <div
                      key={index}
                      className="flex items-center m-2 p-2 hover:bg-[#353546] cursor-pointer"
                      onClick={() => {
                        setSelectedToken(token); // Set selected token on click
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="flex">
                        {token.logo ? (
                          <Avatar>
                            <AvatarImage
                              src={token.logo}
                              alt="@kiba"
                              className=""
                            />
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarFallback>KB</AvatarFallback>
                          </Avatar> // Display text if logo is null
                        )}
                        <div className="mt-2 mx-2">{token.symbol}</div>
                      </div>
                      {parseFloat(token.tokenBalance).toFixed(3)}
                    </div>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div
              className={`flex items-center justify-between bg-[#353546] border-t-1 border-[#23242F] pb-0 p-4 cursor-pointer`}
              title="Please connect your wallet to proceed."
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  {/* Display selected token logo */}
                  <Image
                    src={Ethereum}
                    alt="eth"
                    className="w-full h-full"
                    width={25}
                    height={25}
                  />{" "}
                </div>
                <span className="text-white text-lg font-medium">ETH</span>{" "}
                {/* Display selected token symbol */}
              </div>
              <ChevronDown className="text-gray-400" />
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
              placeholder="Enter Wallet address.."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="bg-[#23242F] border-[#23242F] text-gray-300 placeholder-gray-500 rounded-lg"
            />
          </div>
          <div>
            {isConnected ? (
              <div>
                <Button
                  className="w-full bg-[#E33319] hover:bg-[#e35e49] text-white rounded-2xl py-6 text-lg font-semibold"
                  onClick={sendTxs}
                  disabled={isPending || !walletAddress || !amount} // Disable if walletAddress or amount is empty
                >
                  {isPending
                    ? "Confirming..."
                    : !walletAddress && !amount
                    ? "Enter address and amount"
                    : !walletAddress
                    ? "Enter wallet address"
                    : !amount
                    ? "Enter amount"
                    : "Send"}{" "}
                </Button>
                {isConfirmed && (
                  <div className="text-base my-2 text-gray-400">
                    Transaction confirmed.
                  </div>
                )}
                {hash && (
                  <div className="my-5">
                    <div className="text-[#e33319]">Transaction Successful</div>
                    <div className="text-gray-400 text-base flex items-center">
                      Transaction Hash: {hash?.slice(0, 6)}...{hash?.slice(-4)}{" "}
                      {/* Shorten the hash */}
                      <button
                        onClick={() => copyToClipboard(hash)}
                        className="ml-2"
                      >
                        {copyStatus ? (
                          <span>
                            <Check size={15} />
                          </span> // Checkmark when copied
                        ) : (
                          <span>
                            <Copy size={15} />
                          </span> // Copy icon
                        )}
                      </button>
                    </div>
                  </div>
                )}
                {error && (
                  <div>
                    Error: {(error as BaseError).shortMessage || error.message}
                  </div>
                )}
              </div>
            ) : (
              <Button className="w-full bg-[#E33319] hover:bg-[#e33319] text-white rounded-2xl py-6 text-lg font-semibold">
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
