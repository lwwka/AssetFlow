import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { colors } from "../assets/theme";
import { DashboardScreen } from "../screens/dashboard/DashboardScreen";
import { PortfolioScreen } from "../screens/portfolio/PortfolioScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { WatchlistScreen } from "../screens/watchlist/WatchlistScreen";
import type { MainTabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconMap: Record<keyof MainTabParamList, string> = {
  Dashboard: "D",
  Portfolio: "P",
  Watchlist: "W",
  Profile: "P"
};

type MainTabNavigatorProps = {
  onLogout: () => void;
};

export function MainTabNavigator({ onLogout }: MainTabNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: colors.surface,
          borderTopColor: colors.border
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600"
        },
        tabBarIcon: ({ color }: { color: string }) => (
          <Text style={{ color, fontSize: 14, fontWeight: "700" }}>
            {iconMap[route.name]}
          </Text>
        )
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Watchlist" component={WatchlistScreen} />
      <Tab.Screen name="Profile">
        {() => (
          <ProfileScreen
            userName="Lawrence"
            userEmail="lawrence@example.com"
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
