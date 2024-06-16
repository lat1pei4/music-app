import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "./screens/MainScreen";
import ManageSounds from "./screens/ManageSounds";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="MainScreen" component={MainScreen} />
          <Drawer.Screen name="ManageSounds" component={ManageSounds} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
