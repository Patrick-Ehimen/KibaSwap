import * as React from "react";
import Image from "next/image";

import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { networks } from "@/constants";
import { Network } from "@/interfaces";
import { ChainImg } from "@/public";

export default function NetworkSelector() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedNetwork, setSelectedNetwork] = React.useState<Network | null>(
    networks[0] // Set the default network to the first one in the list
  );

  return (
    <div className="flex bg-gray-900">
      <div className="relative w-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center bg-[#1a1b23] justify-between w-full px-4 py-2 text-sm font-medium rounded-md"
        >
          <span className="flex items-center">
            <span className="flex -space-x-1 overflow-hidden">
              <Image
                src={selectedNetwork?.icon || ChainImg}
                alt={selectedNetwork?.name || "Default Chain"}
                width={25}
                height={25}
              />
            </span>
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 ml-2" />
          ) : (
            <ChevronDown className="w-5 h-5 ml-2" />
          )}
        </button>

        {isOpen && (
          <div className="absolute z-10 -ml-44 border mt-4 w-64 origin-top-right bg-[#1a1b23] rounded-md shadow-lg">
            <div className="py-1">
              {networks.map((network) => (
                <button
                  key={network.name}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-[#353546] hover:text-white",
                    selectedNetwork?.name === network.name &&
                      "bg-[#353546j] text-white"
                  )}
                  onClick={() => {
                    setSelectedNetwork(network);
                    setIsOpen(false);
                  }}
                >
                  <Image
                    className="w-6 h-6 mr-3 rounded-full"
                    src={network.icon}
                    alt={network.name}
                    width={25}
                    height={25}
                  />
                  {network.name}
                  {selectedNetwork?.name === network.name && (
                    <Check className="w-5 h-5 ml-auto text-green-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
