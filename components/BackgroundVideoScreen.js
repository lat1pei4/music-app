import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Video } from "expo-av";

const BackgroundVideoScreen = () => {
  const video = require("../assets/background/spring_noon.mp4");

  return (
    <View style={styles.container}>
      <Video
        source={video} // Your video source
        rate={1.0}
        volume={0.0} // Mute the sound
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.backgroundVideo}
      />
      <Text style={styles.text}>Your Content Goes Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    position: "absolute",
    top: "50%",
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default BackgroundVideoScreen;
