import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const Textbutton = ({ sideText, btnText, onPressed }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{sideText}</Text>
      <TouchableOpacity onPress={onPressed}>
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  btnText: {
    color: "#479CFF",
    textDecorationLine: "underline",
    marginLeft: 3,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});

export default Textbutton;
