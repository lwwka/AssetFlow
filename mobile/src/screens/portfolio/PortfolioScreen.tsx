import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";

const holdings = [
  { symbol: "AAPL", value: "$4,820", pnl: "+6.2%" },
  { symbol: "VOO", value: "$3,410", pnl: "+4.8%" },
  { symbol: "BTC", value: "$2,125", pnl: "+11.4%" }
];

export function PortfolioScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Portfolio</Text>
      <Text style={styles.subtitle}>Your current holdings and performance.</Text>

      {holdings.map((holding) => (
        <View key={holding.symbol} style={styles.card}>
          <View>
            <Text style={styles.symbol}>{holding.symbol}</Text>
            <Text style={styles.label}>Market Value</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.value}>{holding.value}</Text>
            <Text style={styles.gain}>{holding.pnl}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background
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
  }
});
