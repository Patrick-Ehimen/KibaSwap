"use client";

import React, { useEffect, useState } from "react";
import numeral from "numeral";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownUpIcon } from "lucide-react";

import { createClient, gql } from "urql";
import { cacheExchange, fetchExchange } from "@urql/core";
import { DailyChartProps } from "@/interfaces";

const apikey = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY as string;

const client = createClient({
  url: `https://gateway.thegraph.com/api/${apikey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`,
  exchanges: [cacheExchange, fetchExchange],
});

const chartConfig: ChartConfig = {
  price: {
    label: "Price(USD)",
    color: "#E33319",
  },
};

export default function MonthlyChart({ token }: DailyChartProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDerivedETH, setShowDerivedETH] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("No token provided");
        setLoading(false);
        return;
      }

      const tokenId =
        token.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          ? "0xc02aa39b223fe8d0a0e5c4f27ead9083c756cc2"
          : token.toLowerCase();

      try {
        const result = await client
          .query(
            gql`
            {
              token(id: "${tokenId}") { 
                symbol
                name
                decimals
                poolCount
                derivedETH
                tokenDayData(first: 30, orderDirection: desc, orderBy: date) {
                  priceUSD
                  date
                }
              }
            }
          `,
            {}
          )
          .toPromise();

        if (result.error) {
          console.error("Error fetching data:", result.error);
          setError("Failed to fetch data");
        } else {
          setData(result.data);
          console.log("subgraph result::", result.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const processedData =
    data?.token?.tokenDayData
      ?.map((day: any) => ({
        date: new Date(day.date * 1000).toLocaleDateString(),
        // date: new Date(day.date).toLocaleDateString(),
        price: parseFloat(day.priceUSD),
      }))
      .reverse() || [];

  return (
    <main className="grid grid-cols-3 gap-8 -mt-2 mb-5">
      <Card className="col-span-2 bg-transparent border-none shadow-none">
        <CardHeader>
          <div className="text-3xl -ml-5 -mt-5 flex font-bold mb-2">
            {loading ? ( // Check if loading
              <Skeleton className="h-6 w-32" />
            ) : (
              processedData.length > 0 && (
                <p className="cursor-text mr-2">
                  {" "}
                  {/* Toggle between price and derivedETH */}
                  {showDerivedETH ? (
                    <span>
                      {numeral(data.token.derivedETH).format("0,0.0000")} ETH
                    </span>
                  ) : (
                    `$${numeral(
                      processedData[processedData.length - 1].price
                    ).format("0,0.00")}`
                  )}
                </p>
              )
            )}
            <ArrowDownUpIcon
              onClick={() => setShowDerivedETH(!showDerivedETH)}
              color="#e33319"
              className="cursor-pointer"
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? ( // Check if loading for chart
            <Skeleton className="h-48 w-full" /> // Render skeleton component for chart
          ) : (
            data &&
            !loading &&
            !error && (
              <ChartContainer
                config={chartConfig}
                className="h-[300px] w-[600px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={processedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="var(--color-price)"
                      fill="var(--color-price)"
                      fillOpacity={0.4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            )
          )}
        </CardContent>
      </Card>
    </main>
  );
}
