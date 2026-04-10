import { useEffect, useState } from "react";
import {
  getAllocationSnapshot,
  getDataMode,
  getMarketPulse,
  getPortfolioSummary,
  getProfilePreferences,
  getProfileStatusItems,
  getRecentTransactions,
  getTopHoldings,
  getWatchlistInsights,
  getWatchlistItems,
  loadPortfolioData,
  type PortfolioDataBundle
} from "../services/portfolioService";

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioDataBundle>({
    dataMode: getDataMode(),
    portfolioSummary: getPortfolioSummary(),
    topHoldings: getTopHoldings(),
    allocationSnapshot: getAllocationSnapshot(),
    recentTransactions: getRecentTransactions(),
    watchlistItems: getWatchlistItems(),
    watchlistInsights: getWatchlistInsights(),
    marketPulse: getMarketPulse(),
    profilePreferences: getProfilePreferences(),
    profileStatusItems: getProfileStatusItems()
  });
  const [isLoading, setIsLoading] = useState(getDataMode() === "live");
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = () => {
    setReloadKey((current) => current + 1);
  };

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      setIsLoading(true);
      const result = await loadPortfolioData();

      if (!isMounted) {
        return;
      }

      setData(result.data);
      setError(result.error);
      setIsLoading(false);
    };

    void run();

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  return {
    isLoading,
    error,
    reload,
    ...data
  };
}
