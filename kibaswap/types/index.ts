export type Token = {
  name: string;
  symbol: string;
  logo: string | undefined;
  tokenBalance: string;
  usdValue: string;
  priceinUsd: number | null; // Adjust based on your needs
};
