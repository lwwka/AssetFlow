import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";
import type { AuthSession } from "../../types/auth";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import {
  fetchPortfolioHoldings,
  fetchPortfolioSummary,
  fetchUserPortfolios,
  fetchPortfolioTransactions,
  type LiveHolding,
  type LiveTransaction,
  type LivePortfolioSummary
} from "../../services/portfolioService";

type DashboardScreenProps = {
  authSession: AuthSession | null;
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function formatPercent(value: number) {
  return `${value.toFixed(0)}%`;
}

function summarizeTopHoldings(holdings: LiveHolding[], currency: string) {
  return [...holdings]
    .sort((left, right) => right.costBasis - left.costBasis)
    .slice(0, 3)
    .map((holding) => ({
      symbol: holding.symbol,
      name: holding.assetType,
      value: formatCurrency(holding.costBasis, currency || holding.currency),
      pnl: `Cost basis ${formatCurrency(holding.costBasis, currency || holding.currency)}`,
      quantity: `Qty ${holding.quantity.toFixed(4)}`,
      averageCost: `Avg ${formatCurrency(holding.averageCost, currency || holding.currency)}`
    }));
}

function buildAllocationSnapshot(holdings: LiveHolding[], currency: string) {
  const totalCostBasis = holdings.reduce((sum, holding) => sum + holding.costBasis, 0);

  if (totalCostBasis <= 0) {
    return ["No allocation data available"];
  }

  const grouped = holdings.reduce<Record<string, number>>((accumulator, holding) => {
    const key = holding.assetType;
    accumulator[key] = (accumulator[key] ?? 0) + holding.costBasis;
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .sort((left, right) => right[1] - left[1])
    .map(([assetType, costBasis]) => {
      const share = (costBasis / totalCostBasis) * 100;
      return `${assetType} ${formatPercent(share)} (${formatCurrency(
        costBasis,
        currency || "USD"
      )})`;
    });
}

export function DashboardScreen({ authSession }: DashboardScreenProps) {
  const {
    allocationSnapshot,
    dataMode,
    error,
    isLoading,
    portfolioSummary,
    recentTransactions,
    reload,
    topHoldings,
    watchlistItems
  } = usePortfolioData();
  const [liveSummary, setLiveSummary] = useState<LivePortfolioSummary | null>(null);
  const [liveHoldings, setLiveHoldings] = useState<LiveHolding[]>([]);
  const [liveTransactions, setLiveTransactions] = useState<LiveTransaction[]>([]);
  const [isLoadingLiveSummary, setIsLoadingLiveSummary] = useState(false);
  const [isLoadingLiveHoldings, setIsLoadingLiveHoldings] = useState(false);
  const [isLoadingLiveTransactions, setIsLoadingLiveTransactions] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [holdingsError, setHoldingsError] = useState<string | null>(null);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);

  useEffect(() => {
    const userId = authSession?.user.id;

    setLiveSummary(null);
    setLiveHoldings([]);
    setLiveTransactions([]);
    setSummaryError(null);
    setHoldingsError(null);
    setTransactionsError(null);

    if (!userId || authSession?.source !== "live") {
      return;
    }

    let isMounted = true;

    const loadLiveSummary = async () => {
      try {
        setIsLoadingLiveSummary(true);
        const portfolios = await fetchUserPortfolios(userId);
        const firstPortfolio = portfolios[0];

        if (!firstPortfolio) {
          if (isMounted) {
            setSummaryError("No portfolios found for the current user.");
          }
          return;
        }

        const summary = await fetchPortfolioSummary(firstPortfolio.id);

        if (!isMounted) {
          return;
        }

        setLiveSummary(summary);

        try {
          setIsLoadingLiveHoldings(true);
          const holdings = await fetchPortfolioHoldings(firstPortfolio.id);

          if (!isMounted) {
            return;
          }

          setLiveHoldings(holdings);
        } catch (error) {
          if (!isMounted) {
            return;
          }

          setHoldingsError(
            error instanceof Error
              ? error.message
              : "Unable to load live holdings."
          );
        } finally {
          if (isMounted) {
            setIsLoadingLiveHoldings(false);
          }
        }

        try {
          setIsLoadingLiveTransactions(true);
          const transactions = await fetchPortfolioTransactions(firstPortfolio.id);

          if (!isMounted) {
            return;
          }

          setLiveTransactions(transactions);
        } catch (error) {
          if (!isMounted) {
            return;
          }

          setTransactionsError(
            error instanceof Error
              ? error.message
              : "Unable to load live transactions."
          );
        } finally {
          if (isMounted) {
            setIsLoadingLiveTransactions(false);
          }
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setSummaryError(
          error instanceof Error
            ? error.message
            : "Unable to load the live dashboard summary."
        );
      } finally {
        if (isMounted) {
          setIsLoadingLiveSummary(false);
        }
      }
    };

    void loadLiveSummary();

    return () => {
      isMounted = false;
    };
  }, [authSession]);

  const showLiveSummary = authSession?.source === "live";
  const liveCurrency = liveSummary?.baseCurrency ?? "USD";
  const liveTopHoldings = showLiveSummary
    ? summarizeTopHoldings(liveHoldings, liveCurrency)
    : topHoldings.slice(0, 3);
  const liveAllocationSnapshot = showLiveSummary
    ? buildAllocationSnapshot(liveHoldings, liveCurrency)
    : allocationSnapshot;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.badgeRow}>
        <Text style={styles.badge}>AssetFlow</Text>
        <Text style={styles.demoBadge}>
          {dataMode === "live" ? "Live Mode" : "Offline Demo"}
        </Text>
      </View>
      <Text style={styles.title}>Portfolio Dashboard</Text>
      <Text style={styles.subtitle}>
        A clean snapshot of your capital, monthly momentum, and top positions.
      </Text>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          {isLoading ? "Loading portfolio data..." : "Portfolio data ready"}
        </Text>
        <Pressable
          style={[styles.reloadButton, isLoading && styles.reloadButtonDisabled]}
          onPress={reload}
          disabled={isLoading}
        >
          <Text style={styles.reloadButtonText}>
            {isLoading ? "Refreshing..." : "Reload"}
          </Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.heroCard}>
        <Text style={styles.cardLabel}>Total Portfolio Value</Text>
        <Text style={styles.cardValue}>{portfolioSummary.totalValue}</Text>
        <Text style={styles.cardGain}>{portfolioSummary.monthlyChange}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Unrealized P&L</Text>
          <Text style={styles.statValue}>{portfolioSummary.unrealizedPnl}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Holdings</Text>
          <Text style={styles.statValue}>{portfolioSummary.holdingsCount}</Text>
        </View>
      </View>

      {showLiveSummary && isLoadingLiveHoldings ? (
        <Text style={styles.helperText}>Loading live holdings...</Text>
      ) : null}
      {holdingsError ? <Text style={styles.errorText}>{holdingsError}</Text> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Portfolio Summary</Text>
        <View style={styles.liveCard}>
          <View style={styles.liveRow}>
            <Text style={styles.liveLabel}>Source</Text>
            <Text style={styles.liveValue}>
              {showLiveSummary ? "Backend /api/portfolios/{id}/summary" : "Offline demo"}
            </Text>
          </View>
          <View style={styles.liveRow}>
            <Text style={styles.liveLabel}>Status</Text>
            <Text style={styles.liveValue}>
              {isLoadingLiveSummary
                ? "Loading"
                : liveSummary
                  ? "Live summary ready"
                  : showLiveSummary
                    ? "Waiting for portfolio data"
                    : "Sign in with live backend"}
            </Text>
          </View>
          {summaryError ? <Text style={styles.errorText}>{summaryError}</Text> : null}
          {liveSummary ? (
            <>
              <View style={styles.liveRow}>
                <Text style={styles.liveLabel}>Portfolio</Text>
                <Text style={styles.liveValue}>{liveSummary.portfolioName}</Text>
              </View>
              <View style={styles.liveRow}>
                <Text style={styles.liveLabel}>Total cost basis</Text>
                <Text style={styles.liveValue}>
                  {formatCurrency(
                    liveSummary.totalCostBasis,
                    liveSummary.baseCurrency || "USD"
                  )}
                </Text>
              </View>
              <View style={styles.liveRow}>
                <Text style={styles.liveLabel}>Holdings count</Text>
                <Text style={styles.liveValue}>{liveSummary.holdingsCount}</Text>
              </View>
              <Text style={styles.helperText}>
                {liveSummary.marketDataAvailable
                  ? "Market pricing is connected."
                  : "This summary currently uses cost basis only. Market pricing is not connected yet."}
              </Text>
            </>
          ) : null}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Holdings</Text>
        {liveTopHoldings.map((holding) => (
          <View key={holding.symbol} style={styles.rowCard}>
            <View>
              <Text style={styles.rowSymbol}>{holding.symbol}</Text>
              <Text style={styles.rowName}>{holding.name}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{holding.value}</Text>
              <Text style={styles.rowGain}>{holding.pnl}</Text>
              {holding.quantity ? <Text style={styles.rowMeta}>{holding.quantity}</Text> : null}
              {holding.averageCost ? (
                <Text style={styles.rowMeta}>{holding.averageCost}</Text>
              ) : null}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allocation Snapshot</Text>
        <View style={styles.allocationCard}>
          {liveAllocationSnapshot.map((line) => (
            <Text key={line} style={styles.allocationLine}>
              {line}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {showLiveSummary ? (
          <>
            {transactionsError ? <Text style={styles.errorText}>{transactionsError}</Text> : null}
            {liveTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.activityCard}>
                <View>
                  <Text style={styles.activityTitle}>
                    {transaction.type} {transaction.symbol}
                  </Text>
                  <Text style={styles.activityDate}>
                    {transaction.tradeDate} • Qty {transaction.quantity}
                  </Text>
                </View>
                <Text style={styles.activityAmount}>
                  {formatCurrency(transaction.amount, transaction.currency)}
                </Text>
              </View>
            ))}
            {!isLoadingLiveTransactions && liveTransactions.length === 0 ? (
              <Text style={styles.helperText}>
                No live transactions found yet. Add transactions in the backend to see them here.
              </Text>
            ) : null}
            {isLoadingLiveTransactions ? (
              <Text style={styles.helperText}>Loading live transactions...</Text>
            ) : null}
          </>
        ) : (
          recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.activityCard}>
              <View>
                <Text style={styles.activityTitle}>
                  {transaction.type} {transaction.symbol}
                </Text>
                <Text style={styles.activityDate}>{transaction.date}</Text>
              </View>
              <Text style={styles.activityAmount}>{transaction.amount}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Watchlist Preview</Text>
        {watchlistItems.slice(0, 2).map((item) => (
          <View key={item.symbol} style={styles.previewCard}>
            <View>
              <Text style={styles.previewSymbol}>{item.symbol}</Text>
              <Text style={styles.previewNote}>{item.note}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{item.price}</Text>
              <Text
                style={[
                  styles.previewMove,
                  item.move.startsWith("-") ? styles.previewLoss : styles.previewGain
                ]}
              >
                {item.move}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  badge: {
    alignSelf: "flex-start",
    marginBottom: spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase"
  },
  demoBadge: {
    marginBottom: spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FEF3C7",
    color: "#92400E",
    fontSize: 12,
    fontWeight: "700"
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    fontSize: 15,
    lineHeight: 22,
    color: colors.mutedText
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.md
  },
  statusText: {
    color: colors.mutedText,
    fontSize: 13
  },
  reloadButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  reloadButtonDisabled: {
    opacity: 0.7
  },
  reloadButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700"
  },
  errorText: {
    marginBottom: spacing.md,
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  },
  heroCard: {
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.primary,
    shadowColor: "#0F172A",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  cardLabel: {
    color: "#CBD5E1",
    fontSize: 14
  },
  cardValue: {
    marginTop: spacing.sm,
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700"
  },
  cardGain: {
    marginTop: spacing.sm,
    color: "#86EFAC",
    fontSize: 14,
    fontWeight: "600"
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  statLabel: {
    color: colors.mutedText,
    fontSize: 13
  },
  statValue: {
    marginTop: spacing.sm,
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  liveCard: {
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  liveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.md
  },
  liveLabel: {
    color: colors.mutedText,
    fontSize: 13
  },
  liveValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right"
  },
  helperText: {
    marginTop: spacing.sm,
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18
  },
  section: {
    marginTop: spacing.lg
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  rowSymbol: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700"
  },
  rowName: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 13
  },
  rowRight: {
    alignItems: "flex-end"
  },
  rowValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700"
  },
  rowGain: {
    marginTop: spacing.xs,
    color: colors.success,
    fontSize: 13,
    fontWeight: "700"
  },
  rowMeta: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 12
  },
  allocationCard: {
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  allocationLine: {
    marginTop: spacing.xs,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  activityTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700"
  },
  activityDate: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 13
  },
  activityAmount: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700"
  },
  previewCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  previewSymbol: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700"
  },
  previewNote: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 13,
    maxWidth: 220
  },
  previewMove: {
    marginTop: spacing.xs,
    fontSize: 13,
    fontWeight: "700"
  },
  previewGain: {
    color: colors.success
  },
  previewLoss: {
    color: colors.danger
  }
});
