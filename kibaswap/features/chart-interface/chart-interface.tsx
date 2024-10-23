"use client";

import React, { useState, ReactNode } from "react";

import {
  DailyChart,
  WeeklyChart,
  MonthlyChart,
  YearlyChart,
} from "@/components/chart";
import { useSwapContext } from "@/context/swap-context";
import { tokenLists } from "@/constants/tokens-list";

export default function ChartInterface() {
  const [activeChart, setActiveChart] = useState("daily");
  const { toTokenAddress } = useSwapContext();

  const selectedToken = tokenLists.find(
    (token) => token.address === toTokenAddress
  );

  const timeRanges = ["24HR", "1W", "1M", "1Y"];

  const renderChart = () => {
    switch (activeChart) {
      case "daily":
        return <DailyChart token={selectedToken?.address || ""} />;
      case "weekly":
        return <WeeklyChart />;
      case "monthly":
        return <MonthlyChart token={selectedToken?.address || ""} />;
      case "yearly":
        return <YearlyChart token={selectedToken?.address || ""} />;
      default:
        return null;
    }
  };

  return (
    <main className="flex justify-between items-center py-4 text-gray-300">
      <div className="">
        {renderChart()}
        <div className="p-1 space-x-3 flex">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`px-2  py-1 rounded-full text-sm  text-white ${
                activeChart ===
                  (range === "24HR" ? "daily" : range.toLowerCase()) ||
                (activeChart === "weekly" && range === "1W") ||
                (activeChart === "monthly" && range === "1M") ||
                (activeChart === "yearly" && range === "1Y") // Update to match the activeChart state
                  ? "bg-[#E33319] hover:bg-[#e334196a]"
                  : "bg-[#353546] hover:bg-[#23242F]"
              }`}
              onClick={() =>
                setActiveChart(
                  range === "24HR"
                    ? "daily"
                    : range === "1W"
                    ? "weekly"
                    : range === "1M"
                    ? "monthly"
                    : "yearly"
                )
              }
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
