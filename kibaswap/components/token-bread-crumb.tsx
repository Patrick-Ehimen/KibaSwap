"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSwapContext } from "@/context/swap-context";
import { tokenLists } from "@/constants/tokens-list";

import { Copy } from "lucide-react";

export default function TokenBreadCrumb() {
  const { toTokenAddress } = useSwapContext();

  // Find the selected token from the tokenLists
  const selectedToken = tokenLists.find(
    (token) => token.address === toTokenAddress
  );

  // Format the address to show only the first 6 and last 4 characters
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/explore">Explore</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/explore">Tokens</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {selectedToken
              ? `${selectedToken.symbol} ${formatAddress(
                  selectedToken.address
                )}`
              : "Select a token"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
