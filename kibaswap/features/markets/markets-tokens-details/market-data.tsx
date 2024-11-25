"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowLeft } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import millify from "millify";
import {
  millifyConfig,
  priceChangePercentageMillifyConfig,
} from "@/config/millify-config";

import MarketTokensDetails from "./market-tokens-details";

// Skeleton component for loading state
const SkeletonRow = () => (
  <TableRow>
    <TableCell className="bg-gray-300 animate-pulse">
      <Skeleton className="h-3 w-3" />
    </TableCell>
    <TableCell className="bg-gray-300 animate-pulse">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[100px]" />
          <Skeleton className="h-3 w-[50px]" />
        </div>
      </div>
    </TableCell>
    <TableCell className="bg-gray-300 animate-pulse">
      {" "}
      <Skeleton className="h-3 w-[100px]" />
    </TableCell>
    <TableCell className="bg-gray-300 animate-pulse">
      {" "}
      <Skeleton className="h-3 w-[100px]" />
    </TableCell>
    <TableCell className="bg-gray-300 animate-pulse">
      {" "}
      <Skeleton className="h-3 w-[100px]" />
    </TableCell>
    <TableCell className="bg-gray-300 animate-pulse">
      {" "}
      <Skeleton className="h-3 w-[100px]" />
    </TableCell>
  </TableRow>
);

export default function MarketData() {
  const [data, setData] = useState([]);
  //   const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [loading, setLoading] = useState(true); // New loading state
  // Add a new state for the search query
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [searchResults, setSearchResults] = useState<
    {
      id: string;
      name: string;
      symbol: string;
      market_cap_rank: number;
      large: string;
    }[]
  >([]); // Define the type for search results
  const [isSearching, setIsSearching] = useState(false);

  const handleBack = () => {
    setSelectedCoinId(null); // Reset selected coin ID
    setIsSearching(false); // Reset searching state
    setSearchQuery(""); // Clear search query
    setSearchResults([]); // Clear search results
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "X-CMC_PRO_API_KEY": process.env
                .NEXT_PUBLIC_COIN_GECKO_API_KEY as string,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        setData(result);
        console.log("token data::", result);
      } catch (error) {
        console.error("Failed to load coins data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Effect to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0); // Update state based on scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  // New function to handle search
  const handleSearch = async () => {
    if (!searchQuery) return; // Do nothing if the input is empty
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${searchQuery}`
      );
      const result = await res.json();
      setSearchResults(result.coins);
      console.log("search-query::", result.coins);
    } catch (error) {
      console.error("Failed to search for coin:", error);
    }
  };

  return (
    <main>
      {!selectedCoinId ? (
        <>
          {!isAtTop && (
            <div
              onClick={scrollToTop}
              className="fixed bg-[#353546] cursor-pointer rounded-full p-2 bottom-48 right-4 z-10"
            >
              <ArrowUp color="#e33319" />
            </div>
          )}
          {/* Show search results only if searching */}
          {isSearching ? (
            <div>
              <div
                onClick={handleBack}
                className="mb-4 cursor-pointer text-[#d15643]"
              >
                <ArrowLeft />
              </div>
              <h3 className="my-2">Search Results:</h3>
              {searchResults.length > 0 ? (
                <Table className="rounded-lg bg-[#353546]">
                  <TableHeader className="rounded-lg table-header-border w-fit">
                    <TableRow>
                      <TableHead className="w-fit">#</TableHead>
                      <TableHead className="w-fit">Coins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((coin) => (
                      <TableRow
                        key={coin.id}
                        onClick={() => setSelectedCoinId(coin.id)}
                      >
                        <TableCell className="text-[#d15643]">
                          {coin.market_cap_rank}
                        </TableCell>
                        <TableCell className="">
                          <div className="flex space-x-2">
                            <Avatar>
                              <AvatarImage src={coin.large} />
                              <AvatarFallback>KB</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">
                                {coin.name}
                              </h4>
                              <p className="text-sm">{coin.symbol}</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No results found.</p> // Message if no results
              )}
            </div>
          ) : (
            <div className="">
              <div className="market-overview my-2">Market Overview</div>
              <p className="my-2">
                The first-ever aggregated on-chain price platform, offering the
                most real-time, trade-able, and reliable price data.
              </p>
              {/* New input field for searching */}
              <div className="flex mt-3">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                  placeholder="Search by token name or symbol"
                  className="border w-[500px] rounded p-2 mb-4"
                />
                <Button
                  variant="destructive"
                  onClick={handleSearch}
                  className="ml-2 text-white rounded-lg p-2"
                >
                  Search
                </Button>
              </div>

              <Table className="rounded-lg bg-[#353546]">
                <TableCaption className="mb-2">
                  A list of Cryptocurrencies prices.
                </TableCaption>
                <TableHeader className="rounded-lg cursor-pointer table-header-border w-fit">
                  <TableRow>
                    <TableHead className="w-fit">#</TableHead>
                    <TableHead className="w-fit">Coin</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Market Cap</TableHead>
                    <TableHead>24h%</TableHead>
                    <TableHead className="">All Time High</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading
                    ? Array.from({ length: 20 }).map((_, index) => (
                        <SkeletonRow key={index} />
                      ))
                    : data.map((coinData: any, index: number) => (
                        <TableRow
                          className="cursor-pointer"
                          key={coinData.id}
                          onClick={() => setSelectedCoinId(coinData.id)}
                        >
                          <TableCell className="text-[#d15643]">
                            {index + 1}
                          </TableCell>
                          <TableCell className="">
                            <div className="flex space-x-2">
                              <Avatar>
                                <AvatarImage src={coinData.image} />
                                <AvatarFallback>KB</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold">
                                  {coinData.name}
                                </h4>
                                <p className="text-sm">{coinData.symbol}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${millify(coinData.current_price, millifyConfig)}
                          </TableCell>
                          <TableCell>{millify(coinData.market_cap)}</TableCell>
                          <TableCell>
                            <div
                              className={`${
                                coinData.price_change_percentage_24h > 0
                                  ? "border-[#12BE73] border text-[#12BE73] rounded text-center p-1"
                                  : "border-[#FD4C42] border text-[#FD4C42] rounded text-center p-1"
                              }`}
                            >
                              {millify(
                                coinData.price_change_percentage_24h,
                                priceChangePercentageMillifyConfig
                              )}
                              %
                            </div>
                          </TableCell>
                          <TableCell className="">
                            {millify(coinData.ath, millifyConfig)}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      ) : (
        <div>
          <div
            onClick={handleBack}
            className="mb-4 cursor-pointer text-[#d15643]"
          >
            <ArrowLeft />
          </div>{" "}
          {/* Back button for MarketTokensDetails */}
          <MarketTokensDetails id={selectedCoinId} />
        </div>
      )}
    </main>
  );
}
