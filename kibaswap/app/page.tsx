import Image from "next/image";

import TokenChart from "@/features/chart-interface/token-chart";
import SwapInterface from "@/features/swap-interface/swap-interface";
import { SwapProvider } from "@/context/swap-context";

export default function Home() {
  console.log("Rendering Home component");
  return (
    <SwapProvider>
      <main className="mt-20 mx-10 lg:mx-20 md:flex-col flex">
        <div className="flex lg:flex-row flex-col">
          <div className="lg:w-2/3 w-full">
            {" "}
            {/* TokenChart takes 65% on larger screens */}
            <TokenChart />
          </div>
          <div className="lg:w-2/5 w-full mt-[30px]">
            {" "}
            {/* SwapInterface takes 35% on larger screens */}
            <SwapInterface />
          </div>
        </div>
      </main>
    </SwapProvider>
  );
}
