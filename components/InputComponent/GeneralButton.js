import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

const Generalbutton = ({ title, onPressed, style }) => {
  return (
    <TouchableHighlight
      style={[styles.button, style]}
      onPress={onPressed}
      underlayColor="#1c94d6"
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#2D9CDB",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default Generalbutton;
