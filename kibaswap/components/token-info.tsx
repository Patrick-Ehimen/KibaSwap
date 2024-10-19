import React, { useEffect, useState } from "react"; // Added useState and useEffect
import Image from "next/image";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { TokenInfoProps } from "@/interfaces";
import { Etherscan, X } from "@/public";
import { Globe } from "lucide-react";

export default function TokenInfo({ token }: TokenInfoProps) {
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (token) {
      setLoading(false); // Set loading to false when token data is available
    }
  }, [token]);

  if (!token || loading) {
    // Updated condition to include loading state
    return (
      <div className="flex items-center mt-2 space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <header className="flex items-center justify-between py-3 text-white">
      <div className="flex items-center space-x-2">
        <div className="flex gap-2">
          <Image src={token.logo} alt={token.name} width={30} height={30} />
          <h2 className="text-xl font-semibold">{token.name}</h2>
          <h2 className="mt-1 text-gray-400">{token.symbol} </h2>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Link
          href={token.explorer}
          target="_blank"
          className="p-2 rounded-xl bg-[#353546] hover:bg-[#23242F]"
        >
          <Image
            src={Etherscan}
            alt="etherscan"
            className="w-5 h-5"
            width={25}
            height={25}
            title="Etherscan"
          />
        </Link>
        <Link
          href={token.website}
          className="p-2 rounded-xl bg-[#353546] hover:bg-[#23242F]"
          title="Website"
        >
          <Globe className="w-5 h-5" size={25} />
        </Link>
        <Link
          href={token.twitter}
          className="p-2 rounded-xl bg-[#353546] hover:bg-[#23242F]"
          title="X"
        >
          <Image
            src={X}
            alt="twitter"
            width={25}
            height={25}
            className="w-5 h-5"
          />
        </Link>
      </div>
    </header>
  );
}
