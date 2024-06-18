import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "./screens/MainScreen";
import ManageSoundsScreen from "./screens/ManageSoundsScreen";
import OptionScreen from "./screens/OptionScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="ManageSoundsScreen"
            component={ManageSoundsScreen}
          />
          <Drawer.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen name="DebugMode" component={OptionScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
