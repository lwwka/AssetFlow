import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../assets/theme";
import { fetchCurrentUser } from "../../api/authApi";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import type { AuthSession, AuthUser } from "../../types/auth";

type ProfileScreenProps = {
  authSession: AuthSession | null;
  onLogout: () => void;
};

export function ProfileScreen({ authSession, onLogout }: ProfileScreenProps) {
  const { profilePreferences, profileStatusItems } = usePortfolioData();
  const [profileUser, setProfileUser] = useState<AuthUser | null>(authSession?.user ?? null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(false);

  useEffect(() => {
    setProfileUser(authSession?.user ?? null);
    setProfileError(null);

    const token = authSession?.token;

    if (!token) {
      return;
    }

    let isMounted = true;

    const loadCurrentUser = async () => {
      try {
        setIsRefreshingProfile(true);
        const user = await fetchCurrentUser(token);

        if (!isMounted) {
          return;
        }

        setProfileUser(user);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setProfileError(
          error instanceof Error
            ? error.message
            : "Unable to refresh your profile from the backend."
        );
      } finally {
        if (isMounted) {
          setIsRefreshingProfile(false);
        }
      }
    };

    void loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [authSession]);

  const displayUser = profileUser ?? {
    id: 0,
    name: "Investor",
    email: "investor@example.com"
  };
  const isLiveProfile = Boolean(authSession?.token);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Account and app preferences.</Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.name}>{displayUser.name}</Text>
        <Text style={styles.email}>{displayUser.email}</Text>
        <Text style={styles.memberTag}>
          {isLiveProfile ? "Live account" : "Offline demo account"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Source</Text>
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Profile data</Text>
            <Text style={styles.statusValue}>
              {isRefreshingProfile
                ? "Refreshing"
                : isLiveProfile
                  ? "Backend /api/auth/me"
                  : "Local session fallback"}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Authentication mode</Text>
            <Text style={styles.statusValue}>
              {authSession?.source === "live" ? "Live backend" : "Offline demo"}
            </Text>
          </View>
          {profileError ? <Text style={styles.errorText}>{profileError}</Text> : null}
        </View>
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
          <Text style={styles.meta}>1. Connect portfolio summary to live APIs</Text>
          <Text style={styles.meta}>2. Add holdings and transactions endpoints</Text>
          <Text style={styles.meta}>3. Replace in-memory auth with production auth</Text>
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
  errorText: {
    marginTop: spacing.sm,
    color: colors.danger,
    fontSize: 13,
    lineHeight: 18
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
