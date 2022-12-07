import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity } from "react-native";
import { icons } from "../../assets/icons";
import { HomeScreen, SettingsScreen } from "../screens";
import { presetStyle } from "../theme/style";

const Tab = createBottomTabNavigator();

export default function AppBottomTab() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Trang chủ",
          tabBarLabel: "Trang chủ",
          headerRight: (props) => (
            <TouchableOpacity
              style={presetStyle.headerButton}
              onPress={() => navigation.navigate("CartScreen" as never)}
            >
              <Image
                style={[
                  presetStyle.headerImage,
                  { tintColor: props.tintColor },
                ]}
                source={icons.cart}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: "Cài đặt", tabBarLabel: "Cài đặt" }}
      />
    </Tab.Navigator>
  );
}
