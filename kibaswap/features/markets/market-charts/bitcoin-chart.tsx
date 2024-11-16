"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import millify from "millify";
import { Skeleton } from "@/components/ui/skeleton";

interface BitcoinData {
  name: string;
  market_data: { current_price: { usd: number } };
}

export default function BitcoinChart() {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      const tokenId = "bitcoin"; // Hardcoded tokenId for Bitcoin
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
      console.log("bitcoin data::", data);
      setBitcoinData(data);
    };
    fetchBitcoinData();
  }, []);

  return (
    <div className="mx-2">
      {bitcoinData ? (
        <div>
          <p className="font-bold text-2xl text-white">
            {millify(bitcoinData.market_data.current_price.usd)} USD
          </p>{" "}
          <div className="flex gap-2 my-2">
            <Image
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035"
              alt="logo"
              width={30}
              height={30}
            />
            <p className="text-[18px] mt-1 text-gray-500 font-semibold text-lg">
              {bitcoinData.name}
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
