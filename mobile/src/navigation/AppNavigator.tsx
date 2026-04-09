import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../assets/theme";
import { AuthNavigator } from "./AuthNavigator";
import { MainTabNavigator } from "./MainTabNavigator";

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.accent
  }
};

export function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer theme={appTheme}>
      {isAuthenticated ? (
        <MainTabNavigator onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <AuthNavigator onLogin={() => setIsAuthenticated(true)} />
      )}
    </NavigationContainer>
  );
}
