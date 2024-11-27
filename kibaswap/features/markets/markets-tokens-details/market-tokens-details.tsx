import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, ExternalLink, Check } from "lucide-react";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import millify from "millify";
import { millifyConfig } from "@/config/millify-config";

import MarketTokenBreadcrumb from "./market-token-breadcrumb";
import MarketTokenSkeleton from "./skeletons/market-token-skeleton";

export default function MarketTokensDetails({ id }: { id: string }) {
  const [coinData, setCoinData] = useState<any>(null);
  const [showMore, setShowMore] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&sparkline=true`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("id data::", data);
        setCoinData(data);
      } catch (error) {
        console.error("Failed to load coin details:", error);
      }
    };

    fetchCoinDetails();
  }, [id]); // Re-fetch data if the id prop changes

  const handleCopy = () => {
    navigator.clipboard.writeText(coinData.contract_address); // Copy the address
    setCopySuccess(true); // Set copy success to true
    setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`; // Shorten the address
  };

  if (!coinData) {
    return <MarketTokenSkeleton />;
  }

  return (
    <main className="mb-10">
      <MarketTokenBreadcrumb id={id} />
      {coinData && (
        <Card className="mt-10 -ml-5 bg-transparent border-0 shadow-none w-full max-w-3xl text-white">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="md:flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={coinData.image.small}
                    alt={coinData.name}
                    width={48}
                    height={48}
                  />
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">
                      {coinData.name} Price
                    </h2>
                    <span className="text-gray-400">({coinData.symbol})</span>
                    <span className="rounded text-[#b04e3f] px-1.5 py-0.5 text-xs font-medium">
                      #{coinData.market_cap_rank}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-4">
                    <div>
                      <div className="text-2xl font-semibold text-[#b04e3f]">
                        $
                        {millify(
                          coinData.market_data.current_price.usd,
                          millifyConfig
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        {" "}
                        (
                        {millify(
                          coinData.market_data.current_price.btc,
                          millifyConfig
                        )}
                        ) BTC
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="spce-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Website::</span>
                  <Link
                    href={coinData.links.homepage[0]}
                    target="_blank"
                    className="flex items-center gap-1 text-[#b04e3f] hover:text-white hover:underline"
                  >
                    {coinData.links.homepage[0]
                      .replace(/^(https?:\/\/)?(www\.)?/, "")
                      .replace(/\/.*$/, "")}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex">
                    <span className="text-gray-400 mt-2">Community::</span>
                    <div className="mt-2 flex gap-4">
                      <Link
                        href={`https://x.com/${coinData.links.twitter_screen_name}`}
                        className="flex text-[#b04e3f] hover:text-white hover:underline"
                      >
                        <div className="mx-2">Twitter</div>
                        <TwitterLogoIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-gray-400">Explorers::</span>
                <div className="flex flex-wrap gap-2">
                  {coinData.links.blockchain_site
                    .filter((site: string) => site)
                    .map((site: string, index: number) => (
                      <Link
                        key={index}
                        href={site}
                        className="rounded-full border border-[#b04e3f] px-3 p-1 text-sm text-gray-400 hover:text-white"
                      >
                        {site
                          .replace(/^(https?:\/\/)?(www\.)?/, "")
                          .replace(/\.com|\.org|\.io|\.co|\.space|\/.*$/g, "")}
                      </Link>
                    ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-400">Contract::</span>
                {coinData.contract_address ? ( // Check if contract_address exists
                  <span
                    className="flex gap-1 text-[#b04e3f]"
                    onClick={handleCopy}
                  >
                    {shortenAddress(coinData.contract_address)}
                    {copySuccess ? <Check size={15} /> : <Copy size={15} />}
                  </span>
                ) : (
                  <span className="text-gray-400">Nothing to show here</span> // Render message if empty
                )}
              </div>

              <div className="my-15">
                <h1 className="font-bold text-[24px]">About {coinData.name}</h1>
                <p className="">
                  {showMore
                    ? coinData.description?.en || "No description available."
                    : `${
                        coinData.description?.en?.substring(0, 200) ||
                        "No description available."
                      }...`}
                </p>
                <Button
                  variant="link"
                  onClick={() => setShowMore(!showMore)}
                  className="p-0 text-[#b04e3f]"
                >
                  {showMore ? "Show less" : "Show more"}
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex border justify-between rounded bg-[#282A32] p-4">
                      <span className="text-gray-400 mr-3">Market Cap</span>
                      <span className="font-medium">
                        ${millify(coinData.market_data.market_cap.usd)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Market Capitalization</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="flex justify-between border rounded bg-[#282A32] p-4">
                      <span className="text-gray-400 mr-3">
                        Circulating Supply
                      </span>
                      <span className="font-medium">
                        {millify(coinData.market_data.circulating_supply)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Current Circulating Supply</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="flex border justify-between rounded bg-[#282A32] p-4">
                      <span className="text-gray-400 mr-3">Volume 24h</span>
                      <span className="font-medium">
                        ${millify(coinData.market_data.total_volume.usd)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>24 Hour Trading Volume</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="flex border justify-between rounded bg-[#282A32] p-4">
                      <span className="text-gray-400 mr-3">Total Supply</span>
                      <span className="font-medium">
                        {millify(coinData.market_data.max_supply)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Maximum Supply</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="flex border justify-between rounded bg-[#282A32] p-4">
                      <span className="text-gray-400 mr-3">24H High</span>
                      <span className="font-medium">
                        ${millify(coinData.market_data.high_24h.usd)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>24H High</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="flex border justify-between rounded bg-[#282A32] p-4">
                      <span className="text-gray-400 mr-3">24H Low</span>
                      <span className="font-medium">
                        ${millify(coinData.market_data.low_24h.usd)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>24H Low Supply</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
