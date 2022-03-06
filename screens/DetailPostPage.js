import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import GeneralScreen from "./GeneralScreen";
import { VerticalSpacer } from "../shared";
import { Generalbutton } from "../components/InputComponent";

const DetailPostPage = ({ route, navigation }) => {
  const { titlePage, item } = route.params;
  return (
    <GeneralScreen singleHeaderTitle={titlePage}>
      <View style={styles.container}>
        <VerticalSpacer />
        <Image source={{ uri: item.image_path }} style={styles.banner} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Generalbutton
          title={"Continue"}
          style={styles.mt10}
          onPressed={() => {
            navigation.goBack();
          }}
        />
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
  mt10: {
    marginTop: 10,
  },
});

export default DetailPostPage;
