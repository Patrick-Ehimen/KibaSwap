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
