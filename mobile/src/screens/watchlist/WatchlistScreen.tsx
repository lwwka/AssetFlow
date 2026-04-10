import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";
import { watchlistItems } from "../../data/mockPortfolio";

export function WatchlistScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Watchlist</Text>
      <Text style={styles.subtitle}>Assets you are monitoring closely.</Text>

      {watchlistItems.map((item) => (
        <View key={item.symbol} style={styles.card}>
          <View>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.label}>{item.note}</Text>
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
  }
});
