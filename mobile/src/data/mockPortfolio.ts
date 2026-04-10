export type HoldingItem = {
  symbol: string;
  name: string;
  value: string;
  pnl: string;
  quantity: string;
  averageCost: string;
};

export type WatchlistItem = {
  symbol: string;
  price: string;
  move: string;
  note: string;
};

export const portfolioSummary = {
  totalValue: "$12,480.25",
  monthlyChange: "+$652.18 this month",
  unrealizedPnl: "+$1,284.20",
  holdingsCount: "8 Assets"
};

export const topHoldings: HoldingItem[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    value: "$4,820",
    pnl: "+6.2%",
    quantity: "24 shares",
    averageCost: "$188.40 avg"
  },
  {
    symbol: "VOO",
    name: "Vanguard S&P 500",
    value: "$3,410",
    pnl: "+4.8%",
    quantity: "8.5 units",
    averageCost: "$401.25 avg"
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    value: "$2,125",
    pnl: "+11.4%",
    quantity: "0.032 BTC",
    averageCost: "$59,800 avg"
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    value: "$1,760",
    pnl: "+3.1%",
    quantity: "4 shares",
    averageCost: "$428.10 avg"
  }
];

export const allocationSnapshot = [
  "US Stocks 48%",
  "ETF 31%",
  "Crypto 17%",
  "Cash 4%"
];

export const watchlistItems: WatchlistItem[] = [
  {
    symbol: "NVDA",
    price: "$892.50",
    move: "+2.4%",
    note: "AI momentum remains strong"
  },
  {
    symbol: "MSFT",
    price: "$421.80",
    move: "+1.1%",
    note: "Cloud growth still resilient"
  },
  {
    symbol: "ETH",
    price: "$3,185.20",
    move: "-0.8%",
    note: "Watching support around recent range"
  }
];
