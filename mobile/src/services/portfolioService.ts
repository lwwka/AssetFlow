import { Platform } from "react-native";
import {
  allocationSnapshot,
  marketPulse,
  portfolioSummary,
  profilePreferences,
  profileStatusItems,
  recentTransactions,
  topHoldings,
  watchlistInsights,
  watchlistItems
} from "../data/mockPortfolio";

export type DataMode = "mock" | "live";
export type ProfileStatusItem = {
  label: string;
  value: string;
};
export type UserPortfolio = {
  id: number;
  name: string;
  baseCurrency: string;
  userId: number;
};
export type LivePortfolioSummary = {
  portfolioId: number;
  portfolioName: string;
  baseCurrency: string;
  totalCostBasis: number;
  holdingsCount: number;
  marketDataAvailable: boolean;
};
export type LiveHolding = {
  id: number;
  symbol: string;
  assetType: string;
  quantity: number;
  averageCost: number;
  currency: string;
  costBasis: number;
};
export type LiveTransaction = {
  id: number;
  type: string;
  symbol: string;
  quantity: number;
  price: number;
  amount: number;
  currency: string;
  tradeDate: string;
};
export type PortfolioDataBundle = {
  dataMode: DataMode;
  portfolioSummary: typeof portfolioSummary;
  topHoldings: typeof topHoldings;
  allocationSnapshot: typeof allocationSnapshot;
  recentTransactions: typeof recentTransactions;
  watchlistItems: typeof watchlistItems;
  watchlistInsights: typeof watchlistInsights;
  marketPulse: typeof marketPulse;
  profilePreferences: typeof profilePreferences;
  profileStatusItems: ProfileStatusItem[];
};
const DATA_MODE: DataMode = "mock";
const API_BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

function buildProfileStatusItems({
  backendConnected,
  sourceLabel
}: {
  backendConnected: boolean;
  sourceLabel: string;
}): ProfileStatusItem[] {
  return profileStatusItems.map((item) => {
    if (item.label === "Mode") {
      return {
        ...item,
        value: DATA_MODE === "live" ? "Live API" : "Offline Demo"
      };
    }

    if (item.label === "Backend") {
      return {
        ...item,
        value: backendConnected ? "Connected" : "Disconnected"
      };
    }

    if (item.label === "Data source") {
      return {
        ...item,
        value: sourceLabel
      };
    }

    return item;
  });
}

function buildMockPortfolioDataBundle(): PortfolioDataBundle {
  return {
    dataMode: DATA_MODE,
    portfolioSummary,
    topHoldings,
    allocationSnapshot,
    recentTransactions,
    watchlistItems,
    watchlistInsights,
    marketPulse,
    profilePreferences,
    profileStatusItems: buildProfileStatusItems({
      backendConnected: false,
      sourceLabel: "Shared mock data"
    })
  };
}

export function getDataMode() {
  return DATA_MODE;
}

export function getPortfolioSummary() {
  return buildMockPortfolioDataBundle().portfolioSummary;
}

export function getTopHoldings() {
  return buildMockPortfolioDataBundle().topHoldings;
}

export function getAllocationSnapshot() {
  return buildMockPortfolioDataBundle().allocationSnapshot;
}

export function getRecentTransactions() {
  return buildMockPortfolioDataBundle().recentTransactions;
}

export function getWatchlistItems() {
  return buildMockPortfolioDataBundle().watchlistItems;
}

export function getWatchlistInsights() {
  return buildMockPortfolioDataBundle().watchlistInsights;
}

export function getMarketPulse() {
  return buildMockPortfolioDataBundle().marketPulse;
}

export function getProfilePreferences() {
  return buildMockPortfolioDataBundle().profilePreferences;
}

export function getProfileStatusItems() {
  return buildMockPortfolioDataBundle().profileStatusItems;
}

export async function fetchUserPortfolios(userId: number): Promise<UserPortfolio[]> {
  const response = await fetch(`${API_BASE_URL}/api/portfolios/user/${userId}`);

  if (!response.ok) {
    throw new Error(`Portfolio API returned status ${response.status}.`);
  }

  return (await response.json()) as UserPortfolio[];
}

export async function fetchPortfolioSummary(
  portfolioId: number
): Promise<LivePortfolioSummary> {
  const response = await fetch(`${API_BASE_URL}/api/portfolios/${portfolioId}/summary`);

  if (!response.ok) {
    throw new Error(`Portfolio summary API returned status ${response.status}.`);
  }

  return (await response.json()) as LivePortfolioSummary;
}

export async function fetchPortfolioHoldings(
  portfolioId: number
): Promise<LiveHolding[]> {
  const response = await fetch(`${API_BASE_URL}/api/portfolios/${portfolioId}/holdings`);

  if (!response.ok) {
    throw new Error(`Portfolio holdings API returned status ${response.status}.`);
  }

  return (await response.json()) as LiveHolding[];
}

export async function fetchPortfolioTransactions(
  portfolioId: number
): Promise<LiveTransaction[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/portfolios/${portfolioId}/transactions`
  );

  if (!response.ok) {
    throw new Error(`Portfolio transactions API returned status ${response.status}.`);
  }

  return (await response.json()) as LiveTransaction[];
}

export async function loadPortfolioData(userId = 1): Promise<{
  data: PortfolioDataBundle;
  error: string | null;
}> {
  const mockData = buildMockPortfolioDataBundle();

  if (DATA_MODE === "mock") {
    return {
      data: mockData,
      error: null
    };
  }

  try {
    const portfolios = await fetchUserPortfolios(userId);
    const firstPortfolio = portfolios[0];
    const livePreferences = [...profilePreferences];

    if (firstPortfolio) {
      livePreferences[0] = `Base currency: ${firstPortfolio.baseCurrency}`;
      livePreferences[1] = `Default portfolio: ${firstPortfolio.name}`;
    }

    return {
      data: {
        ...mockData,
        profilePreferences: livePreferences,
        profileStatusItems: buildProfileStatusItems({
          backendConnected: true,
          sourceLabel: `Backend portfolios (${portfolios.length})`
        })
      },
      error: null
    };
  } catch (error) {
    return {
      data: {
        ...mockData,
        profileStatusItems: buildProfileStatusItems({
          backendConnected: false,
          sourceLabel: "Shared mock data (fallback)"
        })
      },
      error:
        error instanceof Error
          ? error.message
          : "Unable to load portfolio data from backend."
    };
  }
}
