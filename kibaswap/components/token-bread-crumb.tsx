"use client";

import React, { useState } from "react";
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

import { Copy, Check } from "lucide-react";

export default function TokenBreadCrumb() {
  const { toTokenAddress } = useSwapContext();
  const [copied, setCopied] = useState(false);

  // Find the selected token from the tokenLists
  const selectedToken = tokenLists.find(
    (token) => token.address === toTokenAddress
  );

  // Format the address to show only the first 6 and last 4 characters
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Function to copy the address to clipboard
  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true); // Set copied state to true
    setTimeout(() => setCopied(false), 4000); // Reset copied state after 2 seconds
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
            {selectedToken ? (
              <>
                <span className="cursor-pointer">
                  {selectedToken.symbol} {formatAddress(selectedToken.address)}
                </span>
                <button onClick={() => copyToClipboard(selectedToken.address)}>
                  <div className="mt-1 mx-2">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </div>
                </button>
              </>
            ) : (
              "Select a token"
            )}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
