import React from "react";
import { StyleSheet, Pressable } from "react-native";

const Floatingactionbutton = ({ onClick, logo, color = "#2D9CDB" }) => {
  return (
    <Pressable
      onPress={onClick}
      style={[styles.button, { backgroundColor: color }]}
    >
      {logo}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    bottom: 10,
    right: 10,
    position: "absolute",
    zIndex: 2,
    borderRadius: 100,
    elevation: 5,
  },
});

export default Floatingactionbutton;
