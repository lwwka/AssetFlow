import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import type { AuthStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<AuthStackParamList>();

type AuthNavigatorProps = {
  onLogin: () => void;
};

export function AuthNavigator({ onLogin }: AuthNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {({ navigation }) => (
          <LoginScreen
            email=""
            password=""
            isSubmitting={false}
            onChangeEmail={() => undefined}
            onChangePassword={() => undefined}
            onLogin={onLogin}
            onGoRegister={() => navigation.navigate("Register")}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {({ navigation }) => (
          <RegisterScreen
            name=""
            email=""
            password=""
            isSubmitting={false}
            onChangeName={() => undefined}
            onChangeEmail={() => undefined}
            onChangePassword={() => undefined}
            onRegister={onLogin}
            onGoLogin={() => navigation.navigate("Login")}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
