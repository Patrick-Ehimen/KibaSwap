import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Wallet } from "lucide-react";
import Image from "next/image";

import { Logo } from "@/public";

export default function NFT() {
  return (
    <div className="min-h-screen mx-10 text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Staking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-[#e35e49] rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold">Stake</h2>
              <p className="text-gray-500">
                Stake your Kiba tokens to receive Unicorn Power
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-[#e35e49] rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold">Delegate</h2>
              <p className="text-gray-500">
                <span className="text-[#E33319] pr-1">Delegate</span>
                your Power and start receiving rewards
              </p>
            </div>
          </div>
        </div>

        <Card className="bg-[#353546] border-0">
          <CardContent className="p-6">
            <Tabs defaultValue="stake">
              <TabsList className="bg-transparent border-b border-gray-700 mb-6">
                <TabsTrigger
                  value="stake"
                  className="text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#23242F]"
                >
                  Stake
                </TabsTrigger>
                <TabsTrigger
                  value="unstake"
                  className="text-[#8b949e] data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#23242F]"
                >
                  Unstake
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stake">
                <div className="space-y-4">
                  <div className="bg-[#23242F] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#8b949e]">Amount</span>
                      <span className="text-2xl font-bold">0</span>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={Logo}
                        alt="Kiba Token"
                        className="w-6 h-6 mr-2"
                        width={25}
                        height={25}
                      />
                      <span className="text-lg font-semibold">Kiba</span>
                      <span className="ml-auto text-gray-500">~$0.00</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#E33319] hover:bg-[#e35e49] text-white">
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect wallet
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="unstake">
                <div className="space-y-4">
                  <div className="bg-[#23242F] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#8b949e]">Amount</span>
                      <span className="text-2xl font-bold">0</span>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={Logo}
                        alt="Kiba Token"
                        className="w-6 h-6 mr-2"
                        width={25}
                        height={25}
                      />
                      <span className="text-lg font-semibold">Kiba</span>
                      <span className="ml-auto text-gray-500">~$0.00</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#E33319] hover:bg-[#e35e49] text-white">
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect wallet
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Kiba governance</h2>
        <h3 className="text-xl font-semibold mb-2 text-gray-500">
          Participate in Kiba Network improvements
        </h3>
        <p className="text-gray-500 max-w-3xl">
          Independently from delegating to resolvers, you can participate in DAO
          activities. Create proposals, vote for them or delegate your voting
          power to a trusted delegate.
        </p>
      </div>
    </div>
  );
}
