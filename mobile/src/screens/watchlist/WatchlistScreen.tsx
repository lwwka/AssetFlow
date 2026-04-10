import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";
import { usePortfolioData } from "../../hooks/usePortfolioData";

export function WatchlistScreen() {
  const { marketPulse, watchlistInsights, watchlistItems } = usePortfolioData();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Watchlist</Text>
      <Text style={styles.subtitle}>Assets you are monitoring closely.</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Market Pulse</Text>
        <View style={styles.pulseRow}>
          {marketPulse.map((item) => (
            <View key={item.label} style={styles.pulseItem}>
              <Text style={styles.pulseLabel}>{item.label}</Text>
              <Text style={styles.pulseValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tracked Assets</Text>
      </View>

      {watchlistItems.map((item) => (
        <View key={item.symbol} style={styles.card}>
          <View>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.label}>{item.note}</Text>
            <Text style={styles.signal}>{item.signal}</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.value}>{item.price}</Text>
            <Text
              style={[
                styles.move,
                item.move.startsWith("-") ? styles.loss : styles.gain
              ]}
            >
              {item.move}
            </Text>
          </View>
        </View>
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Insights</Text>
        <View style={styles.insightsCard}>
          {watchlistInsights.map((insight) => (
            <Text key={insight} style={styles.insightLine}>
              {insight}
            </Text>
          ))}
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
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border
  },
  heroLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700"
  },
  pulseRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md
  },
  pulseItem: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: "#EFF6FF"
  },
  pulseLabel: {
    color: colors.mutedText,
    fontSize: 12
  },
  pulseValue: {
    marginTop: spacing.xs,
    color: colors.accent,
    fontSize: 16,
    fontWeight: "700"
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
  label: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 13
  },
  signal: {
    marginTop: spacing.xs,
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700"
  },
  right: {
    alignItems: "flex-end"
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text
  },
  move: {
    marginTop: spacing.xs,
    fontSize: 13,
    fontWeight: "700"
  },
  gain: {
    color: colors.success
  },
  loss: {
    color: colors.danger
  },
  insightsCard: {
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  insightLine: {
    marginTop: spacing.xs,
    color: colors.text,
    fontSize: 14,
    lineHeight: 21
  }
});
