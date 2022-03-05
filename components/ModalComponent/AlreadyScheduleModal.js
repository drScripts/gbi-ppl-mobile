import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Generalbutton } from "../InputComponent";

const Alreadyschedulemodal = ({ isVisible = false, onButtonPressed }) => {
  return isVisible ? (
    <View style={styles.backdrop}>
      <View style={styles.modalCard}>
        <Image
          source={require("../../assets/mobile_image_already.png")}
          style={styles.image}
        />
        <Text style={styles.modalText}>
          Anda Sudah Terdaftar Tidak Dapat Mendaftar Lagi
        </Text>
        <Generalbutton title={"Kembali"} onPressed={onButtonPressed} />
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 2,
  },
  modalCard: {
    padding: 22,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  image: {
    height: 251,
    width: 276,
  },
  modalText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 18,
  },
});

export default Alreadyschedulemodal;
