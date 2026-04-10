import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";
import { usePortfolioData } from "../../hooks/usePortfolioData";

type ProfileScreenProps = {
  userName: string;
  userEmail: string;
  onLogout: () => void;
};

export function ProfileScreen({
  userName,
  userEmail,
  onLogout
}: ProfileScreenProps) {
  const { profilePreferences, profileStatusItems } = usePortfolioData();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Account and app preferences.</Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>
        <Text style={styles.memberTag}>Investor account</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.card}>
          {profileStatusItems.map((item) => (
            <View key={item.label} style={styles.statusRow}>
              <Text style={styles.statusLabel}>{item.label}</Text>
              <Text style={styles.statusValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          {profilePreferences.map((item) => (
            <Text key={item} style={styles.meta}>
              {item}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Backend Steps</Text>
        <View style={styles.card}>
          <Text style={styles.meta}>1. Start Spring Boot auth APIs</Text>
          <Text style={styles.meta}>2. Connect portfolios and holdings endpoints</Text>
          <Text style={styles.meta}>3. Replace demo mode with token-based login</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
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
  header: {
    marginBottom: spacing.lg
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.mutedText,
    fontSize: 15
  },
  heroCard: {
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.primary,
    marginBottom: spacing.lg
  },
  section: {
    marginBottom: spacing.lg
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  card: {
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  email: {
    marginTop: spacing.xs,
    color: "#CBD5E1",
    fontSize: 14
  },
  memberTag: {
    marginTop: spacing.md,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700"
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md
  },
  statusLabel: {
    color: colors.mutedText,
    fontSize: 14
  },
  statusValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700"
  },
  meta: {
    marginTop: spacing.md,
    color: colors.text,
    fontSize: 14
  },
  button: {
    marginTop: spacing.lg,
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700"
  }
});
