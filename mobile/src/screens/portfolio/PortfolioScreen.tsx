import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";
import { usePortfolioData } from "../../hooks/usePortfolioData";

export function PortfolioScreen() {
  const {
    allocationSnapshot,
    portfolioSummary,
    recentTransactions,
    topHoldings
  } = usePortfolioData();

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
        <Text style={styles.sectionTitle}>Current Holdings</Text>
      </View>
      {topHoldings.map((holding) => (
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
      ))}

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
