import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import GeneralScreen from "./GeneralScreen";
import { VerticalSpacer } from "../shared";

const DetailPostPage = ({ route, navigation }) => {
  const { titlePage, item } = route.params;
  return (
    <GeneralScreen singleHeaderTitle={titlePage}>
      <View style={styles.container}>
        <VerticalSpacer />
        <Image source={{ uri: item.image_path }} style={styles.banner} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </GeneralScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    padding: 14,
  },
  banner: {
    width: "100%",
    height: 230,
    borderRadius: 18,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 14,
  },
  body: {
    textAlign: "justify",
  },
});

export default DetailPostPage;
