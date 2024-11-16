"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import millify from "millify"; // Added import for millify
import Image from "next/image"; // Added import for Image

interface SolanaData {
  name: string;
  market_data: { current_price: { usd: number } };
}

export default function SolanaChart() {
  const [solanaData, setSolanaData] = useState<SolanaData | null>(null);

  useEffect(() => {
    const fetchSolanaData = async () => {
      const tokenId = "solana"; // Hardcoded tokenId for Solana
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${tokenId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-CMC_PRO_API_KEY": process.env
              .NEXT_PUBLIC_COIN_GECKO_API_KEY as string,
          },
        }
      );
      const data = await response.json();
      console.log("solana data::", data);
      setSolanaData(data);
    };
    fetchSolanaData();
  }, []);

  return (
    <div className="mx-2">
      {solanaData ? (
        <div>
          <p className="font-bold text-2xl text-white">
            {millify(solanaData.market_data.current_price.usd)} USD
          </p>{" "}
          <div className="flex gap-2 my-2">
            <Image
              src="https://cryptologos.cc/logos/solana-sol-logo.png?v=035"
              alt="logo"
              width={30}
              height={30}
            />
            <p className="text-[18px] mt-1 text-gray-500 font-semibold text-lg">
              {solanaData.name}
            </p>{" "}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      )}
    </div>
  );
}
