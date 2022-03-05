import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import AnimatedLottieView from "lottie-react-native";

const Loadingmodal = ({ animationController, isVisible = false }) => {
  return (
    <Modal animationType="fade" visible={isVisible} transparent={true}>
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <AnimatedLottieView
            autoPlay={true}
            ref={animationController}
            loop={true}
            source={require("../../assets/loading-animation.json")}
            style={styles.animation}
          />
          <Text style={styles.loadingText}>Loading....</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "white",
    width: "75%",
    padding: 24,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 150,
    height: 150,
  },
  loadingText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 14,
  },
});

export default Loadingmodal;
