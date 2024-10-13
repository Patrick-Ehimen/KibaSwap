"use client";

import Image from "next/image";
import { ChevronDownIcon, SearchIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";

interface Token {
  symbol: string;
  name: string;
  logo: string;
  pinned?: boolean;
}

interface TokenSelectProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
  tokens: Token[];
}

export default function TokenSelect({
  selectedToken,
  onSelectToken,
  tokens,
}: TokenSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const closeDialogRef = useRef<() => void>();

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedTokens = filteredTokens.filter((token) => token.pinned);
  const unpinnedTokens = filteredTokens.filter((token) => !token.pinned);

  const TokenButton = ({ token }: { token: Token }) => (
    <Button
      key={token.symbol}
      variant="ghost"
      className="w-full justify-start"
      onClick={() => {
        onSelectToken(token);
        setSearchQuery("");
        setOpen(false);
      }}
    >
      <div className="flex items-center space-x-3 w-full">
        <Image
          src={token.logo}
          alt={token.name}
          width={36}
          height={36}
          className="rounded-full"
        />
        <div className="flex flex-col items-start flex-grow">
          <span className="font-medium">{token.name}</span>
          <span className="text-sm text-muted-foreground">{token.symbol}</span>
        </div>
        {token.pinned && <StarIcon className="h-4 w-4 text-yellow-500" />}
      </div>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 ml-2"
          onClick={() => setOpen(true)}
        >
          <Image
            src={selectedToken.logo}
            alt={selectedToken.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>{selectedToken.symbol}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border rounded-md px-3 py-2 mb-4">
          <SearchIcon className="h-4 w-4 text-muted-foreground mr-2" />
          <Input
            placeholder="Search Tokens"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {pinnedTokens.length > 0 && (
            <>
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Popular Tokens
              </div>
              {pinnedTokens.map((token) => (
                <TokenButton key={token.symbol} token={token} />
              ))}
              {unpinnedTokens.length > 0 && <hr className="my-2" />}
            </>
          )}
          {unpinnedTokens.map((token) => (
            <TokenButton key={token.symbol} token={token} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
