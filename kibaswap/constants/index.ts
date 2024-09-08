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
} from "@/public";

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
