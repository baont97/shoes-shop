import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "../redux/ultis";
import { CartScreen, LoginScreen, ProductDetailScreen } from "../screens";
import AppBottomTab from "./AppBottomTab";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

export default function AppStack() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="AppBottomTab"
            component={AppBottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
              headerBackTitle: "Trang chủ",
              headerTitle: "Giỏ hàng",
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
