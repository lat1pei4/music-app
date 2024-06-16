import { Text, StyleSheet, View } from "react-native";
import SoundItem from "./SoundItem";

function SoundContainer() {
  return (
    <View style={styles.container}>
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
    </View>
  );
}

export default SoundContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 30,
    flexDirection: "row",
    flexWrap: "wrap", // Allow wrapping
    justifyContent: "space-around", // Adjust to maintain space between items on the same row
    alignItems: "center",
  },
});
