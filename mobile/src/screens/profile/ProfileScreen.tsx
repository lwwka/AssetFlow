import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";

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
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Account and app preferences.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>
        <Text style={styles.meta}>Base currency: USD</Text>
        <Text style={styles.meta}>Default portfolio: Global Growth</Text>
      </View>

      <Pressable style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background
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
    color: colors.text
  },
  email: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 14
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
