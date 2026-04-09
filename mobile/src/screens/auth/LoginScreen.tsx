import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, spacing } from "../../assets/theme";

type LoginScreenProps = {
  email: string;
  password: string;
  errorMessage?: string;
  isSubmitting: boolean;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onLogin: () => void;
  onGoRegister: () => void;
};

export function LoginScreen({
  email,
  password,
  errorMessage,
  isSubmitting,
  onChangeEmail,
  onChangePassword,
  onLogin,
  onGoRegister
}: LoginScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.badge}>AssetFlow</Text>
        <Text style={styles.title}>Track your investments with clarity.</Text>
        <Text style={styles.subtitle}>
          Sign in to monitor holdings, profit and loss, and watchlist movement.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor={colors.mutedText}
          style={styles.input}
          value={email}
          onChangeText={onChangeEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Enter your password"
          placeholderTextColor={colors.mutedText}
          style={styles.input}
          value={password}
          onChangeText={onChangePassword}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Pressable
          style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
          onPress={onLogin}
          disabled={isSubmitting}
        >
          <Text style={styles.primaryButtonText}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Text>
        </Pressable>

        <Pressable style={styles.linkButton} onPress={onGoRegister}>
          <Text style={styles.linkText}>Create a new account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
    backgroundColor: colors.background
  },
  hero: {
    marginBottom: spacing.xl
  },
  badge: {
    alignSelf: "flex-start",
    marginBottom: spacing.md,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
    color: colors.primary
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22
  },
  card: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border
  },
  label: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontSize: 13,
    fontWeight: "600"
  },
  input: {
    marginBottom: spacing.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: "#FBFDFF",
    color: colors.text
  },
  primaryButton: {
    marginTop: spacing.sm,
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700"
  },
  primaryButtonDisabled: {
    opacity: 0.7
  },
  errorText: {
    marginTop: spacing.xs,
    color: colors.danger,
    fontSize: 13,
    lineHeight: 18
  },
  linkButton: {
    marginTop: spacing.md,
    alignItems: "center"
  },
  linkText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "600"
  }
});
