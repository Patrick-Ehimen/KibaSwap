"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import millify from "millify"; // Added import for millify
import Image from "next/image"; // Added import for Image

interface UsdtData {
  name: string;
  market_data: { current_price: { usd: number } };
}

export default function UsdtChart() {
  const [usdtData, setUsdtData] = useState<UsdtData | null>(null);

  useEffect(() => {
    const fetchUsdtData = async () => {
      const tokenId = "tether"; // Hardcoded tokenId for USDT
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
      console.log("usdt data::", data);
      setUsdtData(data);
    };
    fetchUsdtData();
  }, []);

  return (
    <div className="mx-2">
      {usdtData ? (
        <div>
          <p className="font-bold text-2xl text-white">
            {millify(usdtData.market_data.current_price.usd)} USD
          </p>{" "}
          <div className="flex gap-2 my-2">
            <Image
              src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=035"
              alt="logo"
              width={30}
              height={30}
            />
            <p className="text-[18px] mt-1 text-gray-500 font-semibold text-lg">
              {usdtData.name}
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
