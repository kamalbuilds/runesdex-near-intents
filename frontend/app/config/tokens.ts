export interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  chain: string;
  decimals: number;
}

export const supportedTokens: Token[] = [
  {
    id: "near.near", 
    name: "NEAR",
    symbol: "NEAR",
    logo: "/tokens/near.svg",
    chain: "nep141",
    decimals: 24
  },
  {
    id: "usdc.near",
    name: "USD Coin",
    symbol: "USDC",
    logo: "/tokens/usdc.svg",
    chain: "nep141",
    decimals: 6
  },
  {
    id: "bitcoin.ordinals",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/tokens/btc.svg",
    chain: "rune",
    decimals: 8
  },
  {
    id: "usdt.near",
    name: "Tether USD",
    symbol: "USDT",
    logo: "/tokens/usdt.svg",
    chain: "nep141",
    decimals: 6
  },
  {
    id: "weth.near",
    name: "Wrapped Ether",
    symbol: "WETH",
    logo: "/tokens/eth.svg",
    chain: "nep141",
    decimals: 18
  },
  {
    id: "sats.ordinals",
    name: "Sats",
    symbol: "SATS",
    logo: "/tokens/sats.svg",
    chain: "rune",
    decimals: 8
  }
]; 