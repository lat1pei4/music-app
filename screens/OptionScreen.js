import { View, Text, StyleSheet } from "react-native";

function OptionScreen() {
  return (
    <View style={styles.container}>
      <Text>Option Screen</Text>
    </View>
  );
}

export default OptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
