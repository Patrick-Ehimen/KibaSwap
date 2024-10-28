export interface Network {
  name: string;
  icon: string;
}

export interface Token {
  symbol: string;
  name: string;
  logo: string;
  pinned?: boolean;
}

export interface Token {
  chainId: number;
  symbol: string;
  name: string;
  logo: string;
  pinned?: boolean;
  address: string;
  explorer: string;
  website: string;
  twitter: string;
}

export interface TokenSelectProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
  tokens: Token[];
}

export interface SwapContextType {
  fromAmount: string;
  setFromAmount: (amount: string) => void;
  fromTokenAddress: string;
  fromTokenChainId: number;
  toTokenAddress: string;
  toTokenChainId: number;
  setFromToken: (address: string, chainId: number) => void;
  setToToken: (address: string, chainId: number) => void;
}

export interface TokenInfoProps {
  token:
    | {
        logo: string;
        symbol: string;
        name: string;
        explorer: string;
        website: string;
        twitter: string;
      }
    | undefined;
}

export interface DailyChartProps {
  token: string;
}

export interface TokenData {
  market_data?: {
    market_cap?: {
      usd?: number;
    };
    circulating_supply?: number;
  };
  market_cap_rank?: number;
  description?: {
    en?: string;
  };
}
