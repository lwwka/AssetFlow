import { StatusBar } from "expo-status-bar";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "./src/assets/theme";
import { loginWithEmail, registerWithEmail } from "./src/api/authApi";
import { DashboardScreen } from "./src/screens/dashboard/DashboardScreen";
import { LoginScreen } from "./src/screens/auth/LoginScreen";
import { PortfolioScreen } from "./src/screens/portfolio/PortfolioScreen";
import { ProfileScreen } from "./src/screens/profile/ProfileScreen";
import { RegisterScreen } from "./src/screens/auth/RegisterScreen";
import { WatchlistScreen } from "./src/screens/watchlist/WatchlistScreen";
import { useState } from "react";
import type { AuthSession } from "./src/types/auth";

type AuthMode = "login" | "register";
type TabKey = "dashboard" | "portfolio" | "watchlist" | "profile";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchAuthMode = (mode: AuthMode) => {
    setAuthError("");
    setAuthMode(mode);
  };

  const handleLogin = async () => {
    setAuthError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError("Please enter both email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const session = await loginWithEmail({
        email: loginEmail.trim(),
        password: loginPassword
      });
      setAuthSession(session);
      setIsAuthenticated(true);
      setActiveTab("dashboard");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    setAuthError("");

    if (!registerName.trim() || !registerEmail.trim() || !registerPassword.trim()) {
      setAuthError("Please complete all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const session = await registerWithEmail({
        name: registerName,
        email: registerEmail.trim(),
        password: registerPassword
      });
      setAuthSession(session);
      setIsAuthenticated(true);
      setActiveTab("dashboard");
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Unable to create account."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthSession(null);
    setAuthError("");
    setLoginPassword("");
    setRegisterPassword("");
    setAuthMode("login");
    setActiveTab("dashboard");
  };

  const renderMainContent = () => {
    if (!isAuthenticated) {
      return authMode === "login" ? (
        <LoginScreen
          email={loginEmail}
          password={loginPassword}
          errorMessage={authError}
          isSubmitting={isSubmitting}
          onChangeEmail={setLoginEmail}
          onChangePassword={setLoginPassword}
          onLogin={handleLogin}
          onGoRegister={() => switchAuthMode("register")}
        />
      ) : (
        <RegisterScreen
          name={registerName}
          email={registerEmail}
          password={registerPassword}
          errorMessage={authError}
          isSubmitting={isSubmitting}
          onChangeName={setRegisterName}
          onChangeEmail={setRegisterEmail}
          onChangePassword={setRegisterPassword}
          onRegister={handleRegister}
          onGoLogin={() => switchAuthMode("login")}
        />
      );
    }

    switch (activeTab) {
      case "portfolio":
        return <PortfolioScreen authSession={authSession} />;
      case "watchlist":
        return <WatchlistScreen />;
      case "profile":
        return (
          <ProfileScreen
            authSession={authSession}
            onLogout={handleLogout}
          />
        );
      case "dashboard":
      default:
        return <DashboardScreen authSession={authSession} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {renderMainContent()}
      {isAuthenticated ? (
        <View style={styles.tabBar}>
          {[
            ["dashboard", "Dashboard"],
            ["portfolio", "Portfolio"],
            ["watchlist", "Watchlist"],
            ["profile", "Profile"]
          ].map(([key, label]) => {
            const isActive = activeTab === key;
            return (
              <Pressable
                key={key}
                onPress={() => setActiveTab(key as TabKey)}
                style={styles.tabButton}
              >
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface
  },
  tabButton: {
    paddingHorizontal: 8
  },
  tabLabel: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "600"
  },
  tabLabelActive: {
    color: colors.accent
  }
});
