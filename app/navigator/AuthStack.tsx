import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Đăng nhập" }}
      />
    </Stack.Navigator>
  );
}
