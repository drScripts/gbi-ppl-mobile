import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeSection({
  title,
  element,
  style,
  titleStyle,
  children,
}) {
  return (
    <View style={[style, styles.container]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {element}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 14,
    marginHorizontal: 14,
  },
  container: {
    marginBottom: 24,
  },
});
