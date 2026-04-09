import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";

export function DashboardScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>AssetFlow</Text>
      <Text style={styles.title}>Portfolio Dashboard</Text>
      <Text style={styles.subtitle}>
        A clean snapshot of your capital, monthly momentum, and top positions.
      </Text>

      <View style={styles.heroCard}>
        <Text style={styles.cardLabel}>Total Portfolio Value</Text>
        <Text style={styles.cardValue}>$12,480.25</Text>
        <Text style={styles.cardGain}>+$652.18 this month</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Unrealized P&L</Text>
          <Text style={styles.statValue}>+$1,284.20</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Holdings</Text>
          <Text style={styles.statValue}>8 Assets</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Holdings</Text>
        {[
          ["AAPL", "Apple Inc.", "$4,820", "+6.2%"],
          ["VOO", "Vanguard S&P 500", "$3,410", "+4.8%"],
          ["BTC", "Bitcoin", "$2,125", "+11.4%"]
        ].map(([symbol, name, value, pnl]) => (
          <View key={symbol} style={styles.rowCard}>
            <View>
              <Text style={styles.rowSymbol}>{symbol}</Text>
              <Text style={styles.rowName}>{name}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{value}</Text>
              <Text style={styles.rowGain}>{pnl}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allocation Snapshot</Text>
        <View style={styles.allocationCard}>
          <Text style={styles.allocationLine}>US Stocks 48%</Text>
          <Text style={styles.allocationLine}>ETF 31%</Text>
          <Text style={styles.allocationLine}>Crypto 17%</Text>
          <Text style={styles.allocationLine}>Cash 4%</Text>
        </View>
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
  section: {
    marginTop: spacing.lg,
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
  }
});
