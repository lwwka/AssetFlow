import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, spacing } from "../../assets/theme";

type RegisterScreenProps = {
  name: string;
  email: string;
  password: string;
  errorMessage?: string;
  isSubmitting: boolean;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onRegister: () => void;
  onGoLogin: () => void;
};

export function RegisterScreen({
  name,
  email,
  password,
  errorMessage,
  isSubmitting,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  onRegister,
  onGoLogin
}: RegisterScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Create Account</Text>
        <Text style={styles.title}>Build your portfolio from day one.</Text>
        <Text style={styles.subtitle}>
          Create an account to start tracking assets, allocation, and watchlist
          ideas in one place.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Lawrence"
          placeholderTextColor={colors.mutedText}
          style={styles.input}
          value={name}
          onChangeText={onChangeName}
        />

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
          placeholder="Create a password"
          placeholderTextColor={colors.mutedText}
          style={styles.input}
          value={password}
          onChangeText={onChangePassword}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Pressable
          style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
          onPress={onRegister}
          disabled={isSubmitting}
        >
          <Text style={styles.primaryButtonText}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Text>
        </Pressable>

        <Pressable style={styles.linkButton} onPress={onGoLogin}>
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
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
    backgroundColor: "#E0E7FF",
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
    backgroundColor: colors.primary,
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
