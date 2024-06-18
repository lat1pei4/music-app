import { Text, View, StyleSheet } from "react-native";
import GetLocation from "../utils/GetLocation";
import BackgroundVideoScreen from "../components/BackgroundVideoScreen";

function getCurrentTime() {
  const date = new Date();
  return date.toLocaleTimeString();
}

function MainScreen() {
  return (
    <>
      <GetLocation />

      <BackgroundVideoScreen />
      {/* <View>
        <Text>Main Screen</Text>
      </View> */}
    </>
  );
}

export default MainScreen;
