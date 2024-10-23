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