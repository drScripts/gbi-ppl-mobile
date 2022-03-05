import React from "react";
import { StyleSheet, ScrollView } from "react-native";

const Scrollsection = ({ elements, children }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {elements}
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Scrollsection;
