import {
  Logo,
  ArrowDownUp,
  Send,
  Creditcard,
  Coin,
  Pool,
  ArrowLeftRight,
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
    title: "Explore",
    link: "/explore",
    hoverContents: [
      {
        avatarSrc: Coin,
        description: "Tokens",
        link: "/explore",
      },
      {
        avatarSrc: Pool,
        description: "Pool",
        link: "/explore/pools",
      },
      {
        avatarSrc: ArrowLeftRight,
        description: "Transactions",
        link: "/explore/transactions",
      },
    ],
  },
  {
    id: 3,
    title: "Pool",
    link: "/pool",
    hoverContents: [
      {
        avatarSrc: Position,
        description: "View Position",
        link: "/pool",
      },
      {
        avatarSrc: AddPosition,
        description: "Create Position",
        link: "/add",
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
