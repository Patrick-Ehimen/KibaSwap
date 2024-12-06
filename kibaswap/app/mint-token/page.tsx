"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { abi } from "@/json/token-abi";

import { ArrowLeft, ArrowDown, Check, Copy } from "lucide-react";

import { Airdrop, BTC } from "@/public";

export default function MintToken() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [copyStatus, setCopyStatus] = useState(false);
  const [copyAddrStatus, setAddrCopyStatus] = useState(false);
  const [showError, setShowError] = useState(false);

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleNextClick = () => {
    setIsCardVisible(false); // Hide the card when Next is clicked
  };

  const shortenAddress = (address: string) => {
    return address.length > 10
      ? `${address.slice(0, 10)}...${address.slice(-4)}`
      : address;
  };

  // Function to copy the hash to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(true); // Set copy status to true
      setTimeout(() => setCopyStatus(false), 2000); // Reset after 2 seconds
    });
  };

  const copyAddrToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setAddrCopyStatus(true); // Set copy status to true
      setTimeout(() => setAddrCopyStatus(false), 2000); // Reset after 2 seconds
    });
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000); // Hide after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {isCardVisible ? (
        <Card className="w-full max-w-md bg-[#353546] border-none shadow-lg">
          <CardHeader className="flex flex-col items-center justify-center border-red-600 mx-4 border-b-1">
            <CardTitle className="p-3 bg-[#e33319] hover:bg-red-500 rounded-full mb-2">
              <Image src={Airdrop} alt="drop" width={50} height={50} />
            </CardTitle>
            <CardDescription className="text-center text-[20px]">
              Claim Free 1000 Kiba Tokens
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="mb-4">
              <label
                htmlFor="wallet-address"
                className="block text-gray-400 text-sm mb-2"
              >
                Claim To
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
            <Button
              className={`w-full ${
                walletAddress
                  ? "bg-[#E33319] hover:bg-[#e33319]"
                  : "bg-red-400 cursor-not-allowed"
              } text-white rounded-2xl py-6 text-lg font-semibold`}
              disabled={!walletAddress}
              onClick={handleNextClick}
            >
              Next
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md bg-[#353546] border-none shadow-lg">
          <div
            className="px-4 py-6 cursor-pointer"
            onClick={() => setIsCardVisible(true)}
          >
            <ArrowLeft />
          </div>
          <CardHeader className="flex flex-col border-b border-red-600 mx-4 mb-2 items-center justify-center">
            <CardDescription className="-mt-8 py-1 text-[16px]">
              Claiming Tokens!
            </CardDescription>
            <CardTitle className="mt-2 rounded-full bg-[#23242F] p-2">
              <Image src={BTC} alt="drop" width={50} height={50} />
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center">
            <div className="font-bold text-3xl text-gray-500">1000 KRB</div>
            <div className="bg-[#23242F] mb-2 rounded-lg p-2">
              <ArrowDown size={14} />
            </div>
            <CardTitle className="font-light text-gray-300 text-2xl">
              {shortenAddress(walletAddress)}
            </CardTitle>

            {isPending ? ( // Show a loading button when the transaction is pending
              <Button
                className="w-full bg-[#E33319] cursor-not-allowed"
                disabled
              >
                Processing...
              </Button>
            ) : (
              <Button
                className="w-full bg-[#E33319] mt-2 hover:bg-[#e33319]"
                onClick={() =>
                  writeContract({
                    abi,
                    address: "0x4a61167fcE1a630BEecC49eF4224cf83Fdcc025A",
                    functionName: "claimTokens",
                    args: [walletAddress],
                  })
                }
              >
                Claim
              </Button>
            )}
          </CardContent>
        </Card>
      )}
      {hash && (
        <Card className="w-full my-2 max-w-md bg-[#353546] border-none shadow-lg">
          <CardContent className="mb-2 mt-1">
            <div className="text-[#e33319] mt-2">Transaction Successful</div>
            <div className="text-gray-400 text-base flex items-center">
              Contract Address:{" "}
              {shortenAddress("0x4a61167fcE1a630BEecC49eF4224cf83Fdcc025A")}
              <button
                onClick={() => copyAddrToClipboard(hash)}
                className="ml-2"
              >
                {copyAddrStatus ? (
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
            <div className="text-gray-400 text-base flex items-center">
              Transaction Hash: {hash?.slice(0, 6)}...{hash?.slice(-4)}{" "}
              {/* Shorten the hash */}
              <button onClick={() => copyToClipboard(hash)} className="ml-2">
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
          </CardContent>
        </Card>
      )}
      {showError && error && (
        <Card className="w-full my-2 max-w-md bg-[#353546] border-none shadow-lg">
          <CardContent>
            <div className="mt-2">
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
