import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";
import type { AuthSession } from "../../types/auth";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import {
  fetchPortfolioHoldings,
  fetchUserPortfolios,
  type LiveHolding,
  type UserPortfolio
} from "../../services/portfolioService";

type PortfolioScreenProps = {
  authSession: AuthSession | null;
};

export function PortfolioScreen({ authSession }: PortfolioScreenProps) {
  const {
    allocationSnapshot,
    portfolioSummary,
    recentTransactions,
    topHoldings
  } = usePortfolioData();
  const [livePortfolios, setLivePortfolios] = useState<UserPortfolio[]>([]);
  const [liveHoldings, setLiveHoldings] = useState<LiveHolding[]>([]);
  const [isLoadingLivePortfolios, setIsLoadingLivePortfolios] = useState(false);
  const [isLoadingLiveHoldings, setIsLoadingLiveHoldings] = useState(false);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);
  const [holdingsError, setHoldingsError] = useState<string | null>(null);

  useEffect(() => {
    const userId = authSession?.user.id;

    setLivePortfolios([]);
    setPortfolioError(null);
    setHoldingsError(null);
    setLiveHoldings([]);

    if (!userId || authSession?.source !== "live") {
      return;
    }

    let isMounted = true;

    const loadPortfolios = async () => {
      try {
        setIsLoadingLivePortfolios(true);
        const portfolios = await fetchUserPortfolios(userId);

        if (!isMounted) {
          return;
        }

        setLivePortfolios(portfolios);

        const firstPortfolio = portfolios[0];
        if (!firstPortfolio) {
          return;
        }

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
              : "Unable to load holdings from the backend."
          );
        } finally {
          if (isMounted) {
            setIsLoadingLiveHoldings(false);
          }
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setPortfolioError(
          error instanceof Error
            ? error.message
            : "Unable to load portfolios from the backend."
        );
      } finally {
        if (isMounted) {
          setIsLoadingLivePortfolios(false);
        }
      }
    };

    void loadPortfolios();

    return () => {
      isMounted = false;
    };
  }, [authSession]);

  const usesLivePortfolioData = authSession?.source === "live";
  const hasLivePortfolios = livePortfolios.length > 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Portfolio</Text>
      <Text style={styles.subtitle}>Your current holdings and performance.</Text>

      <View style={styles.heroCard}>
        <View style={styles.heroRow}>
          <View>
            <Text style={styles.heroLabel}>Total Value</Text>
            <Text style={styles.heroValue}>{portfolioSummary.totalValue}</Text>
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.heroPnl}>{portfolioSummary.unrealizedPnl}</Text>
            <Text style={styles.heroSubLabel}>Unrealized P&L</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Portfolios</Text>
        <View style={styles.liveCard}>
          <View style={styles.liveStatusRow}>
            <Text style={styles.liveStatusLabel}>Source</Text>
            <Text style={styles.liveStatusValue}>
              {usesLivePortfolioData ? "Backend /api/portfolios" : "Offline demo"}
            </Text>
          </View>
          <View style={styles.liveStatusRow}>
            <Text style={styles.liveStatusLabel}>Status</Text>
            <Text style={styles.liveStatusValue}>
              {isLoadingLivePortfolios
                ? "Loading"
                : usesLivePortfolioData
                  ? `${livePortfolios.length} portfolio(s)`
                  : "Using mock holdings below"}
            </Text>
          </View>
          {portfolioError ? <Text style={styles.errorText}>{portfolioError}</Text> : null}
          {!usesLivePortfolioData ? (
            <Text style={styles.helperText}>
              Sign in with the live backend to see your saved portfolios here.
            </Text>
          ) : null}
          {usesLivePortfolioData && !isLoadingLivePortfolios && livePortfolios.length === 0 ? (
            <Text style={styles.helperText}>
              No portfolios found yet. Create your first portfolio from the backend flow.
            </Text>
          ) : null}
          {livePortfolios.map((portfolio) => (
            <View key={portfolio.id} style={styles.livePortfolioCard}>
              <View>
                <Text style={styles.symbol}>{portfolio.name}</Text>
                <Text style={styles.label}>Portfolio ID #{portfolio.id}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.value}>{portfolio.baseCurrency}</Text>
                <Text style={styles.liveTag}>Live portfolio</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Holdings</Text>
      </View>
      {usesLivePortfolioData && hasLivePortfolios ? (
        <View style={styles.liveHoldingsCard}>
          <View style={styles.liveStatusRow}>
            <Text style={styles.liveStatusLabel}>Source</Text>
            <Text style={styles.liveStatusValue}>
              {isLoadingLiveHoldings
                ? "Loading"
                : liveHoldings.length > 0
                  ? "Backend /api/portfolios/{id}/holdings"
                  : "No live holdings"}
            </Text>
          </View>
          {holdingsError ? <Text style={styles.errorText}>{holdingsError}</Text> : null}
          {liveHoldings.length === 0 && !isLoadingLiveHoldings ? (
            <Text style={styles.helperText}>
              No holdings found yet. Add holdings in the backend to see them here.
            </Text>
          ) : null}
          {liveHoldings.map((holding) => (
            <View key={holding.id} style={styles.card}>
              <View>
                <Text style={styles.symbol}>{holding.symbol}</Text>
                <Text style={styles.name}>{holding.assetType}</Text>
                <Text style={styles.label}>
                  Qty {holding.quantity.toFixed(4)} • Avg {holding.averageCost.toFixed(2)}{" "}
                  {holding.currency}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.value}>
                  {holding.costBasis.toFixed(2)} {holding.currency}
                </Text>
                <Text style={styles.liveTag}>Cost basis</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        topHoldings.map((holding) => (
          <View key={holding.symbol} style={styles.card}>
            <View>
              <Text style={styles.symbol}>{holding.symbol}</Text>
              <Text style={styles.name}>{holding.name}</Text>
              <Text style={styles.label}>
                {holding.quantity} • {holding.averageCost}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.value}>{holding.value}</Text>
              <Text style={styles.gain}>{holding.pnl}</Text>
            </View>
          </View>
        ))
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allocation</Text>
        <View style={styles.allocationCard}>
          {allocationSnapshot.map((line) => (
            <Text key={line} style={styles.allocationLine}>
              {line}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {recentTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View>
              <Text style={styles.transactionTitle}>
                {transaction.type} {transaction.symbol}
              </Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>{transaction.amount}</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.mutedText,
    fontSize: 15
  },
  heroCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: 20
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  heroLabel: {
    color: "#CBD5E1",
    fontSize: 13
  },
  heroValue: {
    marginTop: spacing.sm,
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  heroRight: {
    alignItems: "flex-end"
  },
  heroPnl: {
    color: "#86EFAC",
    fontSize: 18,
    fontWeight: "700"
  },
  heroSubLabel: {
    marginTop: spacing.xs,
    color: "#CBD5E1",
    fontSize: 12
  },
  section: {
    marginBottom: spacing.md
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  liveCard: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border
  },
  liveStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm
  },
  liveStatusLabel: {
    color: colors.mutedText,
    fontSize: 13
  },
  liveStatusValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700"
  },
  helperText: {
    marginTop: spacing.sm,
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18
  },
  errorText: {
    marginTop: spacing.sm,
    color: colors.danger,
    fontSize: 13,
    lineHeight: 18
  },
  livePortfolioCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: "#FBFDFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  liveHoldingsCard: {
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border
  },
  symbol: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text
  },
  name: {
    marginTop: spacing.xs,
    color: colors.text,
    fontSize: 14,
    fontWeight: "600"
  },
  label: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 13
  },
  right: {
    alignItems: "flex-end"
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text
  },
  gain: {
    marginTop: spacing.xs,
    color: colors.success,
    fontSize: 13,
    fontWeight: "700"
  },
  liveTag: {
    marginTop: spacing.xs,
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700"
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
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border
  },
  transactionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700"
  },
  transactionDate: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 13
  },
  transactionAmount: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700"
  }
});
