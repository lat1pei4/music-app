import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";

function SoundItem() {
  const [playbackObject, setPlaybackObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Default volume level set to 50%
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
        sound.setIsLoopingAsync(true); // Loop the sound
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        sound.setVolumeAsync(volume / 100); // Set the initial volume
      } catch (error) {
        console.error("Error loading sound", error);
      }
    }
    setModalVisible(true);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isPlaying && status.didJustFinish) {
      if (playbackObject) {
        // Check if playbackObject is not null
        playbackObject
          .unloadAsync()
          .then(() => {
            setPlaybackObject(null);
            setIsPlaying(false);
            setModalVisible(false);
          })
          .catch((error) => console.error("Error unloading audio", error));
      } else {
        // Handle the case where playbackObject is null if necessary
        console.log("Playback object is already null.");
      }
    }
  };

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (playbackObject) {
      // Ensure playbackObject is not null before setting volume
      await playbackObject.setVolumeAsync(value / 100);
      if (value === 0 && isPlaying) {
        await playbackObject.pauseAsync();
        setIsPlaying(false); // Automatically pause if volume is set to 0
      } else if (value > 0 && !isPlaying) {
        await playbackObject.playAsync();
        setIsPlaying(true); // Automatically play if volume is increased from 0
      }
    }
  };

  const togglePlayback = async () => {
    if (playbackObject) {
      // Check if playbackObject is not null before toggling playback
      if (isPlaying) {
        await playbackObject.pauseAsync();
        setIsPlaying(false);
      } else {
        await playbackObject.playAsync();
        setIsPlaying(true);
      }
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
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text>{isPlaying ? "Music is playing" : "Music is stopped"}</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#307ecc"
              maximumTrackTintColor="#000000"
              step={1}
              value={volume}
              onValueChange={handleVolumeChange}
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
