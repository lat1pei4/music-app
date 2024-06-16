import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

function SoundItem() {
  const [playbackObject, setPlaybackObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = async () => {
    if (!playbackObject) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          {
            uri: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
          },
          { shouldPlay: true }
        );
        setPlaybackObject(sound);
        setIsPlaying(true);
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      } catch (error) {
        console.error("Error loading sound", error);
      }
    }
    setModalVisible(true); // Ensure modal opens whether new or existing playback object.
  };

  const togglePlayback = async () => {
    if (!playbackObject) return; // Guard against null object reference.

    if (isPlaying) {
      await playbackObject.pauseAsync();
      setIsPlaying(false);
    } else {
      await playbackObject.playAsync();
      setIsPlaying(true);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isPlaying && status.didJustFinish) {
      playbackObject.unloadAsync();
      setPlaybackObject(null);
      setIsPlaying(false);
      setModalVisible(false); // Ensure the modal closes when the audio finishes playing.
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={[styles.button, isPlaying ? styles.playing : styles.stopped]}
      >
        <Text>{isPlaying ? "Pause Sound" : "Play Sound"}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); // Allows the modal to be closed using Android's back button.
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text>{isPlaying ? "Music is playing" : "Music is stopped"}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isPlaying ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={togglePlayback}
              value={isPlaying}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default SoundItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f",
    width: 150,
    height: 150,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  playing: {
    backgroundColor: "#f00", // Red when playing
  },
  stopped: {
    backgroundColor: "#0f0", // Green when stopped
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
