"use client";

import React, { useEffect, useState } from "react";
import millify from "millify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Globe,
  Twitter,
  MessageCircle,
  PieChart,
  BarChart2,
  FileText,
} from "lucide-react";
import { useTokenNameContext } from "@/context/token-name-context";

export default function TokenDetails() {
  const { secondTokenName } = useTokenNameContext();
  const [tokenData, setTokenData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  console.log("selected toke id::", secondTokenName);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (secondTokenName) {
        const tokenId = secondTokenName.toLowerCase().replace(/ /g, "-");
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
        setTokenData(data);

        console.log("resposnse data::", data);
      }
    };
    fetchTokenData();
  }, [secondTokenName]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="bg-transparen">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#e33319]">
            Market Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg text-muted-foreground">Market Cap</h3>
            <p className="text-2xl font-semibold">
              {tokenData?.market_data?.market_cap?.usd ? (
                `$${millify(tokenData.market_data.market_cap.usd)}`
              ) : (
                <Skeleton className="h-4 w-[100px]" />
              )}
            </p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground">Rank</h3>
            <p className="text-2xl font-semibold">
              {tokenData?.market_cap_rank ? (
                tokenData.market_cap_rank
              ) : (
                <Skeleton className="h-4 w-[100px]" />
              )}
            </p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground">
              Circulating Supply
            </h3>
            <p className="text-2xl font-semibold">
              {tokenData?.market_data?.circulating_supply ? (
                `${millify(tokenData.market_data.circulating_supply)}`
              ) : (
                <Skeleton className="h-4 w-[100px]" />
              )}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#e33319]">
            About {secondTokenName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            {tokenData ? (
              showMore ? (
                tokenData.description.en || "No description available."
              ) : (
                `${tokenData.description.en.substring(0, 200)}...` // Shortened version
              )
            ) : (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[500px]" />
                <Skeleton className="h-4 w-[500px]" />
                <Skeleton className="h-4 w-[500px]" />
                <Skeleton className="h-4 w-[500px]" />
                <Skeleton className="h-4 w-[500px]" />
                <Skeleton className="h-4 w-[500px]" />
              </div>
            )}
          </p>

          <Button
            variant="link"
            onClick={() => setShowMore(!showMore)}
            className="p-0 text-[#b04e3f]"
          >
            {showMore ? "Show less" : "Show more"}
          </Button>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  icon: <Globe className="w-4 h-4 mr-2" />,
                  label: "ethereum.org",
                },
                { icon: <Twitter className="w-4 h-4 mr-2" />, label: "x.com" },
                {
                  icon: <MessageCircle className="w-4 h-4 mr-2" />,
                  label: "Reddit",
                },
                {
                  icon: <PieChart className="w-4 h-4 mr-2" />,
                  label: "Coingecko",
                },
                {
                  icon: <BarChart2 className="w-4 h-4 mr-2" />,
                  label: "CoinMarketCap",
                },
                {
                  icon: <FileText className="w-4 h-4 mr-2" />,
                  label: "Whitepaper",
                },
              ].map((link, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  className="bg-[#e33319] hover:bg-red-500"
                >
                  {link.icon}
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
