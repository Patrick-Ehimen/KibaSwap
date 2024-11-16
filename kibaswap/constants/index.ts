import {
  Logo,
  ArrowDownUp,
  Send,
  Creditcard,
  Pool,
  Position,
  AddPosition,
  Ethereum,
  Avalance,
  Arbitrum,
  Optimism,
  Polygon,
  BSC,
  Base,
  ChainImg,
} from "@/public";

import { Network } from "@/interfaces";

export const menuItems = [
  {
    id: 1,
    title: "Trade",
    link: "/",
    hoverContents: [
      {
        avatarSrc: ArrowDownUp,
        description: "Swap",
        link: "/",
      },
      {
        avatarSrc: Send,
        description: "Send",
        link: "/send",
      },
      {
        avatarSrc: Creditcard,
        description: "Buy",
        link: "/buy",
      },
    ],
  },
  {
    id: 2,
    title: "NFT",
    link: "/stake-nft",
    hoverContents: [
      {
        avatarSrc: Position,
        description: "Stake NFT",
        link: "/stake-nft",
      },
      {
        avatarSrc: AddPosition,
        description: "Mint NFT",
        link: "",
      },
    ],
  },
  {
    id: 3,
    title: "Explore",
    link: "/explore",
    hoverContents: [
      {
        avatarSrc: Pool,
        description: "Markets",
        link: "/explore",
      },
    ],
  },
];

export const networks: Network[] = [
  {
    name: "All Networks",
    icon: ChainImg,
  },
  {
    name: "Ethereum",
    icon: Ethereum,
  },
  {
    name: "Arbitrum",
    icon: Arbitrum,
  },
  {
    name: "Optimism",
    icon: Optimism,
  },
  {
    name: "Polygon",
    icon: Polygon,
  },
  { name: "Base", icon: Base },
  {
    name: "BNB Chain",
    icon: BSC,
  },
  {
    name: "Avalanche",
    icon: Avalance,
  },
];
